import { NextRequest } from "next/server";
import { PROJECTS } from "@/data/projects";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function getPrompt() {
  const p = path.join(process.cwd(), "src/content/mascots/pako.md");
  return readFile(p, "utf8");
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    openedSlugs?: string[];
    section?: string;
    message?: string;
  };

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return Response.json({
      reply: fallbackPako(body.openedSlugs ?? [], body.section),
    });
  }

  const system = await getPrompt();
  const opened = (body.openedSlugs ?? [])
    .map((s) => PROJECTS.find((p) => p.slug === s)?.name)
    .filter(Boolean)
    .join(", ");

  const userMsg = [
    body.message ? `visitor said: "${body.message}"` : "",
    opened ? `opened so far: ${opened}` : "opened so far: none",
    body.section ? `currently viewing: ${body.section}` : "",
    "give one short comment.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userMsg },
        ],
        max_tokens: 80,
        temperature: 0.8,
      }),
    });
    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
    return Response.json({ reply: reply || fallbackPako(body.openedSlugs ?? [], body.section) });
  } catch {
    return Response.json({ reply: fallbackPako(body.openedSlugs ?? [], body.section) });
  }
}

function fallbackPako(opened: string[], section?: string) {
  if (opened.length === 0) return "hover any card for the story. click to open it.";
  if (section === "headline") return "headliners are the ones i'd actually demo.";
  const last = opened[opened.length - 1];
  const p = PROJECTS.find((x) => x.slug === last);
  return p ? `${p.name} — good pick. try the next one to the right.` : "keep going.";
}
