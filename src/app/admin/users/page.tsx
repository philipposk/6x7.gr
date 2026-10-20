import Link from "next/link";
import { directory } from "@/lib/admin/users";
import { APPS } from "@/lib/admin/config";
import { Badge, Card, fmt } from "../ui";

type SP = Promise<{ cls?: string; app?: string; q?: string; from?: string }>;

export default async function Users({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const { users } = await directory();
  const cls = sp.cls ?? "non-throwaway";
  const list = users.filter((u) =>
    (cls === "all" || (cls === "non-throwaway" ? u.cls !== "throwaway" : u.cls === cls)) &&
    (!sp.app || (sp.app === "none" ? u.apps.length === 0 : u.apps.some((a) => a.app === sp.app))) &&
    (!sp.from || (sp.from === "unknown" ? !u.signupApp : u.signupApp === sp.from)) &&
    (!sp.q || (u.email ?? "").toLowerCase().includes(sp.q.toLowerCase())));
  const link = (k: string, v: string) => {
    const p = new URLSearchParams({ ...(sp as Record<string, string>), [k]: v }); return `/admin/users?${p}`;
  };
  const appCounts = new Map<string, number>();
  for (const u of list) for (const a of u.apps) appCounts.set(a.app, (appCounts.get(a.app) ?? 0) + 1);
  return (
    <div className="space-y-4">
      <Card>
        <form className="flex flex-wrap items-center gap-2">
          <input name="q" defaultValue={sp.q} placeholder="search email" className="rounded bg-neutral-800 px-2 py-1" />
          <input type="hidden" name="cls" value={cls} />{sp.app && <input type="hidden" name="app" value={sp.app} />}
          <button className="rounded bg-neutral-700 px-2 py-1">Search</button>
          <span className="ml-2 text-neutral-400">Class:</span>
          {["non-throwaway", "real", "test", "throwaway", "owner", "all"].map((c) => (
            <Link key={c} href={link("cls", c)} className={c === cls ? "text-white underline" : "text-neutral-400"}>{c}</Link>
          ))}
        </form>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="text-neutral-400">App:</span>
          <Link href={link("app", "")} className={!sp.app ? "underline" : "text-neutral-400"}>any</Link>
          {APPS.map((a) => <Link key={a.slug} href={link("app", a.slug)} className={sp.app === a.slug ? "underline" : "text-neutral-400"}>{a.name} ({appCounts.get(a.slug) ?? 0})</Link>)}
          <Link href={link("app", "none")} className={sp.app === "none" ? "underline" : "text-neutral-400"}>no app data</Link>
        </div>
      </Card>
      <p className="text-neutral-400">{list.length} accounts</p>
      <div className="overflow-x-auto rounded-lg border border-neutral-800">
        <table className="w-full text-left">
          <thead className="bg-neutral-900 text-xs text-neutral-400"><tr>
            <th className="p-2">Email</th><th>Class</th><th>Auth</th><th>Came from</th><th>Apps (rows · first → last)</th><th>Signed up</th><th>Last sign-in</th>
          </tr></thead>
          <tbody>{list.map((u) => (
            <tr key={u.db + u.id} className="border-t border-neutral-800 align-top">
              <td className="p-2">{u.email ?? <i className="text-neutral-500">no email</i>}{u.db !== "6x7" && <span className="ml-1 text-xs text-neutral-500">[{u.db}]</span>}</td>
              <td><Badge v={u.cls} /></td>
              <td className="text-neutral-400">{u.provider}</td>
              <td>{u.signupApp ? <b>{u.signupApp}</b> : <span className="text-neutral-500">unknown</span>}</td>
              <td>{u.apps.length ? u.apps.map((a) => (
                <div key={a.app}><b>{a.app}</b> <span className="text-neutral-400">{a.rows} · {fmt(a.first)} → {fmt(a.last)}</span></div>
              )) : <span className="text-neutral-500">—</span>}</td>
              <td className="text-neutral-400">{fmt(u.createdAt)}</td>
              <td className="text-neutral-400">{fmt(u.lastSignIn)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
