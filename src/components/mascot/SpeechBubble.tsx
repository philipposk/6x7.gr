"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type MascotKind = "pako" | "pipo";

function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState(() => "");
  useEffect(() => {
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 18);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <>
      {shown}
      <span className="ml-0.5 inline-block w-1 h-3 align-middle bg-[var(--fg)] opacity-60 animate-pulse" />
    </>
  );
}

// Cache the chosen voice so we don't iterate getVoices() on every utterance.
let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferences: RegExp[] = [
    /Google US English/i,
    /Google UK English Female/i,
    /Samantha/i,
    /Karen/i,
    /Daniel/i,
    /Microsoft.*(Aria|Jenny|Guy)/i,
    /en[-_]US/i,
    /en[-_]GB/i,
    /^en/i,
  ];
  for (const re of preferences) {
    const v = voices.find((v) => re.test(v.name) || re.test(v.lang));
    if (v) {
      cachedVoice = v;
      return v;
    }
  }
  cachedVoice = voices[0] ?? null;
  return cachedVoice;
}

function useSpeech(
  text: string,
  muted: boolean,
  enabled: boolean,
  kind: MascotKind,
) {
  useEffect(() => {
    if (muted || !enabled || !text) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    const speak = () => {
      const utter = new SpeechSynthesisUtterance(text);
      const voice = pickVoice();
      if (voice) {
        utter.voice = voice;
        utter.lang = voice.lang;
      }
      // Tone: pako = lighter/playful, pipo = calmer/slower. Both stay
      // in a natural range so they sound human, not robotic.
      utter.rate = kind === "pipo" ? 0.92 : 1.0;
      utter.pitch = kind === "pipo" ? 0.95 : 1.18;
      utter.volume = 0.55;
      synth.cancel();
      synth.speak(utter);
    };

    // Voices load asynchronously in most browsers. If empty now, wait for
    // the voiceschanged event before speaking.
    if (synth.getVoices().length === 0) {
      const onChange = () => {
        synth.removeEventListener("voiceschanged", onChange);
        speak();
      };
      synth.addEventListener("voiceschanged", onChange);
      const fallback = window.setTimeout(speak, 800);
      return () => {
        synth.removeEventListener("voiceschanged", onChange);
        window.clearTimeout(fallback);
        synth.cancel();
      };
    }

    const id = window.setTimeout(speak, 120);
    return () => {
      window.clearTimeout(id);
      synth.cancel();
    };
  }, [text, muted, enabled, kind]);
}

export function SpeechBubble({
  text,
  side = "left",
  muted = false,
  speak = true,
  kind = "pako",
}: {
  text: string;
  side?: "left" | "right";
  muted?: boolean;
  speak?: boolean;
  kind?: MascotKind;
}) {
  useSpeech(text, muted, speak, kind);

  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className={`relative max-w-[220px] glass rounded-xl px-3 py-2 text-xs leading-snug ${
            side === "left" ? "rounded-bl-sm" : "rounded-br-sm"
          }`}
        >
          <Typewriter text={text} />
          <div
            className={`absolute ${
              side === "left" ? "-bottom-2 left-4" : "-bottom-2 right-4"
            } w-3 h-3 glass rotate-45`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
