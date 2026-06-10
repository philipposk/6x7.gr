import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 min-h-[70vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-4">
          404
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          No app lives here.
        </h1>
        <p className="mt-4 text-[var(--fg-muted)]">
          But thirty-something of them live one click away.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-5 py-2.5 rounded-full bg-[var(--fg)] text-black text-sm font-medium hover:opacity-90 transition"
        >
          Back to the apps
        </Link>
      </div>
    </main>
  );
}
