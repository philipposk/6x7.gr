import data from "./skills.generated.json";
import type { InstallCommand } from "./skill-sources";

export interface Skill {
  slug: string;
  name: string;
  description: string;
  plugin: string;
  repo: string;
  sourceUrl: string;
  agents: string[];
  installs: InstallCommand[];
  html: string;
}

export const SKILLS = data.skills as Skill[];

export function skillBySlug(slug: string) {
  return SKILLS.find((s) => s.slug === slug);
}
