"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { sparksSendNotes } from "@/lib/admin/sparks";

export async function sendNote(_: unknown, form: FormData) {
  const { supabase } = await requireAdmin();
  const text = String(form.get("text") ?? "").trim();
  const project_id = String(form.get("project_id") ?? "") || undefined;
  if (!text) return { ok: false, msg: "Empty note" };
  if (text.length > 4000) return { ok: false, msg: "Too long" };
  const r = await sparksSendNotes(supabase, [{
    external_id: `admin:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`,
    text, project_id, created_at: new Date().toISOString(), url: "https://6x7.gr/admin/sparks",
  }]);
  revalidatePath("/admin/sparks");
  return r.ok ? { ok: true, msg: `Sent (inserted ${r.result.inserted})` } : { ok: false, msg: r.reason };
}
