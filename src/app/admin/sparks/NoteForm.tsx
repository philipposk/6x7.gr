"use client";
import { useActionState } from "react";
import { sendNote } from "./actions";

export function NoteForm({ projects }: { projects: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(sendNote, null as null | { ok: boolean; msg: string });
  return (
    <form action={action} className="flex flex-wrap gap-2">
      <select name="project_id" className="rounded bg-neutral-800 px-2 py-1">
        <option value="">Auto-match / Inbox</option>
        {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input name="text" required maxLength={4000} placeholder="Idea / update to send to Sparks" className="min-w-64 flex-1 rounded bg-neutral-800 px-2 py-1" />
      <button disabled={pending} className="rounded bg-sky-700 px-3 py-1 disabled:opacity-50">{pending ? "Sending…" : "Send to Sparks"}</button>
      {state && <span className={state.ok ? "text-emerald-400" : "text-rose-400"}>{state.msg}</span>}
    </form>
  );
}
