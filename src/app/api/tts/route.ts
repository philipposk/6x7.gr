import { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs";

// Mascot voices via Microsoft Edge neural TTS (free, no API key).
// Voice list: https://github.com/rany2/edge-tts (Multilingual neural voices).
// pipo = warm, neutral female narrator. pako = friendly male guide.
const VOICE: Record<string, { voice: string; rate: string; pitch: string }> = {
  pipo: {
    voice: "en-US-EmmaMultilingualNeural",
    rate: "-4%",
    pitch: "-2Hz",
  },
  pako: {
    voice: "en-US-AndrewMultilingualNeural",
    rate: "+2%",
    pitch: "+0Hz",
  },
};

export async function POST(req: NextRequest) {
  const { text, kind } = (await req.json().catch(() => ({}))) as {
    text?: string;
    kind?: string;
  };

  if (!text?.trim()) return new Response(null, { status: 204 });

  const cfg = VOICE[kind ?? "pako"] ?? VOICE.pako;

  // node-edge-tts is CommonJS; dynamic-import gives us EdgeTTS in ESM.
  let EdgeTTS: new (opts: Record<string, unknown>) => {
    ttsPromise: (text: string, outPath: string) => Promise<void>;
  };
  try {
    const mod = (await import("node-edge-tts")) as {
      EdgeTTS?: typeof EdgeTTS;
      default?: { EdgeTTS?: typeof EdgeTTS } | typeof EdgeTTS;
    };
    const fromDefault =
      mod.default && typeof mod.default === "object" && "EdgeTTS" in mod.default
        ? (mod.default as { EdgeTTS: typeof EdgeTTS }).EdgeTTS
        : (mod.default as typeof EdgeTTS | undefined);
    EdgeTTS = mod.EdgeTTS ?? fromDefault ?? (mod as unknown as typeof EdgeTTS);
  } catch {
    return new Response(null, { status: 204 });
  }

  const tts = new EdgeTTS({
    voice: cfg.voice,
    outputFormat: "audio-24khz-96kbitrate-mono-mp3",
    rate: cfg.rate,
    pitch: cfg.pitch,
    volume: "+0%",
    timeout: 12000,
  });

  const outPath = path.join(
    tmpdir(),
    `tts-${crypto.randomUUID()}.mp3`,
  );

  // Edge endpoint is unofficial — small retry helps reliability.
  let lastErr: unknown = null;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await tts.ttsPromise(text.slice(0, 300), outPath);
      lastErr = null;
      break;
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 600));
    }
  }
  if (lastErr) return new Response(null, { status: 204 });

  try {
    const buf = await fs.readFile(outPath);
    await fs.unlink(outPath).catch(() => {});
    return new Response(new Uint8Array(buf), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
