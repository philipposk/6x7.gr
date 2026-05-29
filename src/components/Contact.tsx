"use client";

import { motion } from "framer-motion";
import { Copy, Mail, Check } from "lucide-react";

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.86-3.04-1.87 0-2.15 1.45-2.15 2.95v5.66H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.86 3.35-1.86 3.59 0 4.25 2.36 4.25 5.43v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.08 1.85 2.83 1.32 3.52 1 .1-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.6-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.21.69.83.57A12 12 0 0 0 12 .3" />
    </svg>
  );
}
import { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        honeypot: data.get("company"),
      }),
    });
    const j = await res.json().catch(() => ({ ok: false }));
    setStatus(j.ok ? "ok" : "err");
    if (j.ok) form.reset();
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText("phktistakis@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-3">
          Get in touch
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Say hi.
        </h2>
        <p className="mt-3 text-[var(--fg-muted)] max-w-xl">
          For collaborations, jobs, or just to point at one of these apps and
          ask how it works.
        </p>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} className="glass rounded-2xl p-6 flex flex-col gap-4">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hidden"
          />
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--fg-muted)] mb-1">
              Name
            </label>
            <input
              required
              name="name"
              maxLength={200}
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none py-2 text-sm transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--fg-muted)] mb-1">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              maxLength={200}
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none py-2 text-sm transition"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--fg-muted)] mb-1">
              Message
            </label>
            <textarea
              required
              name="message"
              rows={4}
              maxLength={4000}
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none py-2 text-sm transition resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="self-start px-5 py-2.5 rounded-full bg-[var(--accent)] text-black text-sm font-medium hover:brightness-110 transition disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending…"
              : status === "ok"
                ? "Sent ✓"
                : status === "err"
                  ? "Try again"
                  : "Send"}
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <a
            href="https://www.linkedin.com/in/filippos-dimitrios-ktistakis-b7b1aa242"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/5 transition tilt"
          >
            <span className="text-[var(--accent)]"><LinkedinIcon size={20} /></span>
            <div>
              <div className="text-sm font-medium">LinkedIn</div>
              <div className="text-xs text-[var(--fg-muted)]">filippos-dimitrios-ktistakis</div>
            </div>
          </a>
          <button
            onClick={copyEmail}
            className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/5 transition tilt text-left"
          >
            <Mail size={20} className="text-[var(--accent)]" />
            <div className="flex-1">
              <div className="text-sm font-medium">phktistakis@gmail.com</div>
              <div className="text-xs text-[var(--fg-muted)]">click to copy</div>
            </div>
            {copied ? <Check size={16} className="text-[var(--accent)]" /> : <Copy size={16} />}
          </button>
          <a
            href="https://github.com/philipposk"
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/5 transition tilt"
          >
            <span className="text-[var(--accent)]"><GithubIcon size={20} /></span>
            <div>
              <div className="text-sm font-medium">GitHub</div>
              <div className="text-xs text-[var(--fg-muted)]">@philipposk</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
