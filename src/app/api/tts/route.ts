import { NextRequest } from "next/server";

export const runtime = "nodejs";

// Mascot → OpenAI TTS voice. pipo = calm female, pako = lighter playful male.
// OpenAI voices: alloy, echo, fable, onyx, nova, shimmer.
const VOICE: Record<string, { voice: string; speed: number }> = {
  pipo: { voice: "shimmer", speed: 0.96 },
  pako: { voice: "echo", speed: 1.06 },
};

export async function POST(req: NextRequest) {
  const { text, kind } = (await req.json().catch(() => ({}))) as {
    text?: string;
    kind?: string;
  };

  const key = process.env.OPENAI_API_KEY;
  // No key → 204 tells the client to fall back to browser speech synthesis.
  if (!key || !text?.trim()) return new Response(null, { status: 204 });

  const cfg = VOICE[kind ?? "pako"] ?? VOICE.pako;

  try {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: cfg.voice,
        input: text.slice(0, 300),
        speed: cfg.speed,
        response_format: "mp3",
      }),
    });
    if (!res.ok) return new Response(null, { status: 204 });
    const buf = await res.arrayBuffer();
    return new Response(buf, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
