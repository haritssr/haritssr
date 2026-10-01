import fs from "node:fs";

import GithubSlugger from "github-slugger";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";

export interface TableOfContentsItem {
  id: string;
  title: string;
}

interface MarkdownNode {
  alt?: unknown;
  children?: MarkdownNode[];
  type?: unknown;
  value?: unknown;
}

const markdownProcessor = remark().use(remarkFrontmatter);

function getNodeText(node: MarkdownNode): string {
  if (typeof node.value === "string") {
    return node.value;
  }

  if (node.type === "image" && typeof node.alt === "string") {
    return node.alt;
  }

  return node.children?.map(getNodeText).join("") ?? "";
}

function parseTableOfContents(mdxContent: string): TableOfContentsItem[] {
  const tree = markdownProcessor.parse(mdxContent) as MarkdownNode;
  const slugger = new GithubSlugger();
  const items: TableOfContentsItem[] = [];

  for (const node of tree.children ?? []) {
    if (node.type !== "heading") {
      continue;
    }

    const title = getNodeText(node).trim();
    if (title.length > 0) {
      items.push({ id: slugger.slug(title), title });
    }
  }

  return items;
}

export default function generateTOC(
  mdxFilePath: string
): TableOfContentsItem[] {
  let mdxContent: string;

  try {
    mdxContent = fs.readFileSync(mdxFilePath, "utf-8");
  } catch (error) {
    console.error(
      `Error reading MDX file: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }

  return parseTableOfContents(mdxContent);
}
