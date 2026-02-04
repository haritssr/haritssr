import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

// Word count utility
function countWords(content: string): number {
  const words = content.split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

const blogs = defineCollection({
  name: "blogs",
  directory: "content",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    topic: z.string(),
    image: z.string().optional(),
    content: z.string(),
  }),
  transform: (document) => {
    const wordCount = countWords(document.content);

    return {
      ...document,
      slug: document._meta.path,
      wordCount,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: document.title,
        datePublished: document.publishedAt,
        dateModified: document.publishedAt,
        description: document.summary,
        topic: document.topic,
        wordCount,
        image: document.image
          ? `https://haritssr.com${document.image}`
          : `https://haritssr.com/og?title=${document.title}`,
        url: `https://haritssr.com/blog/${document._meta.path}`,
        author: {
          "@type": "Person",
          name: "Harits Syah",
        },
      },
    };
  },
});

export default defineConfig({
  collections: [blogs],
});
