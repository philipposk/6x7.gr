import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PROJECTS } from "@/data/projects";
import { AuthButton } from "@/components/AuthButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.6x7.gr"),
  // The apex 307-redirects to www on Vercel, so www is the canonical host.
  alternates: { canonical: "./" },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, title: "6x7", statusBarStyle: "black-translucent" },
  title: {
    default: "6x7 — Filippos Ktistakis",
    template: "%s · 6x7",
  },
  description:
    "Filippos Ktistakis — independent software engineer in Copenhagen, Denmark. Card index of apps, contact form, and shared login across 6x7.gr.",
  openGraph: {
    type: "website",
    url: "https://www.6x7.gr",
    title: "6x7 — Filippos Ktistakis",
    description:
      "Apps and experiments by Filippos Ktistakis — browse the grid, get in touch, or sign in once for every 6x7 app.",
    siteName: "6x7",
  },
  twitter: {
    card: "summary_large_image",
    title: "6x7 — Filippos Ktistakis",
    description:
      "Apps and experiments by Filippos Ktistakis — browse the grid, get in touch, or sign in once for every 6x7 app.",
  },
};

export const viewport: Viewport = {
  themeColor: "#07070a",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Filippos Dimitrios Ktistakis",
  alternateName: "philipposk",
  url: "https://6x7.gr",
  email: "mailto:filippos@6x7.gr",
  sameAs: [
    "https://github.com/philipposk",
    "https://www.linkedin.com/in/filippos-dimitrios-ktistakis-b7b1aa242",
  ],
  jobTitle: "Independent software engineer & founder",
  description:
    "Independent software engineer in Athens. Personal-software side projects that respect privacy and reduce app-switching. Headline projects: LifeHub, Cosmo, Daisy, AI OS, Praiser.",
  knowsAbout: [
    "Personal software",
    "AI agents",
    "Voice assistants",
    "Local-first apps",
    "Next.js",
    "TypeScript",
    "Python",
    "Swift",
  ],
};

const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Apps by Filippos Ktistakis",
  itemListElement: PROJECTS.slice(0, 20).map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.name,
      description: p.tagline,
      url: p.live ?? p.repo ?? "https://6x7.gr",
      creator: { "@type": "Person", name: "Filippos Ktistakis" },
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthButton />
        {children}
      </body>
    </html>
  );
}
