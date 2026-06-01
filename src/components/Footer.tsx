export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-12 pb-32 md:pb-16 border-t border-[var(--border)] text-sm text-[var(--fg-muted)]">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[var(--fg)]">6 × 7 = 43</span>
          <span className="mx-2">·</span>
          Filippos Dimitrios Ktistakis · Copenhagen
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/philipposk/6x7.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)] transition"
          >
            View source
          </a>
          <a href="/llms.txt" className="hover:text-[var(--fg)] transition">
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
