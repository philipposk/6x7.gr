"use client";

import { GROUPS, PROJECTS, projectsByGroup } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useOpenedProjects } from "@/lib/useOpenedProjects";

export function ProjectGalaxy() {
  const { count } = useOpenedProjects();
  return (
    <section id="galaxy" className="relative px-6 md:px-12 py-24">
      <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-3">
            The catalogue
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Every app, grouped.
          </h2>
          <p className="mt-3 text-[var(--fg-muted)] max-w-xl">
            Each card is clickable. The little counter in the corner is for you
            and the mascots.
          </p>
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm flex items-center gap-3">
          <span className="text-[var(--fg-muted)]">explored</span>
          <span className="font-mono text-[var(--accent)]">{count}</span>
          <span className="text-[var(--fg-muted)]">/</span>
          <span className="font-mono">{PROJECTS.length}</span>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {GROUPS.map((g) => {
          const items = projectsByGroup(g.id);
          if (!items.length) return null;
          return (
            <div key={g.id}>
              <div className="mb-6 flex items-baseline gap-4 flex-wrap">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                  {g.label}
                </h3>
                <p className="text-sm text-[var(--fg-muted)]">{g.blurb}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
