import { NextRequest } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientIp, tooMany } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  // 5 messages per 10 minutes per IP — protects the Resend quota and inbox.
  const rl = rateLimit(`contact:${clientIp(req)}`, 5, 10 * 60_000);
  if (!rl.ok) return tooMany(rl.retryAfterSec);

  let body: { name?: string; email?: string; message?: string; honeypot?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  if (body.honeypot) {
    return Response.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }
  if (message.length > 4000 || name.length > 200 || email.length > 200) {
    return Response.json({ ok: false, error: "too long" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "bad email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[contact] no RESEND_API_KEY; would send:", { name, email, message });
    return Response.json({ ok: true, dryRun: true });
  }

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: "6x7.gr contact <onboarding@resend.dev>",
    to: ["phktistakis@gmail.com"],
    replyTo: email,
    subject: `[6x7.gr] ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
  return Response.json({ ok: true });
}
