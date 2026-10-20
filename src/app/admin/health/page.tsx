import { db } from "@/lib/admin/db";
import { APPS, type DbProject } from "@/lib/admin/config";
import { Card, Notice, ago } from "../ui";

const FIND = `select table_schema s, table_name t from information_schema.columns
 where column_name='created_at' and (table_name like '%error_log%' or table_name like '%health_runs%' or table_name like '%source_runs%' or table_name like '%webhook_events%')
 and table_schema not in ('auth','storage','realtime')`;
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
  if (!r.ok) return null;
  return (await r.json()) as { id: string; name: string; status: string; region: string }[];
}

export default async function Health() {
  const projects: DbProject[] = Array.from(new Set(APPS.map((a) => a.db)));
  const [logs, sb] = await Promise.all([Promise.all(projects.map(async (p) => ({ p, rows: await logTables(p).catch((e) => e as Error) }))), supabaseProjects()]);
  return (
    <div className="space-y-4">
      <Card title="Supabase projects">
        {sb ? <ul>{sb.map((p) => <li key={p.id}>{p.name} <span className={p.status === "ACTIVE_HEALTHY" ? "text-emerald-400" : "text-amber-400"}>{p.status}</span> <span className="text-neutral-500">{p.region}</span></li>)}</ul>
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
