import { GROUPS, projectsByGroup, type Project } from "@/data/projects";

/**
 * Projects that get a public page at /apps/<slug>: an external live URL, not parked, not "coming soon".
 * Same order as the home page (group, then rank). Entries whose `live` is an internal path (e.g. "/skills") already have their own page here.
 */
/** Apps kept out of search on purpose (noindex / robots-blocked on their own domain): no page here. */
const HIDDEN_FROM_SEARCH = new Set(["commitr", "ops-akademi"]);

export const APP_PAGES: Project[] = GROUPS.flatMap((g) => projectsByGroup(g.id)).filter(
  (p) =>
    !!p.live &&
    /^https?:\/\//.test(p.live) &&
    !p.comingSoon &&
    p.group !== "parked" &&
    !HIDDEN_FROM_SEARCH.has(p.slug),
);

/** Page title: the app name plus the start of its tagline, cut at a word boundary. */
export function appTitle(p: Project, max = 58): string {
  const first = p.tagline.split(/(?<=[.!?])\s|\s[—–]\s/)[0].replace(/[.!?]$/, "");
  let t = `${p.name}: ${first}`;
  if (t.length > max) t = t.slice(0, t.lastIndexOf(" ", max)).replace(/[,;:]$/, "") + "…";
  return t;
}

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
