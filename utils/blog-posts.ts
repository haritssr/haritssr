import "server-only";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const blogPostsDirectory = path.join(process.cwd(), "data/blog");
const mdxFileExtensionPattern = /\.mdx$/;
const wordSeparatorPattern = /\s+/;

const publicationDateSchema = z
  .union([z.iso.date(), z.date()])
  .transform((date) =>
    date instanceof Date ? date.toISOString().slice(0, 10) : date
  );

const blogPostSummarySchema = z
  .string()
  .refine((summary) => countWords(summary) === 6, {
    message: "Summary must contain exactly 6 words",
  });

const blogPostFrontmatterSchema = z.strictObject({
  publishedAt: publicationDateSchema,
  summary: blogPostSummarySchema,
  title: z.string(),
  topic: z.string(),
});

export interface BlogPost {
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  topic: string;
  wordCount: number;
}

function countWords(content: string): number {
  return content.split(wordSeparatorPattern).filter((word) => word.length > 0)
    .length;
}

export function parseBlogPost(fileName: string, source: string): BlogPost {
  const { content, data } = matter(source);

  try {
    const frontmatter = blogPostFrontmatterSchema.parse(data);

    return {
      ...frontmatter,
      slug: fileName.replace(mdxFileExtensionPattern, ""),
      wordCount: countWords(content),
    };
  } catch (error) {
    throw new Error(`Invalid blog post frontmatter in ${fileName}`, {
      cause: error,
    });
  }
}

function loadBlogPosts(): readonly BlogPost[] {
  return Object.freeze(
    fs
      .readdirSync(blogPostsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) =>
        parseBlogPost(
          entry.name,
          fs.readFileSync(path.join(blogPostsDirectory, entry.name), "utf-8")
        )
      )
      .toSorted(
        (left, right) =>
          right.publishedAt.localeCompare(left.publishedAt) ||
          left.slug.localeCompare(right.slug)
      )
  );
}

export const allBlogPosts = loadBlogPosts();

const blogPostsBySlug = new Map(allBlogPosts.map((post) => [post.slug, post]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostsBySlug.get(slug);
}
