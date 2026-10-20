import "server-only";
import { APPS, IGNORE_TABLES, appForTable, type DbProject } from "./config";
import { classifyEmail, type EmailClass } from "./classify";
import { adminEmails } from "./auth";
import { db } from "./db";
import { DISCOVER_SQL, usageSql, type UserTable } from "./usage-sql";

export interface UserApp { app: string; first: string | null; last: string | null; rows: number }
export interface DirUser {
  id: string; db: DbProject; email: string | null; cls: EmailClass; provider: string | null;
  createdAt: string; lastSignIn: string | null; apps: UserApp[];
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
  const [authUsers, usage] = await Promise.all([
    sql.unsafe<{ id: string; email: string | null; created_at: Date; last_sign_in_at: Date | null; provider: string | null; is_demo: boolean }[]>(
      `select id, email, created_at, last_sign_in_at, raw_app_meta_data->>'provider' as provider,
        coalesce((raw_user_meta_data->>'is_demo')::boolean,(raw_user_meta_data->>'demo')::boolean,false) as is_demo
       from auth.users`),
    sql.unsafe<{ user_id: string; app: string; first: Date | null; last: Date | null; rows: number }[]>(usageSql(mapped)),
  ]);
  const owners = adminEmails();
  const byUser = new Map<string, UserApp[]>();
  for (const u of usage) {
    const list = byUser.get(u.user_id) ?? [];
    list.push({ app: u.app, first: u.first?.toISOString() ?? null, last: u.last?.toISOString() ?? null, rows: u.rows });
    byUser.set(u.user_id, list);
  }
  const users: DirUser[] = authUsers.map((u) => ({
    id: u.id, db: project, email: u.email, provider: u.provider,
    cls: classifyEmail(u.email, { owners, isDemo: u.is_demo }),
    createdAt: u.created_at.toISOString(), lastSignIn: u.last_sign_in_at?.toISOString() ?? null,
    apps: (byUser.get(u.id) ?? []).sort((a, b) => b.rows - a.rows),
  }));
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
