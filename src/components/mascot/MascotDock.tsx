"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MascotCharacter } from "./MascotCharacter";
import { SpeechBubble } from "./SpeechBubble";
import { useOpenedProjects } from "@/lib/useOpenedProjects";
import { PROJECTS } from "@/data/projects";

const MUTE_KEY = "6x7:mute";

function readMute(): { pako: boolean; pipo: boolean } {
  if (typeof window === "undefined") return { pako: false, pipo: false };
  try {
    const raw = localStorage.getItem(MUTE_KEY);
    if (!raw) return { pako: false, pipo: false };
    const v = JSON.parse(raw);
    return { pako: !!v.pako, pipo: !!v.pipo };
  } catch {
    return { pako: false, pipo: false };
  }
}

const PAKO_LINES = {
  hello:
    "hi — i'm pako. i live here. hover any card for the story, click to open it.",
  three: "three down. nice. headliners are where i'd start if you haven't.",
  five: "five! try a 'work in progress' next — those are the most honest.",
  ten: "ok you're officially curious. the one i'd actually demo to a recruiter:",
  twenty: "twenty. you're a serious person. filippos says thank you.",
  adopt:
    "want me to stick around? i also live inside daisy, lifehub and cosmo if you have them.",
};

function pakoLineForCount(count: number, opened: string[]): string | null {
  if (count === 20) return PAKO_LINES.twenty;
  if (count === 10) {
    const pool = PROJECTS.filter((p) => !opened.includes(p.slug) && p.group !== "this");
    const rec = pool[Math.floor(Math.random() * pool.length)];
    return rec ? `${PAKO_LINES.ten} ${rec.name} — ${rec.tagline}` : PAKO_LINES.ten;
  }
  if (count === 5) return PAKO_LINES.five;
  if (count === 3) return PAKO_LINES.three;
  return null;
}

function pipoLineForCount(count: number, total: number): string {
  if (count === 0) return `${total} apps. zero opened.`;
  if (count < 3) return `${count} of ${total}. plenty left.`;
  if (count < 10) return `${count} of ${total}. streak forming.`;
  return `${count} of ${total}. solid run.`;
}

export function MascotDock() {
  const { opened, count } = useOpenedProjects();
  const [mute, setMute] = useState<{ pako: boolean; pipo: boolean }>(() => readMute());
  const [pakoLine, setPakoLine] = useState<string>("");
  const [adoptShown, setAdoptShown] = useState(false);
  const milestonesRef = useRef<Set<number>>(new Set());

  const persistMute = (next: { pako: boolean; pipo: boolean }) => {
    try {
      localStorage.setItem(MUTE_KEY, JSON.stringify(next));
    } catch {}
  };

  const toggleMutePako = useCallback(() => {
    setMute((m) => {
      const next = { ...m, pako: !m.pako };
      persistMute(next);
      return next;
    });
  }, []);

  const toggleMutePipo = useCallback(() => {
    setMute((m) => {
      const next = { ...m, pipo: !m.pipo };
      persistMute(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setPakoLine(PAKO_LINES.hello), 1200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    const milestones = [3, 5, 10, 20];
    const id = window.setTimeout(() => {
      for (const m of milestones) {
        if (count >= m && !milestonesRef.current.has(m)) {
          milestonesRef.current.add(m);
          const line = pakoLineForCount(m, opened);
          if (line) setPakoLine(line);
          if (m === 10) fireConfetti();
        }
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [count, opened]);

  useEffect(() => {
    if (adoptShown) return;
    const id = window.setTimeout(() => {
      setPakoLine(PAKO_LINES.adopt);
      setAdoptShown(true);
    }, 30_000);
    return () => window.clearTimeout(id);
  }, [adoptShown]);

  const pipoLine = useMemo(
    () => pipoLineForCount(count, PROJECTS.length),
    [count],
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none max-w-[calc(100vw-2rem)]">
      <div className="flex items-end gap-3 pointer-events-auto">
        <div className="flex flex-col items-end gap-1">
          <SpeechBubble text={pipoLine} side="right" muted={mute.pipo} />
          <MascotCharacter
            kind="pipo"
            muted={mute.pipo}
            onToggleMute={toggleMutePipo}
            talking={!!pipoLine}
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <SpeechBubble text={pakoLine} side="right" muted={mute.pako} />
          <MascotCharacter
            kind="pako"
            muted={mute.pako}
            onToggleMute={toggleMutePako}
            talking={!!pakoLine}
          />
        </div>
      </div>
      {pakoLine === PAKO_LINES.adopt && (
        <AdoptPanel onDismiss={() => setPakoLine("")} />
      )}
    </div>
  );
}

function AdoptPanel({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pointer-events-auto glass rounded-2xl p-4 text-sm max-w-sm"
    >
      <p className="mb-3 text-[var(--fg)]">Want Pako as a companion in Filippos&apos; other apps?</p>
      <div className="flex flex-wrap gap-2">
        <a
          href="https://github.com/philipposk/LifeHub"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full bg-[var(--accent)] text-black text-xs font-medium"
        >
          Try LifeHub
        </a>
        <a
          href="https://github.com/philipposk/Daisy--AI-Assistant-"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-full glass text-xs"
        >
          Try Daisy
        </a>
        <button
          onClick={onDismiss}
          className="px-3 py-1.5 rounded-full glass text-xs text-[var(--fg-muted)]"
        >
          Not now
        </button>
      </div>
    </motion.div>
  );
}

async function fireConfetti() {
  if (typeof window === "undefined") return;
  try {
    const mod = await import("canvas-confetti");
    const confetti = mod.default;
    const end = Date.now() + 1200;
    const colors = ["#c7f25b", "#5b8df2", "#f25b9a"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  } catch {}
}
