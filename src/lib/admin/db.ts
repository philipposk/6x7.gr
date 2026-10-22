import "server-only";
import postgres from "postgres";
import { DB_ENV, type DbProject } from "./config";

type Sql = ReturnType<typeof postgres>;
const g = globalThis as unknown as { __adminSql?: Partial<Record<DbProject, Sql>> };
g.__adminSql ??= {};

/** Read-only Postgres client for a Supabase project, or null when its env var is unset. */
export function db(project: DbProject): Sql | null {
  const url = process.env[DB_ENV[project]];
  if (!url) return null;
  if (!g.__adminSql![project]) {
    g.__adminSql![project] = postgres(url, {
      max: 2, idle_timeout: 20, prepare: false, ssl: "require",
      // Defence in depth: even if the role can write, this session can't.
      connection: { default_transaction_read_only: true, statement_timeout: 15000 } as Record<string, unknown> as never,
    });
  }
  return g.__adminSql![project]!;
}
