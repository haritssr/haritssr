import "server-only";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const writingsDirectory = path.join(process.cwd(), "data/writing");
const mdxFileExtensionPattern = /\.mdx$/;
const wordSeparatorPattern = /\s+/;

const publicationDateSchema = z
  .union([z.iso.date(), z.date()])
  .transform((date) =>
    date instanceof Date ? date.toISOString().slice(0, 10) : date
  );

const writingFrontmatterSchema = z.strictObject({
  publishedAt: publicationDateSchema,
  summary: z.string(),
  title: z.string(),
  topic: z.string(),
});

export interface Writing {
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

export function parseWriting(fileName: string, source: string): Writing {
  const { content, data } = matter(source);

  try {
    const frontmatter = writingFrontmatterSchema.parse(data);

    return {
      ...frontmatter,
      slug: fileName.replace(mdxFileExtensionPattern, ""),
      wordCount: countWords(content),
    };
  } catch (error) {
    throw new Error(`Invalid writing frontmatter in ${fileName}`, {
      cause: error,
    });
  }
}

function loadWritings(): readonly Writing[] {
  return Object.freeze(
    fs
      .readdirSync(writingsDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) =>
        parseWriting(
          entry.name,
          fs.readFileSync(path.join(writingsDirectory, entry.name), "utf-8")
        )
      )
      .toSorted(
        (left, right) =>
          right.publishedAt.localeCompare(left.publishedAt) ||
          left.slug.localeCompare(right.slug)
      )
  );
}

export const allWritings = loadWritings();

const writingsBySlug = new Map(
  allWritings.map((writing) => [writing.slug, writing])
);

export function getWriting(slug: string): Writing | undefined {
  return writingsBySlug.get(slug);
}
