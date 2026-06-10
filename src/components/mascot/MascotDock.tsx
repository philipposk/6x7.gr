"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// Pipo only speaks on milestones — between them this returns null and the
// previous bubble text stays visible. Stops the monotonous "X of Y. solid run"
// repeat every click.
function pipoLineForCount(count: number, total: number): string | null {
  if (count === 1) return "first one in.";
  if (count === 2) return "two opened.";
  if (count === 4) return "four. still warming up.";
  if (count === 7) return "seven. nice tempo.";
  if (count === 12) return "twelve. you're committed.";
  if (count === Math.floor(total / 2)) return "halfway through.";
  if (count === total) return `all ${total}. you've read every line.`;
  return null;
}

const PIPO_HELLO = (total: number) => `${total} apps in here. tap one to open.`;

export function MascotDock() {
  const { opened, count } = useOpenedProjects();
  const [mute, setMute] = useState<{ pako: boolean; pipo: boolean }>(() => readMute());
  const [pakoLine, setPakoLine] = useState<string>("");
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
    const controller = new AbortController();
    const id = window.setTimeout(() => {
      for (const m of milestones) {
        if (count >= m && !milestonesRef.current.has(m)) {
          milestonesRef.current.add(m);
          const line = pakoLineForCount(m, opened);
          if (line) setPakoLine(line);
          // Canned line shows instantly; if the Groq-backed route answers,
          // swap in the smarter line. Falls back silently on any failure.
          fetch("/api/pako", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ openedSlugs: opened }),
            signal: controller.signal,
          })
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => {
              const reply = j?.reply?.trim();
              if (reply && reply !== line) setPakoLine(reply);
            })
            .catch(() => {});
        }
      }
    }, 0);
    return () => {
      window.clearTimeout(id);
      controller.abort();
    };
  }, [count, opened]);

  const [pipoLine, setPipoLine] = useState<string>("");
  const pipoSeenRef = useRef<Set<number>>(new Set());

  // 4.5s after pako's hello so the two voices don't talk over each other.
  useEffect(() => {
    const id = window.setTimeout(
      () => setPipoLine(PIPO_HELLO(PROJECTS.length)),
      4500,
    );
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (count === 0) return;
    if (pipoSeenRef.current.has(count)) return;
    const line = pipoLineForCount(count, PROJECTS.length);
    if (!line) return;
    pipoSeenRef.current.add(count);
    const id = window.setTimeout(() => setPipoLine(line), 0);
    return () => window.clearTimeout(id);
  }, [count]);

  // Bubbles dismiss themselves after a beat instead of sitting on top of the
  // page forever (they covered the lower cards on mobile). Clearing the same
  // state the effect watches is intentional: "" short-circuits the rerun.
  useEffect(() => {
    if (!pakoLine) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred via timeout; empty value stops the loop
    const id = window.setTimeout(() => setPakoLine(""), 12_000);
    return () => window.clearTimeout(id);
  }, [pakoLine]);

  useEffect(() => {
    if (!pipoLine) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deferred via timeout; empty value stops the loop
    const id = window.setTimeout(() => setPipoLine(""), 10_000);
    return () => window.clearTimeout(id);
  }, [pipoLine]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none max-w-[calc(100vw-2rem)]">
      <div className="flex items-end gap-3 pointer-events-auto">
        <div className="flex flex-col items-end gap-1">
          <SpeechBubble
            text={pipoLine}
            side="right"
            muted={mute.pipo}
            kind="pipo"
          />
          <MascotCharacter
            kind="pipo"
            muted={mute.pipo}
            onToggleMute={toggleMutePipo}
            talking={!!pipoLine}
          />
        </div>
        <div className="flex flex-col items-end gap-1">
          <SpeechBubble
            text={pakoLine}
            side="right"
            muted={mute.pako}
            kind="pako"
          />
          <MascotCharacter
            kind="pako"
            muted={mute.pako}
            onToggleMute={toggleMutePako}
            talking={!!pakoLine}
          />
        </div>
      </div>
    </div>
  );
}

