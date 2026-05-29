"use client";

import { motion } from "framer-motion";

export type MascotKind = "pako" | "pipo";

const PALETTE: Record<MascotKind, { body: string; eye: string; cheek: string; accent: string }> = {
  pako: { body: "#c7f25b", eye: "#0a0a0a", cheek: "#f25b9a", accent: "#5b8df2" },
  pipo: { body: "#5b8df2", eye: "#0a0a0a", cheek: "#c7f25b", accent: "#f25b9a" },
};

export function MascotCharacter({
  kind,
  muted,
  onToggleMute,
  talking,
}: {
  kind: MascotKind;
  muted: boolean;
  onToggleMute: () => void;
  talking: boolean;
}) {
  const c = PALETTE[kind];
  return (
    <motion.button
      type="button"
      onClick={onToggleMute}
      aria-label={muted ? `Unmute ${kind}` : `Mute ${kind}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
      className="relative w-14 h-14 cursor-pointer"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <defs>
          <radialGradient id={`grad-${kind}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor={c.body} stopOpacity="1" />
            <stop offset="100%" stopColor={c.accent} stopOpacity="0.85" />
          </radialGradient>
        </defs>

        <ellipse cx="50" cy="92" rx="22" ry="3" fill="rgba(0,0,0,0.35)" />

        <motion.path
          d="M 18 50 Q 18 18 50 18 Q 82 18 82 50 Q 82 82 50 82 Q 18 82 18 50 Z"
          fill={`url(#grad-${kind})`}
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="1"
        />

        <circle cx="36" cy="46" r="6" fill="white" />
        <circle cx="64" cy="46" r="6" fill="white" />
        <motion.circle
          cx="36"
          cy="48"
          r="3"
          fill={c.eye}
          animate={{ cy: [48, 48, 49, 48], cx: [36, 37, 36, 35, 36] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="64"
          cy="48"
          r="3"
          fill={c.eye}
          animate={{ cy: [48, 48, 49, 48], cx: [64, 65, 64, 63, 64] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <ellipse cx="28" cy="58" rx="4" ry="2.5" fill={c.cheek} opacity="0.55" />
        <ellipse cx="72" cy="58" rx="4" ry="2.5" fill={c.cheek} opacity="0.55" />

        {!muted ? (
          <motion.path
            d="M 40 66 Q 50 74 60 66"
            fill="none"
            stroke={c.eye}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={
              talking
                ? { d: ["M 40 66 Q 50 74 60 66", "M 40 68 Q 50 64 60 68", "M 40 66 Q 50 74 60 66"] }
                : undefined
            }
            transition={{ duration: 0.4, repeat: talking ? Infinity : 0 }}
          />
        ) : (
          <g>
            <line x1="38" y1="68" x2="62" y2="68" stroke={c.eye} strokeWidth="2.5" strokeLinecap="round" />
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1={40 + i * 4}
                y1={64}
                x2={40 + i * 4}
                y2={72}
                stroke={c.eye}
                strokeWidth="1.5"
              />
            ))}
            <circle cx="62" cy="68" r="2" fill={c.eye} />
          </g>
        )}

        <text
          x="50"
          y="14"
          textAnchor="middle"
          fontSize="6"
          fontFamily="monospace"
          fill="rgba(0,0,0,0.5)"
          fontWeight="700"
        >
          {kind.toUpperCase()}
        </text>
      </svg>
    </motion.button>
  );
}
