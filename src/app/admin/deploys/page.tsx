import { vercelDeployments } from "@/lib/admin/vercel";
import { Badge, Notice, ago } from "../ui";

export default async function Deploys() {
  const dep = await vercelDeployments(100);
  if (!dep.ok) return <Notice>{dep.reason}</Notice>;
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-800">
      <table className="w-full text-left">
        <thead className="bg-neutral-900 text-xs text-neutral-400"><tr><th className="p-2">Project</th><th>State</th><th>Target</th><th>Commit</th><th>When</th></tr></thead>
        <tbody>{dep.items.map((d) => (
          <tr key={d.uid} className={`border-t border-neutral-800 ${d.state === "ERROR" ? "bg-rose-950/30" : ""}`}>
            <td className="p-2"><a className="hover:underline" href={`https://${d.url}`} target="_blank">{d.name}</a></td>
            <td><Badge v={d.state} /></td><td className="text-neutral-400">{d.target ?? "preview"}</td>
            <td className="max-w-md truncate text-neutral-400">{d.commit}</td><td className="text-neutral-400">{ago(d.createdAt)}</td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
