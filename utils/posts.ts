import "server-only";
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import type { Root } from "hast";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import { z } from "zod";

const postsDirectory = path.join(process.cwd(), "data/posts");
const markdownFileExtensionPattern = /\.md$/u;
const postIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const postFrontmatterSchema = z.strictObject({
  date: z.iso.date(),
  title: z.string().min(1),
});
const markdownProcessor = remark().use(remarkRehype);

export interface PostSummary {
  date: string;
  id: string;
  title: string;
}

export interface PostData extends PostSummary {
  contentTree: Root;
}

function getPostFileNames() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readPost(fileName: string) {
  const id = fileName.replace(markdownFileExtensionPattern, "");
  const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf-8");
  const parsed = matter(source);
  return {
    content: parsed.content,
    id,
    ...postFrontmatterSchema.parse(parsed.data),
  };
}

export function getSortedPostsData(): PostSummary[] {
  return getPostFileNames()
    .map((fileName) => {
      const { date, id, title } = readPost(fileName);
      return { date, id, title };
    })
    .toSorted((left, right) => right.date.localeCompare(left.date));
}

export function getAllPostIds() {
  return getPostFileNames().map((fileName) => ({
    params: {
      id: fileName.replace(markdownFileExtensionPattern, ""),
    },
  }));
}

export async function getPostData(id: string): Promise<PostData | undefined> {
  if (!postIdPattern.test(id)) {
    return undefined;
  }

  const fileName = `${id}.md`;
  if (!getPostFileNames().includes(fileName)) {
    return undefined;
  }

  const { content, date, title } = readPost(fileName);
  const tree = markdownProcessor.parse(content);
  const contentTree = await markdownProcessor.run(tree);

  return { contentTree, date, id, title };
}
