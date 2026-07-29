// only for example

import type { MetadataRoute } from "next";

const EXTERNAL_DATA_URL = "https://jsonplaceholder.typicode.com/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(EXTERNAL_DATA_URL);
  const posts: Array<{ id: number }> = await response.json();

  const postUrls = posts.map((post) => ({
    url: `https://your-domain.com/posts/${post.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://your-domain.com",
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: "https://your-domain.com/guide",
      lastModified: new Date(),
      priority: 0.9,
    },
    ...postUrls,
  ];
}
