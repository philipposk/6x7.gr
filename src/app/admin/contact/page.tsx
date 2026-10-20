import { db } from "@/lib/admin/db";
import { Card, Notice, fmt } from "../ui";

export default async function Contact() {
  const sql = db("6x7");
  if (!sql) return <Notice>ADMIN_DB_URL_6X7 not set.</Notice>;
  const [exists] = await sql.unsafe<{ ok: boolean }[]>(`select to_regclass('public.contact_messages') is not null ok`);
  if (!exists.ok) return <Notice>Contact messages are only emailed today. Apply <code>docs/sql/contact_messages.sql</code> and set SUPABASE_SERVICE_ROLE_KEY so new messages are stored and shown here.</Notice>;
  const rows = await sql.unsafe<{ id: number; name: string; email: string; message: string; created_at: Date }[]>(
    `select id, name, email, message, created_at from public.contact_messages order by created_at desc limit 200`);
  return (
    <div className="space-y-3">
      {rows.length === 0 && <p className="text-neutral-400">No messages yet.</p>}
      {rows.map((r) => (
        <Card key={r.id}>
          <div className="flex justify-between"><b>{r.name} &lt;<a className="text-sky-400" href={`mailto:${r.email}`}>{r.email}</a>&gt;</b><span className="text-neutral-500">{fmt(r.created_at.toISOString())}</span></div>
          <p className="mt-2 whitespace-pre-wrap text-neutral-300">{r.message}</p>
        </Card>
      ))}
    </div>
  );
}
