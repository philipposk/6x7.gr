import "server-only";

export interface Deploy { uid: string; name: string; url: string; state: string; target: string | null; createdAt: number; commit?: string }

export async function vercelDeployments(limit = 60): Promise<{ ok: true; items: Deploy[] } | { ok: false; reason: string }> {
  const token = process.env.VERCEL_TOKEN;
  if (!token) return { ok: false, reason: "VERCEL_TOKEN not set" };
  const team = process.env.VERCEL_TEAM_ID ? `&teamId=${encodeURIComponent(process.env.VERCEL_TEAM_ID)}` : "";
  const res = await fetch(`https://api.vercel.com/v6/deployments?limit=${limit}${team}`, {
    headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 120 },
  });
  if (!res.ok) return { ok: false, reason: `Vercel API ${res.status}` };
  const j = (await res.json()) as { deployments: { uid: string; name: string; url: string; state?: string; readyState?: string; target: string | null; created: number; meta?: Record<string, string> }[] };
  return {
    ok: true,
    items: j.deployments.map((d) => ({
      uid: d.uid, name: d.name, url: d.url, state: d.readyState ?? d.state ?? "?", target: d.target,
      createdAt: d.created, commit: d.meta?.githubCommitMessage?.split("\n")[0],
    })),
  };
}

/** Latest deployment per project name. */
export function latestByProject(items: Deploy[]) {
  const m = new Map<string, Deploy>();
  for (const d of items) if (!m.has(d.name) || m.get(d.name)!.createdAt < d.createdAt) m.set(d.name, d);
  return m;
}
