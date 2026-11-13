import { requireAdmin } from "@/lib/admin/auth";
import { db, withDeadline } from "@/lib/admin/db";
import { swr } from "@/lib/admin/cache";
import { APPS, type DbProject } from "@/lib/admin/config";
import { Card, Notice, ago } from "../ui";

const FIND = `select n.nspname s, c.relname t
 from pg_attribute a join pg_class c on c.oid = a.attrelid join pg_namespace n on n.oid = c.relnamespace
 where a.attname = 'created_at' and a.attnum > 0 and not a.attisdropped and c.relkind in ('r','p','v','m')
   and (c.relname like '%error_log%' or c.relname like '%health_runs%' or c.relname like '%source_runs%' or c.relname like '%webhook_events%')
   and n.nspname not in ('auth','storage','realtime','pg_catalog','information_schema')
   and has_table_privilege(c.oid, 'SELECT')`;
const q = (s: string) => '"' + s.replace(/"/g, '""') + '"';

async function logTables(p: DbProject) {
  const sql = db(p);
  if (!sql) return null;
  const ts = await sql.unsafe<{ s: string; t: string }[]>(FIND);
  return Promise.all(ts.map(async ({ s, t }) => {
    const [r] = await sql.unsafe<{ d1: number; d7: number; last: Date | null }[]>(
      `select count(*) filter (where created_at > now()-interval '1 day')::int d1, count(*) filter (where created_at > now()-interval '7 days')::int d7, max(created_at) last from ${q(s)}.${q(t)}`);
    return { name: `${s}.${t}`, ...r };
  }));
}

async function supabaseProjects() {
  const t = process.env.SUPABASE_ACCESS_TOKEN;
  if (!t) return null;
  const r = await fetch("https://api.supabase.com/v1/projects", { headers: { Authorization: `Bearer ${t}` }, next: { revalidate: 300 } });
  if (!r.ok) return { error: `Supabase API ${r.status} (SUPABASE_ACCESS_TOKEN expired or wrong?)` } as const;
  return (await r.json()) as { id: string; name: string; status: string; region: string }[];
}

export default async function Health() {
  await requireAdmin(); // per-page guard (layouts do not gate parallel page rendering)
  const projects: DbProject[] = Array.from(new Set(APPS.map((a) => a.db)));
  const [logs, sb] = await Promise.all([Promise.all(projects.map(async (p) => ({ p, rows: await swr(`health:${p}`, () => withDeadline(p, logTables(p))).catch((e) => e as Error) }))), supabaseProjects()]);
  return (
    <div className="space-y-4">
      <Card title="Supabase projects">
        {sb && "error" in sb ? <Notice>{sb.error}</Notice> : sb ? <ul>{sb.map((p) => <li key={p.id}>{p.name} <span className={p.status === "ACTIVE_HEALTHY" ? "text-emerald-400" : "text-amber-400"}>{p.status}</span> <span className="text-neutral-500">{p.region}</span></li>)}</ul>
          : <Notice>Set SUPABASE_ACCESS_TOKEN (personal access token) to see project status.</Notice>}
      </Card>
      {logs.map(({ p, rows }) => (
        <Card key={p} title={`Error / run / webhook logs · ${p}`}>
          {rows === null ? <Notice>DB not configured</Notice> : rows instanceof Error ? <Notice>{rows.message}</Notice> : (
            <table className="w-full text-left"><thead className="text-xs text-neutral-400"><tr><th>Table</th><th>24h</th><th>7d</th><th>Last</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r.name} className="border-t border-neutral-800"><td className="py-1">{r.name}</td><td className={r.d1 && r.name.includes("error") ? "text-rose-400" : ""}>{r.d1}</td><td>{r.d7}</td><td className="text-neutral-400">{ago(r.last?.toISOString())}</td></tr>)}</tbody></table>
          )}
        </Card>
      ))}
    </div>
  );
}
