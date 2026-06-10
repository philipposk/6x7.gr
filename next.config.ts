import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/minigames", destination: "/minigames/index.html" },
      { source: "/minigames/", destination: "/minigames/index.html" },
      { source: "/weeknumber", destination: "/weeknumber/index.html" },
      { source: "/weeknumber/", destination: "/weeknumber/index.html" },
      { source: "/AppBlueprints", destination: "/AppBlueprints/index.html" },
      { source: "/AppBlueprints/", destination: "/AppBlueprints/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Stops browsers from MIME-sniffing responses into executable types.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // The site has no reason to be embedded in someone else's iframe.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Send only the origin when navigating to other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site never needs these browser capabilities.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
