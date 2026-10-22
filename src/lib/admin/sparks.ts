import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/** Mirrors sparks/src/lib/interop/contract.ts (docs/INTEROP.md in the sparks repo). */
export interface SparksProject {
  id: string; name: string; description: string | null; status: string; emoji: string | null;
  url: string | null; live_url: string | null; repo_url: string | null; topics: string[];
  note_count: number; last_activity_at: string | null; updated_at: string;
}
export interface SparksNoteIn {
  external_id: string; text: string; created_at?: string; project_id?: string; project_hint?: string; tags?: string[]; url?: string;
}

const base = () => process.env.SPARKS_URL ?? "https://sparks.6x7.gr";

function assertHost(u: string) {
  const h = new URL(u).hostname;
  if (!(h === "6x7.gr" || h.endsWith(".6x7.gr") || h === "localhost")) throw new Error("SPARKS_URL must be a *.6x7.gr host");
}

async function token(supabase: SupabaseClient) {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function sparksProjects(supabase: SupabaseClient, includeHidden = true) {
  const t = await token(supabase);
  if (!t) return { ok: false as const, reason: "no session token" };
  const url = `${base()}/api/interop/v1/projects${includeHidden ? "?include_hidden=1" : ""}`;
  assertHost(url);
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${t}` }, redirect: "error", cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!res.ok) return { ok: false as const, reason: `Sparks ${res.status}` };
    const j = (await res.json()) as { items: SparksProject[] };
    return { ok: true as const, items: j.items };
  } catch (e) {
    return { ok: false as const, reason: (e as Error).message };
  }
}

export async function sparksSendNotes(supabase: SupabaseClient, items: SparksNoteIn[]) {
  const t = await token(supabase);
  if (!t) return { ok: false as const, reason: "no session token" };
  const url = `${base()}/api/interop/v1/notes`;
  assertHost(url);
  const res = await fetch(url, {
    method: "POST", redirect: "error", cache: "no-store",
    headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" },
    body: JSON.stringify({ source_app: "6x7-admin", auto_match: true, items }),
  });
  if (!res.ok) return { ok: false as const, reason: `Sparks ${res.status}: ${(await res.text()).slice(0, 200)}` };
  return { ok: true as const, result: (await res.json()) as { inserted: number; skipped: number; rejected: unknown[] } };
}
