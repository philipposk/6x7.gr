import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SKILLS, skillBySlug } from "@/data/skills";
import { CopyCommand } from "@/components/skills/CopyCommand";
import { Footer } from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = skillBySlug((await params).slug);
  if (!s) return {};
  return {
    title: `${s.name} · ${s.plugin} skill`,
    description: s.description.slice(0, 160),
    alternates: { canonical: `/skills/${s.slug}` },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = skillBySlug((await params).slug);
  if (!s) notFound();
  return (
    <main className="flex flex-col flex-1">
      <section className="px-6 md:px-12 pt-20 pb-10 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <Link href="/skills" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition">← All skills</Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">{s.plugin} · {s.repo}</p>
          <h1 className="mt-2 font-mono text-4xl md:text-5xl font-semibold tracking-tight">{s.name}</h1>
          <p className="mt-4 max-w-2xl text-[var(--fg-muted)] leading-relaxed">{s.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {s.agents.map((a) => (
              <span key={a} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--fg-muted)]">{a}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1fr_20rem]">
          <article className="skill-md min-w-0" dangerouslySetInnerHTML={{ __html: s.html }} />
          <aside className="space-y-4 lg:sticky lg:top-6 self-start">
            <h2 className="text-sm font-medium">Install {s.plugin}</h2>
            {s.installs.map((i) => (
              <CopyCommand key={i.agent} label={i.label} command={i.command} planned={i.planned} />
            ))}
            <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition">
              View SKILL.md on GitHub ↗
            </a>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
