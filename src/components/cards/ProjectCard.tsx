"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { useOpenedProjects } from "@/lib/useOpenedProjects";

function GhIcon({ size = 12 }: { size?: number }) {
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

function searchUrl(name: string) {
  const q = encodeURIComponent(name.replace(/[^\w\s-]/g, ""));
  return `https://github.com/philipposk?tab=repositories&q=${q}`;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { open, opened } = useOpenedProjects();
  const isOpened = opened.includes(project.slug);
  const primary = project.live ?? project.repo ?? searchUrl(project.name);
  const isExternal = primary.startsWith("http");

  const handleOpen = () => {
    open(project.slug);
  };

  return (
    <motion.a
      href={primary}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={handleOpen}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
      className="group relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-2xl"
    >
      <div className="glass rounded-2xl p-5 h-full flex flex-col gap-3 transition-all duration-300 group-hover:border-[var(--border-strong)] group-hover:glow-ring min-h-[210px]">
        <div className="flex items-start justify-between">
          <div
            className="text-3xl text-[var(--accent)] opacity-80 group-hover:opacity-100 transition"
            aria-hidden
          >
            {project.glyph ?? "◆"}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[var(--fg-muted)] px-2 py-0.5 rounded-full border border-[var(--border)] whitespace-nowrap">
            {STATUS_LABEL[project.status]}
            {isOpened && <span className="ml-1 text-[var(--accent)]">·seen</span>}
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight leading-tight">
          {project.name}
        </h3>

        <p className="text-sm text-[var(--fg-muted)] leading-relaxed flex-1">
          {project.tagline}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--accent)] text-black font-medium inline-flex items-center gap-1 group-hover:brightness-110 transition">
            Open <ExternalLink size={12} />
          </span>
          {project.repo && project.repo !== primary && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOpen();
                window.open(project.repo, "_blank", "noopener,noreferrer");
              }}
              className="text-xs px-3 py-1.5 rounded-full glass hover:bg-white/5 transition inline-flex items-center gap-1 text-[var(--fg-muted)]"
              aria-label={`Open ${project.name} repo`}
            >
              <GhIcon size={12} /> Repo
            </button>
          )}
        </div>
      </div>
    </motion.a>
  );
}
