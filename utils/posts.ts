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
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);
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

// Keep one local-content snapshot per module, matching the blog post index.
const posts = getPostFileNames().map(readPost);
const postsById = new Map(posts.map((post) => [post.id, post]));
const postSummaries = posts
  .map(({ date, id, title }) => ({ date, id, title }))
  .toSorted(
    (left, right) =>
      right.date.localeCompare(left.date) || left.id.localeCompare(right.id)
  );

export function getSortedPostsData(): PostSummary[] {
  return postSummaries.map((post) => ({ ...post }));
}

export function getAllPostIds() {
  return posts.map(({ id }) => ({
    params: {
      id,
    },
  }));
}

export async function getPostData(id: string): Promise<PostData | undefined> {
  if (!postIdPattern.test(id)) {
    return undefined;
  }

  const post = postsById.get(id);
  if (!post) {
    return undefined;
  }

  const { content, date, title } = post;
  const tree = markdownProcessor.parse(content);
  const contentTree = await markdownProcessor.run(tree);

  return { contentTree, date, id, title };
}
