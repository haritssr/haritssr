import "server-only";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

import { readLocalContent } from "./localContent";

const writingPostsDirectory = path.join(process.cwd(), "app/writing/content");
const mdxFileExtensionPattern = /\.mdx$/;
const wordSeparatorPattern = /\s+/;

const publicationDateSchema = z
  .union([z.iso.date(), z.date()])
  .transform((date) =>
    date instanceof Date ? date.toISOString().slice(0, 10) : date
  );

const writingPostSummarySchema = z
  .string()
  .refine((summary) => countWords(summary) === 6, {
    message: "Summary must contain exactly 6 words",
  });

const writingPostFrontmatterSchema = z.strictObject({
  publishedAt: publicationDateSchema,
  summary: writingPostSummarySchema,
  title: z.string().refine((title) => title.trim().length > 0, {
    message: "Title must not be blank",
  }),
});

export interface WritingPost {
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  wordCount: number;
}

function countWords(content: string): number {
  return content.split(wordSeparatorPattern).filter((word) => word.length > 0)
    .length;
}

export function parseWritingPost(
  fileName: string,
  source: string
): WritingPost {
  try {
    const { content, data } = matter(source);
    const frontmatter = writingPostFrontmatterSchema.parse(data);

    return {
      ...frontmatter,
      slug: fileName.replace(mdxFileExtensionPattern, ""),
      wordCount: countWords(content),
    };
  } catch (error) {
    throw new Error(`Invalid writing post frontmatter in ${fileName}`, {
      cause: error,
    });
  }
}

function loadWritingPosts(): readonly WritingPost[] {
  return Object.freeze(
    readLocalContent(writingPostsDirectory, ".mdx", parseWritingPost).toSorted(
      (left, right) =>
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.slug.localeCompare(right.slug)
    )
  );
}

export const allWritingPosts = loadWritingPosts();

const writingPostsBySlug = new Map(
  allWritingPosts.map((post) => [post.slug, post])
);

export function getWritingPost(slug: string): WritingPost | undefined {
  return writingPostsBySlug.get(slug);
}
