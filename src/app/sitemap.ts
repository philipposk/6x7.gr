import type { MetadataRoute } from "next";
import { SKILLS } from "@/data/skills";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.6x7.gr",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: "https://www.6x7.gr/skills", changeFrequency: "weekly", priority: 0.8 },
    ...SKILLS.map((s) => ({
      url: `https://www.6x7.gr/skills/${s.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
