"use client";

import { useState } from "react";

export function CopyCommand({ command, label, planned }: { command: string; label?: string; planned?: boolean }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: the text is still selectable */
    }
  }
  return (
    <div className={planned ? "opacity-60" : undefined}>
      {label && (
        <p className="text-xs text-[var(--fg-muted)] mb-1.5">
          {label}
          {planned && <span className="ml-2 text-[10px] uppercase tracking-wider">listing coming soon</span>}
        </p>
      )}
      <div className="flex items-start gap-2 rounded-lg border border-[var(--border)] bg-black/40 px-3 py-2">
        <pre className="flex-1 overflow-x-auto font-mono text-xs leading-relaxed text-[var(--fg)] whitespace-pre">
          <span className="select-none text-[var(--fg-muted)]">$ </span>
          {command}
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy: ${command}`}
          className="shrink-0 rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
