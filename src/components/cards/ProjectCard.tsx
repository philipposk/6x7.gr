"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { useOpenedProjects } from "@/lib/useOpenedProjects";

/* ───────────────────────────────────────────────────────────────────
 * PER-CARD GLYPH COLOR  (easy to remove)
 * To revert to the single brand color: set COLORED_GLYPHS = false
 * (or delete CARD_COLORS + colorFor + this flag and use "var(--accent)"
 * in the glyph style below). Nothing else depends on it.
 * ─────────────────────────────────────────────────────────────────── */
const COLORED_GLYPHS = true;
const CARD_COLORS = [
  "#c7f25b", "#7bd0ff", "#ffb86b", "#ff8fa3", "#b794ff",
  "#5be0b0", "#ffd95b", "#8fd6ff", "#ff9f6b", "#9af07a",
];
function colorFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return CARD_COLORS[h % CARD_COLORS.length];
}

function GhIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.08 1.83 1.24 1.83 1.24 1.08 1.85 2.83 1.32 3.52 1 .1-.78.42-1.32.76-1.62-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.6-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.21.69.83.57A12 12 0 0 0 12 .3" />
    </svg>
  );
}

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  beta: "Beta",
  wip: "WIP",
  archived: "Archived",
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { open, opened } = useOpenedProjects();
  const isOpened = opened.includes(project.slug);
  const glyphColor = COLORED_GLYPHS ? colorFor(project.slug) : "var(--accent)";

  const primary = project.live ?? project.repo;
  const isExternal = !!primary && primary.startsWith("http");
  const clickable = !project.comingSoon && !!primary;

  const inner = (
    <div className="glass rounded-2xl p-5 h-full flex flex-col gap-3 transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:glow-ring min-h-[210px]">
      <div className="flex items-start justify-between">
        <div
          className="text-3xl opacity-90 group-hover:opacity-100 transition"
          style={{ color: glyphColor }}
          aria-hidden
        >
          {project.glyph ?? "◆"}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)] px-2 py-0.5 rounded-full border border-[var(--border)] whitespace-nowrap">
          {project.comingSoon ? "Coming soon" : STATUS_LABEL[project.status]}
          {!project.comingSoon && isOpened && (
            <span className="ml-1 text-[var(--accent)]">·seen</span>
          )}
        </span>
      </div>

      <h3 className="text-lg font-semibold tracking-tight leading-tight">
        {project.name}
      </h3>

      <p className="text-sm text-[var(--fg-muted)] leading-relaxed flex-1">
        {project.tagline}
      </p>
    </div>
  );

  // GitHub link — bottom-right corner of the card. Rendered as a sibling of
  // the card link (not inside it): nesting interactive elements inside an
  // <a> is invalid HTML and confuses screen readers.
  const ghButton = project.repo ? (
    <button
      type="button"
      onClick={() =>
        window.open(project.repo, "_blank", "noopener,noreferrer")
      }
      className="absolute bottom-4 right-4 z-10 p-1.5 rounded-full text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-white/5 transition"
      aria-label={`${project.name} on GitHub`}
    >
      <GhIcon size={15} />
    </button>
  ) : null;

  const wrapClass =
    "group relative block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

  if (!clickable) {
    // Coming-soon (or link-less) card: not clickable, no navigation.
    return (
      <div className="relative">
        <motion.div
          transition={{ duration: 0.25 }}
          style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
          className={`${wrapClass} cursor-default opacity-70`}
          aria-disabled
        >
          {inner}
        </motion.div>
        {ghButton}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
      className="relative h-full"
    >
      <a
        href={primary}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={() => open(project.slug)}
        className={`${wrapClass} h-full`}
      >
        {inner}
      </a>
      {ghButton}
    </motion.div>
  );
}
