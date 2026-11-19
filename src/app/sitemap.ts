import type { MetadataRoute } from "next";
import { SKILLS } from "@/data/skills";
import { APP_PAGES } from "@/data/app-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://portfolio.6x7.gr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: "https://portfolio.6x7.gr/apps", changeFrequency: "weekly", priority: 0.9 },
    ...APP_PAGES.map((p) => ({
      url: `https://portfolio.6x7.gr/apps/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: "https://portfolio.6x7.gr/skills", changeFrequency: "weekly", priority: 0.8 },
    ...SKILLS.map((s) => ({
      url: `https://portfolio.6x7.gr/skills/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
