import Link from "next/link";
import { directory } from "@/lib/admin/users";
import { vercelDeployments } from "@/lib/admin/vercel";
import { Card, Stat, Notice, Bars, weekly, ago, Badge, ageDays } from "./ui";

export default async function Overview() {
  const [dir, dep] = await Promise.all([directory(), vercelDeployments(40)]);
  const u = dir.users;
  const count = (c: string) => u.filter((x) => x.cls === c).length;
  const since = (d: number) => u.filter((x) => ageDays(x.createdAt) < d);
  const real = u.filter((x) => x.cls === "real");
  const active30 = u.filter((x) => ageDays(x.lastSignIn) < 30);
  const failed = dep.ok ? dep.items.filter((d) => d.state === "ERROR") : [];
  return (
    <div className="space-y-6">
      {dir.sources.filter((s) => !s.configured || s.error).map((s) => (
        <Notice key={s.project}>DB <b>{s.project}</b>: {s.error ?? "not configured (set its ADMIN_DB_URL_* env var)"}</Notice>
      ))}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
        <Stat label="All accounts" value={u.length} />
        <Stat label="Real" value={count("real")} hint="not test / throwaway" />
        <Stat label="Throwaway" value={count("throwaway")} hint="atomicmail etc." />
        <Stat label="Test / demo" value={count("test")} />
        <Stat label="Signups 7d / 30d" value={`${since(7).length} / ${since(30).length}`} />
        <Stat label="Active 30d" value={active30.length} hint="signed in" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Signups per week (all · real)">
          <Bars values={weekly(u.map((x) => x.createdAt))} />
          <div className="mt-2"><Bars values={weekly(real.map((x) => x.createdAt))} /></div>
        </Card>
        <Card title="Latest real users">
          <ul className="space-y-1">
            {real.slice(0, 8).map((x) => (
              <li key={x.id} className="flex justify-between gap-2">
                <span className="truncate">{x.email}</span>
                <span className="text-neutral-400">{x.apps.map((a) => a.app).join(", ") || "no app data"} · {ago(x.lastSignIn ?? x.createdAt)}</span>
              </li>
            ))}
          </ul>
          <Link href="/admin/users?cls=real" className="mt-2 inline-block text-sky-400">All real users →</Link>
        </Card>
        <Card title="Deploys">
          {!dep.ok ? <Notice>{dep.reason}</Notice> : (
            <>
              <p className="mb-2">{failed.length ? <span className="text-rose-400">{failed.length} failed in last {dep.items.length}</span> : "No failures in latest deploys."}</p>
              <ul className="space-y-1">{dep.items.slice(0, 6).map((d) => (
                <li key={d.uid} className="flex justify-between"><span>{d.name}</span><span><Badge v={d.state} /> {ago(d.createdAt)}</span></li>
              ))}</ul>
            </>
          )}
        </Card>
        <Card title="Unmapped tables (add to config.ts)">
          {dir.sources.map((s) => <p key={s.project} className="text-neutral-400">{s.project}: {s.unmapped.join(", ") || "none"}</p>)}
        </Card>
      </div>
    </div>
  );
}
