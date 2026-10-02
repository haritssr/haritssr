import type { Metadata } from "next";

import { RSS_PATH, SITE_URL } from "@/utils/site";

export function createPageMetadata({
  title,
  description,
  path,
  publishedTime,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const images = [{ url: "/images/openGraphImage.png" }];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": new URL(RSS_PATH, SITE_URL).toString() },
    },
    openGraph: {
      title,
      description,
      url,
      images,
      siteName: "Harits Syah",
      locale: "en_US",
      ...(publishedTime === undefined
        ? { type: "website" }
        : { type: "article", publishedTime }),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
