import fs from "node:fs";

import { Effect } from "effect";
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

const readMdxFile = Effect.fn("readMdxFile")((mdxFilePath: string) =>
  Effect.try({
    try: () => fs.readFileSync(mdxFilePath, "utf-8"),
    catch: (cause) =>
      new Error(
        `Error reading MDX file: ${cause instanceof Error ? cause.message : String(cause)}`
      ),
  })
);

export default function generateTOC(
  mdxFilePath: string
): TableOfContentsItem[] {
  return Effect.runSync(
    readMdxFile(mdxFilePath).pipe(
      Effect.map(parseTableOfContents),
      Effect.catch((error) =>
        Effect.sync(() => {
          console.error(error.message);
          return [];
        })
      )
    )
  );
}
