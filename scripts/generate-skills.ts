// Build-time: read skills/*/SKILL.md from every repo in SKILL_SOURCES and
// write src/data/skills.generated.json. Uses a local checkout when present,
// otherwise the GitHub API. If everything fails, keeps the committed JSON.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { Marked, type Tokens } from "marked";
import { SKILL_SOURCES, AGENT_LABELS, type SkillSource } from "../src/data/skill-sources.ts";
import { parseSkillMd, slugify, escapeHtml } from "../src/lib/skillParse.ts";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "src/data/skills.generated.json");
const preferRemote = process.env.SKILLS_SOURCE === "github";

const marked = new Marked({
  gfm: true,
  renderer: {
    // Never pass raw HTML from SKILL.md through.
    html(token: Tokens.HTML | Tokens.Tag) {
      return escapeHtml(token.text);
    },
    link(token: Tokens.Link) {
      const href = /^(https?:|mailto:|#|\/)/i.test(token.href) ? token.href : "#";
      const text = this.parser.parseInline(token.tokens);
      const ext = /^https?:/i.test(href);
      return `<a href="${escapeHtml(href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${text}</a>`;
    },
    image(token: Tokens.Image) {
      return escapeHtml(token.text);
    },
  },
});

interface RawSkill { dir: string; raw: string }

function readLocal(src: SkillSource): RawSkill[] | null {
  if (!src.localPath) return null;
  const base = resolve(ROOT, src.localPath, src.skillsDir);
  if (!existsSync(base)) return null;
  return readdirSync(base, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(base, d.name, "SKILL.md")))
    .map((d) => ({ dir: d.name, raw: readFileSync(join(base, d.name, "SKILL.md"), "utf8") }));
}

async function readRemote(src: SkillSource): Promise<RawSkill[]> {
  const headers: Record<string, string> = { "User-Agent": "6x7-skills-generator" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(
    `https://api.github.com/repos/${src.repo}/contents/${src.skillsDir}?ref=${src.ref}`,
    { headers },
  );
  if (!res.ok) throw new Error(`${src.repo}: GitHub ${res.status}`);
  const items = (await res.json()) as { name: string; type: string }[];
  const out: RawSkill[] = [];
  for (const it of items.filter((i) => i.type === "dir")) {
    const r = await fetch(
      `https://raw.githubusercontent.com/${src.repo}/${src.ref}/${src.skillsDir}/${it.name}/SKILL.md`,
    );
    if (r.ok) out.push({ dir: it.name, raw: await r.text() });
  }
  return out;
}

async function main() {
  const skills = [];
  let failures = 0;
  for (const src of SKILL_SOURCES) {
    let raws: RawSkill[] | null = preferRemote ? null : readLocal(src);
    let origin = "local";
    if (!raws) {
      origin = "github";
      try {
        raws = await readRemote(src);
      } catch (e) {
        console.warn(`[skills] ${(e as Error).message}`);
        failures++;
        continue;
      }
    }
    const pluginSlug = slugify(src.plugin);
    for (const { dir, raw } of raws.sort((a, b) => a.dir.localeCompare(b.dir))) {
      const { meta, body } = parseSkillMd(raw);
      const name = meta.name || dir;
      skills.push({
        slug: `${pluginSlug}-${slugify(name)}`,
        name,
        description: meta.description ?? "",
        plugin: src.plugin,
        repo: src.repo,
        sourceUrl: `https://github.com/${src.repo}/blob/${src.ref}/${src.skillsDir}/${dir}/SKILL.md`,
        agents: src.installs.filter((i) => !i.planned).map((i) => AGENT_LABELS[i.agent]),
        installs: src.installs,
        html: await marked.parse(body),
      });
    }
    console.log(`[skills] ${src.repo}: ${raws.length} skills (${origin})`);
  }
  if (failures === SKILL_SOURCES.length && existsSync(OUT)) {
    console.warn("[skills] all sources failed; keeping committed skills.generated.json");
    return;
  }
  writeFileSync(OUT, JSON.stringify({ skills }, null, 2) + "\n");
}

await main();
