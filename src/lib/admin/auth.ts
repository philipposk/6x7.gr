import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Comma-separated allowlist, set in env. Never hardcode (public repo). */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const email = user?.email?.toLowerCase();
  const allowed = adminEmails();
  if (!user || !email || !user.email_confirmed_at || allowed.length === 0 || !allowed.includes(email)) {
    return { user: null, supabase } as const;
  }
  return { user, supabase } as const;
}

/** Call at the top of every admin page, action and route handler. */
export async function requireAdmin() {
  const res = await getAdmin();
  if (!res.user) redirect("/login?next=/admin");
  return res;
}
