import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { GROUPS, PROJECTS, type ProjectGroup } from "../src/data/projects.ts";

const ROOT = join(import.meta.dirname, "..");
const TEMPLATE_PATH = join(ROOT, "scripts/llms-template.md");
const OUTPUT_PATH = join(ROOT, "public/llms.txt");

const LLMS_SECTIONS: Record<ProjectGroup, string | null> = {
  headline: "## Headline projects",
  productivity: "## Life & productivity",
  creator: "## Creator tools",
  health: "## Health & learning",
  games: "## Games",
  wip: "## Work in progress",
  infra: "## Libraries & infra other developers use",
  this: null,
};

function formatProjectLine(project: (typeof PROJECTS)[number]): string {
  const suffix = project.comingSoon ? " (coming soon)" : "";
  const links: string[] = [];
  if (project.live) links.push(project.live);
  if (project.repo) links.push(project.repo);
  const linkPart = links.length ? ` ${links.join(" · ")}` : "";
  return `- **${project.name}**${suffix} — ${project.tagline}${linkPart}`;
}

function renderProjects(): string {
  const blocks: string[] = [];

  for (const group of GROUPS) {
    const heading = LLMS_SECTIONS[group.id];
    if (!heading) continue;

    const projects = PROJECTS.filter((p) => p.group === group.id);
    if (!projects.length) continue;

    blocks.push(heading, "", ...projects.map(formatProjectLine), "");
  }

  return blocks.join("\n").trimEnd();
}

function main() {
  const template = readFileSync(TEMPLATE_PATH, "utf8");
  const projectsBlock = renderProjects();

  if (!template.includes("<!-- PROJECTS -->")) {
    throw new Error("llms template missing <!-- PROJECTS --> marker");
  }

  const output = template.replace("<!-- PROJECTS -->", projectsBlock);
  writeFileSync(OUTPUT_PATH, output, "utf8");
  console.log(`Wrote ${OUTPUT_PATH} (${PROJECTS.length} projects)`);
}

main();
