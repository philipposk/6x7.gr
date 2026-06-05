"use client";

import { motion } from "framer-motion";

// Quiet editorial hero: typography first, no 3D theatrics, no mascot mentions.
// Backdrop is a subtle static gradient instead of the R3F floating blobs.
export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] flex items-center px-6 md:px-12 border-b border-[var(--border)]">
      <StaticBackdrop />
      <div className="relative z-10 max-w-3xl">
        <motion.h1
          initial={{ y: 8, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95] text-[var(--fg)]"
        >
          Filippos Ktistakis
        </motion.h1>
        <p className="mt-6 text-base md:text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed">
          Independent software engineer in Athens. Thirty-something side
          projects below — most are free, all are mine.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#galaxy"
            className="px-5 py-2.5 rounded-full bg-[var(--fg)] text-black text-sm font-medium hover:opacity-90 transition"
          >
            Browse the apps
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full border border-[var(--border)] text-sm font-medium hover:bg-white/5 transition text-[var(--fg)]"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}

function StaticBackdrop() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 80% 20%, rgba(255,255,255,0.04), transparent 70%), radial-gradient(60% 60% at 10% 90%, rgba(199,242,91,0.05), transparent 70%)",
        }}
      />
    </div>
  );
}
