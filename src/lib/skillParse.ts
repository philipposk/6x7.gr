// Pure helpers shared by scripts/generate-skills.ts and tests.

export interface Frontmatter {
  name?: string;
  description?: string;
  [key: string]: string | undefined;
}

/** Split a SKILL.md into simple `key: value` frontmatter and the body. */
export function parseSkillMd(raw: string): { meta: Frontmatter; body: string } {
  const text = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!m) return { meta: {}, body: text };
  const meta: Frontmatter = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
      try {
        v = JSON.parse(v) as string;
      } catch {
        v = v.slice(1, -1);
      }
    } else if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) {
      v = v.slice(1, -1);
    }
    meta[kv[1]] = v;
  }
  return { meta, body: text.slice(m[0].length) };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Case-insensitive search over name, description, plugin and agents. */
export function matchesQuery(
  s: { name: string; description: string; plugin: string; agents: string[] },
  q: string,
): boolean {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const hay = [s.name, s.description, s.plugin, ...s.agents].join(" ").toLowerCase();
  return terms.every((t) => hay.includes(t));
}
