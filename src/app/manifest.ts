import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Glasgow Good Food Group PWA",
    short_name: "GgfgPWA",
    description: "Good Food Restaurants in Glasgow",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/ggfg-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/ggfg-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
