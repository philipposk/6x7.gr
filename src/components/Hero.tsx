"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const HeroScene = dynamic(
  () => import("./scene/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);

export function Hero() {
  return (
    <section className="relative isolate min-h-[88vh] flex items-center px-6 md:px-12">
      <HeroScene />
      <div className="relative z-10 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-6">
          6 × 7 = forty-two apps and counting
        </p>
        <motion.h1
          initial={{ y: 12, opacity: 0.4 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] text-[var(--fg)]"
        >
          Filippos builds calm,
          <br />
          <span className="text-[var(--accent)]">modern apps.</span>
        </motion.h1>
        <p className="mt-6 text-lg md:text-xl text-[var(--fg-muted)] max-w-xl leading-relaxed">
          One person, many tools. Each one tries to do a small thing well — and
          stay out of your way the rest of the time.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#galaxy"
            className="px-5 py-3 rounded-full bg-[var(--accent)] text-black text-sm font-medium hover:brightness-110 transition"
          >
            Browse the apps →
          </a>
          <a
            href="#contact"
            className="px-5 py-3 rounded-full glass text-sm font-medium hover:bg-white/5 transition text-[var(--fg)]"
          >
            Say hi
          </a>
        </div>
        <div className="mt-16 flex items-center gap-3 text-xs text-[var(--fg-muted)]">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          Pako & Pipo are loose on this page. Open 10 projects to meet them properly.
        </div>
      </div>
    </section>
  );
}
