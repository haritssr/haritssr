import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/accounts",
    },
    sitemap: "https://haritssr.com/sitemap.xml",
    host: "https://haritssr.com",
  };
}
