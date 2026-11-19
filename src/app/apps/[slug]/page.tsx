import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APP_PAGES, appBySlug, groupLabel, relatedApps, STATUS_LABEL } from "@/data/app-pages";
import { Footer } from "@/components/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return APP_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = appBySlug((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${groupLabel(p.group).toLowerCase()} app`,
    description: p.tagline.slice(0, 160),
    alternates: { canonical: `/apps/${p.slug}` },
    openGraph: { title: p.name, description: p.tagline.slice(0, 200), url: `/apps/${p.slug}` },
  };
}

export default async function AppPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = appBySlug((await params).slug);
  if (!p) notFound();
  const related = relatedApps(p);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.tagline,
        url: p.live,
        applicationCategory: groupLabel(p.group),
        operatingSystem: "Web",
        ...(p.repo ? { codeRepository: p.repo } : {}),
        author: { "@type": "Person", name: "Filippos Ktistakis", url: "https://portfolio.6x7.gr" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "6x7", item: "https://portfolio.6x7.gr" },
          { "@type": "ListItem", position: 2, name: "Apps", item: "https://portfolio.6x7.gr/apps" },
          { "@type": "ListItem", position: 3, name: p.name, item: `https://portfolio.6x7.gr/apps/${p.slug}` },
        ],
      },
    ],
  }).replace(/</g, "\\u003c");
  const host = p.live ? new URL(p.live).host : "";
  return (
    <main className="flex flex-col flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <section className="px-6 md:px-12 pt-20 pb-10 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto">
          <Link href="/apps" className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition">← All apps</Link>
          <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
            {groupLabel(p.group)} · {STATUS_LABEL[p.status]}
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            {p.glyph ? <span aria-hidden="true" className="mr-3">{p.glyph}</span> : null}
            {p.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">{p.tagline}</p>
          {p.note ? <p className="mt-3 max-w-2xl text-[var(--fg-muted)] leading-relaxed">{p.note}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a href={p.live} className="rounded-full bg-[var(--fg)] px-4 py-2 text-[var(--bg)] font-medium">Open {host} ↗</a>
            {p.repo ? (
              <a href={p.repo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--border)] px-4 py-2">Source on GitHub ↗</a>
            ) : null}
            {p.caseStudy ? (
              <a href={p.caseStudy} className="rounded-full border border-[var(--border)] px-4 py-2">Case study</a>
            ) : null}
          </div>
        </div>
      </section>
      {related.length ? (
        <section className="px-6 md:px-12 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-medium">More {groupLabel(p.group).toLowerCase()}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link href={`/apps/${o.slug}`} className="block rounded-lg border border-[var(--border)] p-4 hover:border-[var(--fg-muted)] transition">
                    <span className="font-medium">{o.name}</span>
                    <span className="mt-1 block text-sm text-[var(--fg-muted)] line-clamp-2">{o.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <Footer />
    </main>
  );
}
