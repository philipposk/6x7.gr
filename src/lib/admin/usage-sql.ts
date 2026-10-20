export interface UserTable { schema: string; table: string; hasCreatedAt: boolean; app: string }

const q = (s: string) => '"' + s.replace(/"/g, '""') + '"';
const lit = (s: string) => "'" + s.replace(/'/g, "''") + "'";

export const DISCOVER_SQL = `
select c.table_schema as schema, c.table_name as table,
  exists(select 1 from information_schema.columns c2 where c2.table_schema=c.table_schema
    and c2.table_name=c.table_name and c2.column_name='created_at') as has_created_at
from information_schema.columns c
join information_schema.tables t using (table_schema, table_name)
where c.column_name='user_id' and c.data_type='uuid' and t.table_type='BASE TABLE'
  and c.table_schema not in ('auth','storage','realtime','extensions','vault','pg_catalog','information_schema')`;

export function usageSql(tables: UserTable[]): string {
  if (!tables.length) return "select null::uuid user_id, null::text app, null::timestamptz first, null::timestamptz last, 0::int rows where false";
  const parts = tables.map((t) =>
    `select user_id, ${lit(t.app)} as app, ${t.hasCreatedAt ? "created_at::timestamptz" : "null::timestamptz"} as ts from ${q(t.schema)}.${q(t.table)}`);
  return `select user_id, app, min(ts) as first, max(ts) as last, count(*)::int as rows from (${parts.join("\nunion all\n")}) u where user_id is not null group by 1,2`;
}

