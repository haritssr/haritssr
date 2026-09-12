import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Harits Syah",
    short_name: "haritssr",
    description: "Developer, teacher, and founder.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/haritssr.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
