import { requireAdmin } from "@/lib/admin/auth";
import { sparksProjects } from "@/lib/admin/sparks";
import { Badge, Card, Notice, ago } from "../ui";
import { NoteForm } from "./NoteForm";

export default async function Sparks() {
  const { supabase } = await requireAdmin();
  const r = await sparksProjects(supabase);
  if (!r.ok) return <Notice>Could not load Sparks: {r.reason}</Notice>;
  const byStatus = new Map<string, number>();
  for (const p of r.items) byStatus.set(p.status, (byStatus.get(p.status) ?? 0) + 1);
  return (
    <div className="space-y-4">
      <Card title="Send an update / idea into Sparks"><NoteForm projects={r.items.map((p) => ({ id: p.id, name: p.name }))} /></Card>
      <p className="text-neutral-400">{r.items.length} projects · {[...byStatus].map(([s, n]) => `${s} ${n}`).join(" · ")} · <a className="text-sky-400" href="https://sparks.6x7.gr" target="_blank">open Sparks →</a></p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {r.items.map((p) => (
          <Card key={p.id}>
            <div className="flex items-center gap-2">
              <span>{p.emoji}</span>
              <a href={p.url ?? undefined} target="_blank" className="font-semibold hover:underline">{p.name}</a>
              <span className="ml-auto"><Badge v={p.status} /></span>
            </div>
            {p.description && <p className="mt-1 line-clamp-2 text-neutral-400">{p.description}</p>}
            <p className="mt-2 text-xs text-neutral-500">{p.note_count} notes · active {ago(p.last_activity_at ?? p.updated_at)}
              {p.repo_url && <> · <a className="hover:underline" href={p.repo_url} target="_blank">repo</a></>}
              {p.live_url && <> · <a className="hover:underline" href={p.live_url} target="_blank">live</a></>}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
