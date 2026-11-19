import type { Metadata } from "next";
import Link from "next/link";
import { GROUPS } from "@/data/projects";
import { APP_PAGES } from "@/data/app-pages";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "All apps",
  description:
    "Every live app by Filippos Ktistakis (6x7): productivity, creator tools, health and learning, games and more, with a short description of each.",
  alternates: { canonical: "/apps" },
};

export default function AppsPage() {
  const groups = GROUPS.map((g) => ({ ...g, apps: APP_PAGES.filter((p) => p.group === g.id) })).filter((g) => g.apps.length);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apps by 6x7",
    itemListElement: APP_PAGES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://portfolio.6x7.gr/apps/${p.slug}`,
      name: p.name,
    })),
  }).replace(/</g, "\\u003c");
  return (
    <main className="flex flex-col flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <section className="px-6 md:px-12 pt-20 pb-10 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition">← 6x7</Link>
          <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">All apps</h1>
          <p className="mt-4 max-w-xl text-[var(--fg-muted)] leading-relaxed">
            {APP_PAGES.length} live apps, each with its own page: what it does, where to open it and related apps.
          </p>
        </div>
      </section>
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {groups.map((g) => (
            <div key={g.id}>
              <h2 className="text-lg font-medium">{g.label}</h2>
              <p className="text-sm text-[var(--fg-muted)]">{g.blurb}</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {g.apps.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/apps/${p.slug}`} className="block rounded-lg border border-[var(--border)] p-4 hover:border-[var(--fg-muted)] transition">
                      <span className="font-medium">{p.name}</span>
                      <span className="mt-1 block text-sm text-[var(--fg-muted)] line-clamp-2">{p.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
