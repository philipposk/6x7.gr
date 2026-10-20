import { APPS } from "@/lib/admin/config";
import { PROJECTS } from "@/data/projects";
import { directory } from "@/lib/admin/users";
import { probeAll } from "@/lib/admin/uptime";
import { vercelDeployments, latestByProject } from "@/lib/admin/vercel";
import { Bars, Badge, Card, Dot, Notice, ago, weekly, ageDays } from "../ui";

export default async function Apps() {
  // Union of DB-backed apps and every live site listed on the homepage.
  const rows = new Map<string, { slug: string; name: string; live?: string; db: boolean; vercel?: string }>();
  for (const p of PROJECTS) if (p.live) rows.set(p.slug, { slug: p.slug, name: p.name, live: p.live, db: false });
  for (const a of APPS) {
    const prev = rows.get(a.slug);
    rows.set(a.slug, { slug: a.slug, name: a.name, live: a.live ?? prev?.live ?? `https://${a.slug}.6x7.gr`, db: true, vercel: a.vercelProject });
  }
  const list = [...rows.values()];
  const [dir, probes, dep] = await Promise.all([directory(), probeAll(list.map((r) => r.live!).filter(Boolean)), vercelDeployments(100)]);
  const pm = new Map(probes.map((p) => [p.url, p]));
  const latest = dep.ok ? latestByProject(dep.items) : new Map();
  const stats = (slug: string) => {
    const us = dir.users.filter((u) => u.apps.some((a) => a.app === slug));
    const firsts = us.map((u) => u.apps.find((a) => a.app === slug)!.first).filter(Boolean) as string[];
    const lasts = us.map((u) => u.apps.find((a) => a.app === slug)!.last).filter(Boolean) as string[];
    return {
      total: us.length, real: us.filter((u) => u.cls === "real").length,
      active30: lasts.filter((l) => ageDays(l) < 30).length,
      last: lasts.sort().at(-1) ?? null, weekly: weekly(firsts),
    };
  };
  const down = probes.filter((p) => !p.ok);
  return (
    <div className="space-y-4">
      {!dep.ok && <Notice>Deploy column empty: {dep.reason}</Notice>}
      {down.length > 0 && <Notice>{down.length} site(s) not responding OK: {down.map((d) => d.url.replace("https://", "")).join(", ")}</Notice>}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {list.sort((a, b) => Number(b.db) - Number(a.db) || a.name.localeCompare(b.name)).map((r) => {
          const p = r.live ? pm.get(r.live) : undefined;
          const s = r.db ? stats(r.slug) : null;
          const d = latest.get(r.vercel ?? r.slug);
          return (
            <Card key={r.slug}>
              <div className="flex items-center gap-2">
                <Dot ok={p ? p.ok : null} />
                <a href={r.live} target="_blank" className="font-semibold hover:underline">{r.name}</a>
                <span className="ml-auto text-xs text-neutral-500">{p?.status ?? p?.error ?? ""} {p?.ms != null && `${p.ms}ms`}</span>
              </div>
              {s ? (
                <div className="mt-2 flex items-end justify-between">
                  <div className="text-neutral-300">{s.total} users · {s.real} real · {s.active30} active 30d<br />
                    <span className="text-xs text-neutral-500">last activity {ago(s.last)}</span></div>
                  <Bars values={s.weekly} />
                </div>
              ) : <p className="mt-2 text-xs text-neutral-500">No DB adapter (add to config.ts)</p>}
              {d && <p className="mt-2 text-xs text-neutral-400">Deploy <Badge v={d.state} /> {ago(d.createdAt)} {d.commit && `· ${d.commit}`}</p>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
