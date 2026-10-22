import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Auth pages have no SEO value.
        disallow: ["/login", "/auth/", "/admin"],
      },
    ],
    sitemap: "https://6x7.gr/sitemap.xml",
  };
}
