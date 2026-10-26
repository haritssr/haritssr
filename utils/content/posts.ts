import "server-only";
import path from "node:path";

import matter from "gray-matter";
import type { Root } from "hast";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import { z } from "zod";

import { readLocalContent } from "./localContent";

const postsDirectory = path.join(
  process.cwd(),
  "app/labs/nextjs/posts/content"
);
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

function readPost(fileName: string, source: string) {
  const id = fileName.replace(markdownFileExtensionPattern, "");
  const parsed = matter(source);
  return {
    content: parsed.content,
    id,
    ...postFrontmatterSchema.parse(parsed.data),
  };
}

// Keep one local-content snapshot per module, matching the writing post index.
const posts = readLocalContent(postsDirectory, ".md", readPost);
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

export function getPostSummary(id: string): PostSummary | undefined {
  const post = postsById.get(id);
  return post ? { date: post.date, id: post.id, title: post.title } : undefined;
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
