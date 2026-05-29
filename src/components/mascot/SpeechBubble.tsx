"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

function useSpeech(text: string, muted: boolean, enabled: boolean) {
  useEffect(() => {
    if (muted || !enabled || !text) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.volume = 0.6;
    window.speechSynthesis.cancel();
    const id = window.setTimeout(() => window.speechSynthesis.speak(utter), 120);
    return () => {
      window.clearTimeout(id);
      window.speechSynthesis.cancel();
    };
  }, [text, muted, enabled]);
}

export function SpeechBubble({
  text,
  side = "left",
  muted = false,
  speak = true,
}: {
  text: string;
  side?: "left" | "right";
  muted?: boolean;
  speak?: boolean;
}) {
  useSpeech(text, muted, speak);

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
