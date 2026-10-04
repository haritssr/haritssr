import type { Metadata } from "next";

import { RSS_PATH, SITE_URL } from "@/utils/site";

export const OPEN_GRAPH_IMAGE_SIZE = { width: 1200, height: 630 };

export function createPageMetadata({
  title,
  description,
  path,
  publishedTime,
  socialDescription = description,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
  socialDescription?: string;
}): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const imageUrl = new URL("/api/og", SITE_URL);
  imageUrl.search = new URLSearchParams({
    v: "blue-mint-1",
    title,
    description: socialDescription,
    path,
  }).toString();
  const images = [
    {
      url: imageUrl.toString(),
      ...OPEN_GRAPH_IMAGE_SIZE,
      alt: `${title} — ${socialDescription}`,
    },
  ];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": new URL(RSS_PATH, SITE_URL).toString() },
    },
    openGraph: {
      title,
      description: socialDescription,
      url,
      images,
      siteName: "Harits Syah",
      locale: "en_US",
      ...(publishedTime === undefined
        ? { type: "website" }
        : { type: "article", publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      images,
    },
  };
}
