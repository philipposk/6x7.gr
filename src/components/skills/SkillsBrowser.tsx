"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Skill } from "@/data/skills";
import { matchesQuery } from "@/lib/skillParse";
import { CopyCommand } from "./CopyCommand";

export function SkillsBrowser({ skills }: { skills: Skill[] }) {
  const [q, setQ] = useState("");
  const [agent, setAgent] = useState<string | null>(null);
  const agents = useMemo(() => [...new Set(skills.flatMap((s) => s.agents))], [skills]);
  const shown = skills.filter((s) => matchesQuery(s, q) && (!agent || s.agents.includes(agent)));
  const plugins = [...new Set(skills.map((s) => s.repo))];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 mb-10">
        {plugins.map((repo) => {
          const first = skills.find((s) => s.repo === repo)!;
          const main = first.installs.find((i) => !i.planned);
          return (
            <div key={repo} className="glass rounded-2xl p-5">
              <p className="text-sm font-medium">
                {first.plugin} <span className="text-[var(--fg-muted)] font-normal">· {repo}</span>
              </p>
              {main && <div className="mt-3"><CopyCommand command={main.command} /></div>}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search skills…"
          aria-label="Search skills"
          className="flex-1 rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-5 py-2.5 text-sm outline-none focus:border-[var(--accent)]"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by agent">
          {[null, ...agents].map((a) => (
            <button
              key={a ?? "all"}
              type="button"
              onClick={() => setAgent(a)}
              aria-pressed={agent === a}
              className={`rounded-full px-3 py-1.5 text-xs border transition ${
                agent === a
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {a ?? "All agents"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--fg-muted)] mb-4" aria-live="polite">
        {shown.length} of {skills.length} skills
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/skills/${s.slug}`}
              className="glass block h-full rounded-2xl p-5 hover:border-[var(--border-strong)] transition"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">{s.plugin}</p>
              <h2 className="mt-1 font-mono text-lg text-[var(--fg)]">{s.name}</h2>
              <p className="mt-2 text-sm text-[var(--fg-muted)] line-clamp-3">{s.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.agents.map((a) => (
                  <span key={a} className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--fg-muted)]">
                    {a}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {!shown.length && <p className="text-sm text-[var(--fg-muted)] py-10 text-center">No skills match.</p>}
    </div>
  );
}
