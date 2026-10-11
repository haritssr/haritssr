import { readFileSync } from "node:fs";

import type { Root, RootContent } from "hast";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";

export interface TableOfContentsItem {
  id: string;
  title: string;
}

const headingTagPattern = /^h[1-6]$/u;
const markdownProcessor = remark()
  .use(remarkMdx)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, {
    // Preserve MDX nodes so heading text matches the @next/mdx pipeline.
    passThrough: [
      "mdxFlowExpression",
      "mdxJsxFlowElement",
      "mdxJsxTextElement",
      "mdxTextExpression",
      "mdxjsEsm",
    ],
  })
  .use(rehypeSlug);

function getNodeText(node: Root | RootContent): string {
  if (node.type === "text") {
    return node.value;
  }

  return "children" in node ? node.children.map(getNodeText).join("") : "";
}

function collectHeadings(
  node: Root | RootContent,
  items: TableOfContentsItem[]
): void {
  if (node.type === "element" && headingTagPattern.test(node.tagName)) {
    const title = getNodeText(node).trim();
    if (title.length > 0 && typeof node.properties.id === "string") {
      items.push({ id: node.properties.id, title });
    }
  }

  if ("children" in node) {
    for (const child of node.children) {
      collectHeadings(child, items);
    }
  }
}

export default function generateTOC(
  mdxFilePath: string
): TableOfContentsItem[] {
  let mdxContent: string;

  try {
    mdxContent = readFileSync(mdxFilePath, "utf-8");
  } catch (error) {
    console.error(
      `Error reading MDX file: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }

  const tree = markdownProcessor.runSync(markdownProcessor.parse(mdxContent));
  const items: TableOfContentsItem[] = [];
  collectHeadings(tree, items);
  return items;
}
