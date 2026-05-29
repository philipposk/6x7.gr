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
};

export default nextConfig;
