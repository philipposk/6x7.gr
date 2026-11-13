export interface UserTable { schema: string; table: string; hasCreatedAt: boolean; app: string }

const q = (s: string) => '"' + s.replace(/"/g, '""') + '"';
const lit = (s: string) => "'" + s.replace(/'/g, "''") + "'";

// pg_catalog instead of information_schema: same result, far faster on a big catalog.
// has_table_privilege keeps it to tables this (read-only) role can actually select from.
export const DISCOVER_SQL = `
select n.nspname as schema, c.relname as table,
  exists(select 1 from pg_attribute a2 where a2.attrelid = c.oid and a2.attname = 'created_at'
    and a2.attnum > 0 and not a2.attisdropped) as has_created_at
from pg_attribute a
join pg_class c on c.oid = a.attrelid
join pg_namespace n on n.oid = c.relnamespace
where a.attname = 'user_id' and a.atttypid = 'uuid'::regtype and a.attnum > 0 and not a.attisdropped
  and c.relkind in ('r', 'p')
  and n.nspname not in ('auth','storage','realtime','extensions','vault','pg_catalog','information_schema')
  and has_table_privilege(c.oid, 'SELECT')`;

export function usageSql(tables: UserTable[]): string {
  if (!tables.length) return "select null::uuid user_id, null::text app, null::timestamptz first, null::timestamptz last, 0::int rows where false";
  const parts = tables.map((t) =>
    `select user_id, ${lit(t.app)} as app, ${t.hasCreatedAt ? "created_at::timestamptz" : "null::timestamptz"} as ts from ${q(t.schema)}.${q(t.table)}`);
  return `select user_id, app, min(ts) as first, max(ts) as last, count(*)::int as rows from (${parts.join("\nunion all\n")}) u where user_id is not null group by 1,2`;
}

