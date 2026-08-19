import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

// Matches one or more whitespace characters used to separate words.
// Example: "one  two" splits into ["one", "two"].
const wordSeparatorPattern = /\s+/;

// Word count utility
function countWords(content: string): number {
  const words = content
    .split(wordSeparatorPattern)
    .filter((word) => word.length > 0);
  return words.length;
}

const writings = defineCollection({
  directory: "data/writing",
  include: "**/*.mdx",
  name: "writings",
  schema: z.object({
    content: z.string(),
    image: z.string().optional(),
    publishedAt: z.string(),
    summary: z.string(),
    title: z.string(),
    topic: z.string(),
  }),
  transform: (document) => {
    const wordCount = countWords(document.content);

    return {
      ...document,
      slug: document._meta.path,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        author: {
          "@type": "Person",
          name: "Harits Syah",
        },
        dateModified: document.publishedAt,
        datePublished: document.publishedAt,
        description: document.summary,
        headline: document.title,
        image: document.image
          ? `https://haritssr.com${document.image}`
          : `https://haritssr.com/og?title=${document.title}`,
        topic: document.topic,
        url: `https://haritssr.com/writing/${document._meta.path}`,
        wordCount,
      },
      wordCount,
    };
  },
});

export default defineConfig({
  content: [writings],
});
