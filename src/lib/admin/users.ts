import "server-only";
import { APPS, EXTERNAL_USER_TABLES, IGNORE_TABLES, appForTable, type DbProject } from "./config";
import { classifyEmail, type EmailClass } from "./classify";
import { adminEmails } from "./auth";
import { db } from "./db";
import { DISCOVER_SQL, usageSql, type UserTable } from "./usage-sql";

export interface UserApp { app: string; first: string | null; last: string | null; rows: number }
export interface DirUser {
  id: string; db: DbProject; email: string | null; cls: EmailClass; provider: string | null;
  createdAt: string; lastSignIn: string | null; apps: UserApp[];
  /** App the account came from: explicit signup_app metadata, else earliest public.app_access row. */
  signupApp: string | null;
}

export async function discoverTables(project: DbProject) {
  const sql = db(project);
  if (!sql) return { mapped: [] as UserTable[], unmapped: [] as string[] };
  const rows = await sql.unsafe<{ schema: string; table: string; has_created_at: boolean }[]>(DISCOVER_SQL);
  const mapped: UserTable[] = [];
  const unmapped: string[] = [];
  for (const r of rows) {
    const key = `${r.schema}.${r.table}`;
    if (IGNORE_TABLES.has(key)) continue;
    const app = appForTable(project, r.schema, r.table);
    if (app) mapped.push({ schema: r.schema, table: r.table, hasCreatedAt: r.has_created_at, app: app.slug });
    else unmapped.push(key);
  }
  return { mapped, unmapped };
}

async function projectDirectory(project: DbProject) {
  const sql = db(project);
  if (!sql) return { users: [] as DirUser[], unmapped: [] as string[], configured: false };
  const { mapped, unmapped } = await discoverTables(project);
  const hasAccess = project === "6x7";
  const [authUsers, usage, access] = await Promise.all([
    sql.unsafe<{ id: string; email: string | null; created_at: Date; last_sign_in_at: Date | null; provider: string | null; is_demo: boolean; signup_app: string | null }[]>(
      `select id, email, created_at, last_sign_in_at, raw_app_meta_data->>'provider' as provider,
        coalesce((raw_user_meta_data->>'is_demo')::boolean,(raw_user_meta_data->>'demo')::boolean,false) as is_demo,
        raw_user_meta_data->>'signup_app' as signup_app
       from admin_ro_api.auth_users`),
    sql.unsafe<{ user_id: string; app: string; first: Date | null; last: Date | null; rows: number }[]>(usageSql(mapped)),
    hasAccess
      ? sql.unsafe<{ user_id: string; app: string; first_seen: Date; last_seen: Date }[]>(
          `select user_id, app, first_seen, last_seen from public.app_access`).catch(() => [])
      : Promise.resolve([] as { user_id: string; app: string; first_seen: Date; last_seen: Date }[]),
  ]);
  const origin = new Map<string, { app: string; at: number }>();
  for (const a of access) {
    const prev = origin.get(a.user_id);
    if (!prev || a.first_seen.getTime() < prev.at) origin.set(a.user_id, { app: a.app, at: a.first_seen.getTime() });
  }
  const owners = adminEmails();
  const byUser = new Map<string, UserApp[]>();
  // app_access rows (written by each app's middleware) count as usage too.
  for (const a of access) usage.push({ user_id: a.user_id, app: a.app, first: a.first_seen, last: a.last_seen, rows: 0 });
  for (const u of usage) {
    const list = byUser.get(u.user_id) ?? [];
    const ex = list.find((x) => x.app === u.app);
    const f = u.first?.toISOString() ?? null, l = u.last?.toISOString() ?? null;
    if (ex) {
      ex.rows += u.rows;
      if (f && (!ex.first || f < ex.first)) ex.first = f;
      if (l && (!ex.last || l > ex.last)) ex.last = l;
    } else list.push({ app: u.app, first: f, last: l, rows: u.rows });
    byUser.set(u.user_id, list);
  }
  const users: DirUser[] = authUsers.map((u) => ({
    id: u.id, db: project, email: u.email, provider: u.provider,
    cls: classifyEmail(u.email, { owners, isDemo: u.is_demo }),
    createdAt: u.created_at.toISOString(), lastSignIn: u.last_sign_in_at?.toISOString() ?? null,
    apps: (byUser.get(u.id) ?? []).sort((a, b) => b.rows - a.rows),
    signupApp: u.signup_app ?? origin.get(u.id)?.app ?? (project === "6x7" ? null : project),
  }));
  if (project === "6x7") users.push(...(await externalUsers(sql, owners)));
  return { users, unmapped, configured: true };
}

export async function directory() {
  const projects: DbProject[] = Array.from(new Set(APPS.map((a) => a.db)));
  const results = await Promise.all(projects.map(async (p) => {
    try { return { p, ...(await projectDirectory(p)), error: null as string | null }; }
    catch (e) { return { p, users: [], unmapped: [], configured: true, error: (e as Error).message }; }
  }));
  return {
    users: results.flatMap((r) => r.users).sort((a, b) => (b.lastSignIn ?? b.createdAt).localeCompare(a.lastSignIn ?? a.createdAt)),
    sources: results.map((r) => ({ project: r.p, configured: r.configured, error: r.error, unmapped: r.unmapped })),
  };
}

/** Accounts from apps with custom auth (own users table), plus app_access_external when it exists. */
async function externalUsers(sql: NonNullable<ReturnType<typeof db>>, owners: string[]): Promise<DirUser[]> {
  const out: DirUser[] = [];
  const [{ ok }] = await sql.unsafe<{ ok: boolean }[]>(`select to_regclass('public.app_access_external') is not null ok`);
  const ext = ok
    ? await sql.unsafe<{ app: string; external_id: string; first_seen: Date; last_seen: Date }[]>(
        `select app, external_id, first_seen, last_seen from public.app_access_external`)
    : [];
  const extMap = new Map(ext.map((e) => [`${e.app}:${e.external_id}`, e]));
  for (const t of EXTERNAL_USER_TABLES) {
    const [schema, table] = t.table.split(".");
    try {
      // Profiles already linked to a shared-login account (auth_user_id) show up as
      // normal users via their app tables; only list the unlinked ones here.
      const rows = await sql
        .unsafe<{ id: string; email: string | null; created_at: Date }[]>(
          `select id::text, email, created_at from "${schema}"."${table}" where auth_user_id is null`)
        .catch(() => sql.unsafe<{ id: string; email: string | null; created_at: Date }[]>(
          `select id::text, email, created_at from "${schema}"."${table}"`));
      for (const r of rows) {
        const e = extMap.get(`${t.app}:${r.id}`);
        out.push({
          id: `${t.app}:${r.id}`, db: "6x7", email: r.email, provider: `${t.app} (own auth)`,
          cls: classifyEmail(r.email, { owners }),
          createdAt: r.created_at.toISOString(), lastSignIn: e?.last_seen.toISOString() ?? null,
          apps: [{ app: t.app, first: r.created_at.toISOString(), last: e?.last_seen.toISOString() ?? null, rows: 0 }],
          signupApp: t.app,
        });
      }
    } catch {
      /* table missing or not readable */
    }
  }
  return out;
}
