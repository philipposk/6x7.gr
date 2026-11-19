import { GROUPS, PROJECTS, type Project } from "@/data/projects";

/** Projects that get a public page at /apps/<slug>: live, not parked, not "coming soon". */
export const APP_PAGES: Project[] = PROJECTS.filter((p) => p.live && !p.comingSoon && p.group !== "parked");

export function appBySlug(slug: string): Project | undefined {
  return APP_PAGES.find((p) => p.slug === slug);
}

export function groupLabel(id: Project["group"]): string {
  return GROUPS.find((g) => g.id === id)?.label ?? id;
}

/** Other public apps in the same group, for internal links between related apps. */
export function relatedApps(p: Project, max = 6): Project[] {
  return APP_PAGES.filter((o) => o.group === p.group && o.slug !== p.slug).slice(0, max);
}

export const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  beta: "Beta",
  wip: "Work in progress",
  archived: "Archived",
};
