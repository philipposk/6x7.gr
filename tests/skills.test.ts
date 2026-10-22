import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseSkillMd, slugify, matchesQuery, escapeHtml } from "../src/lib/skillParse.ts";

test("parseSkillMd reads frontmatter and body", () => {
  const { meta, body } = parseSkillMd('---\nname: setup\ndescription: "Do a: thing"\n---\n# Hi\n');
  assert.equal(meta.name, "setup");
  assert.equal(meta.description, "Do a: thing");
  assert.equal(body, "# Hi\n");
});

test("parseSkillMd without frontmatter keeps body", () => {
  assert.deepEqual(parseSkillMd("# x"), { meta: {}, body: "# x" });
});

test("slugify and escapeHtml", () => {
  assert.equal(slugify("New App!"), "new-app");
  assert.equal(escapeHtml('<a href="x">'), "&lt;a href=&quot;x&quot;&gt;");
});

test("matchesQuery matches all terms across fields", () => {
  const s = { name: "launch", description: "Publish your app", plugin: "Shipyard", agents: ["Cursor"] };
  assert.ok(matchesQuery(s, ""));
  assert.ok(matchesQuery(s, "shipyard cursor"));
  assert.ok(!matchesQuery(s, "video"));
});

test("generated skills are complete and slugs unique", () => {
  const data = JSON.parse(readFileSync(join(import.meta.dirname, "../src/data/skills.generated.json"), "utf8"));
  assert.ok(data.skills.length > 0);
  const slugs = new Set();
  for (const s of data.skills) {
    assert.ok(s.name && s.description && s.html, s.slug);
    assert.ok(!/<script/i.test(s.html), `${s.slug} has raw script`);
    assert.ok(!slugs.has(s.slug));
    slugs.add(s.slug);
  }
});
