import { NextRequest } from "next/server";
import { PROJECTS } from "@/data/projects";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    openedSlugs?: string[];
  };

  const total = PROJECTS.length;
  const n = body.openedSlugs?.length ?? 0;
  const key = process.env.GROQ_API_KEY;

  if (!key) {
    return Response.json({ reply: fallbackPipo(n, total) });
  }

  const system = await readFile(
    path.join(process.cwd(), "src/content/mascots/pipo.md"),
    "utf8",
  );
  const groups: Record<string, number> = {};
  for (const slug of body.openedSlugs ?? []) {
    const p = PROJECTS.find((x) => x.slug === slug);
    if (p) groups[p.group] = (groups[p.group] ?? 0) + 1;
  }
  const userMsg = `progress: ${n}/${total}. by group: ${
    JSON.stringify(groups)
  }. one short observation.`;

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
        max_tokens: 50,
        temperature: 0.5,
      }),
    });
    const data = await res.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
    return Response.json({ reply: reply || fallbackPipo(n, total) });
  } catch {
    return Response.json({ reply: fallbackPipo(n, total) });
  }
}

function fallbackPipo(n: number, total: number) {
  if (n === 0) return `${total} apps. zero opened.`;
  if (n < 3) return `${n} of ${total}. plenty left.`;
  if (n < 10) return `${n} of ${total}. streak forming.`;
  return `${n} of ${total}. solid run.`;
}
