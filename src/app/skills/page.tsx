import type { Metadata } from "next";
import Link from "next/link";
import { SKILLS } from "@/data/skills";
import { SkillsBrowser } from "@/components/skills/SkillsBrowser";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Skills & Plugins",
  description:
    "Agent skills and plugins by Filippos Ktistakis for Claude Code, Cursor, Codex, OpenClaw and Hermes. Search, read each SKILL.md, copy the install command.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <main className="flex flex-col flex-1">
      <section className="px-6 md:px-12 pt-20 pb-10 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition">← 6x7</Link>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">Skills & Plugins</h1>
          <p className="mt-4 max-w-xl text-[var(--fg-muted)] leading-relaxed">
            Agent skills I build and use. Each one is a plain SKILL.md that works in Claude Code, Cursor,
            Codex and other agents. Synced from GitHub on every deploy.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto">
          <SkillsBrowser skills={SKILLS} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
