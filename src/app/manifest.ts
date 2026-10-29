import type { MetadataRoute } from "next";

// Home-screen app: without a manifest and PNG icons, phones draw a letter tile ("6") instead of the logo.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "6x7",
    short_name: "6x7",
    start_url: "/",
    display: "standalone",
    background_color: "#07070a",
    theme_color: "#07070a",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
