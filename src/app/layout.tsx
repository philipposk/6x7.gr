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
  metadataBase: new URL("https://6x7.gr"),
  title: {
    default: "6x7 — Filippos Ktistakis",
    template: "%s · 6x7",
  },
  description:
    "Filippos Ktistakis builds calm, modern apps: LifeHub, Cosmo, Daisy, AI OS, and 30+ more. Available for hire.",
  openGraph: {
    type: "website",
    url: "https://6x7.gr",
    title: "6x7 — Filippos Ktistakis",
    description:
      "Calm, modern apps. LifeHub, Cosmo, Daisy, AI OS, and 30+ more.",
    siteName: "6x7",
  },
  twitter: {
    card: "summary_large_image",
    title: "6x7 — Filippos Ktistakis",
    description:
      "Calm, modern apps. LifeHub, Cosmo, Daisy, AI OS, and 30+ more.",
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
  email: "mailto:phktistakis@gmail.com",
  sameAs: [
    "https://github.com/philipposk",
    "https://www.linkedin.com/in/filippos-dimitrios-ktistakis-b7b1aa242",
  ],
  jobTitle: "Independent software engineer & founder",
  description:
    "Builds calm, modern personal-software apps that respect privacy and reduce app-switching. Headline projects: LifeHub, Cosmo, Daisy, AI OS, Praiser.",
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
