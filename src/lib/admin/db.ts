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
      max: 3,
      prepare: false,
      ssl: "require",
      // Fail fast instead of hanging the page: give up on a connect after 10s,
      // drop idle sockets after 20s and recycle every socket after 5 minutes so a
      // connection the pooler silently dropped is never reused for long.
      connect_timeout: 10,
      idle_timeout: 20,
      max_lifetime: 60 * 5,
      // Defence in depth: even if the role can write, this session can't.
      connection: { default_transaction_read_only: true, statement_timeout: 15000 } as Record<string, unknown> as never,
    });
  }
  return g.__adminSql![project]!;
}

/** Drop the cached client so the next request opens fresh connections. */
function reset(project: DbProject) {
  const sql = g.__adminSql![project];
  delete g.__adminSql![project];
  sql?.end({ timeout: 0 }).catch(() => {});
}

/**
 * Run admin DB work with a hard deadline. If the database does not answer in
 * time, the cached client is thrown away (it may hold dead sockets) and an
 * error is raised so the page can show it instead of loading forever.
 */
export async function withDeadline<T>(project: DbProject, work: Promise<T>, ms = 20000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reset(project);
      reject(new Error(`Database ${project} did not answer within ${ms / 1000}s`));
    }, ms);
  });
  try {
    return await Promise.race([work, deadline]);
  } catch (e) {
    // Connection-level failures also leave the client in a bad state.
    const code = (e as { code?: string }).code;
    if (code && /^(CONNECT_TIMEOUT|CONNECTION_|ECONN|ETIMEDOUT|EPIPE)/.test(code)) reset(project);
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
