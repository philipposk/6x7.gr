"use client";

import { useMemo, useState } from "react";
import { GROUPS, PROJECTS, projectsByGroup, ProjectStatus } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { useOpenedProjects } from "@/lib/useOpenedProjects";

const STATUS_FILTERS: { id: ProjectStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "beta", label: "Beta" },
  { id: "wip", label: "WIP" },
];

export function ProjectGalaxy() {
  const { count } = useOpenedProjects();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (slugList: ReturnType<typeof projectsByGroup>) =>
      slugList.filter((p) => {
        if (status !== "all" && p.status !== status) return false;
        if (!q) return true;
        return (
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
        );
      });
  }, [query, status]);

  const anyVisible = GROUPS.some((g) => matches(projectsByGroup(g.id)).length);

  return (
    <section id="galaxy" className="relative px-6 md:px-12 py-24">
      <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-3">
            The catalogue
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            My Apps.
          </h2>
          <p className="mt-3 text-[var(--fg-muted)] max-w-xl">
            Make them your apps.
          </p>
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm flex items-center gap-3">
          <span className="text-[var(--fg-muted)]">explored</span>
          <span className="font-mono text-[var(--accent)]">{count}</span>
          <span className="text-[var(--fg-muted)]">/</span>
          <span className="font-mono">{PROJECTS.length}</span>
        </div>
      </div>

      <div className="mb-12 flex items-center gap-3 flex-wrap">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the apps…"
          aria-label="Search apps by name or description"
          className="glass rounded-full px-4 py-2 text-sm w-full sm:w-64 outline-none focus:border-[var(--accent)] placeholder:text-[var(--fg-muted)]"
        />
        <div className="flex items-center gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatus(f.id)}
              aria-pressed={status === f.id}
              className={`px-3 py-1.5 rounded-full text-xs transition border ${
                status === f.id
                  ? "bg-[var(--fg)] text-black border-transparent font-medium"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {GROUPS.map((g) => {
          const items = matches(projectsByGroup(g.id));
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
        {!anyVisible && (
          <p className="text-[var(--fg-muted)] text-sm">
            Nothing matches “{query}”. Try a shorter word, or clear the filter.
          </p>
        )}
      </div>
    </section>
  );
}
