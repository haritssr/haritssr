import path from "node:path";

import generateTOC from "utils/generateTOC";

import TableOfContentsClient from "./TableOfContentsClient";

// Matches one or more whitespace characters.
// Example: "hello  world" splits into ["hello", "world"].
const whitespaceSequencePattern = /\s+/;

// Matches characters that cannot appear in a heading slug.
// Example: "Hello, world!" becomes "Hello world".
const nonSlugCharacterPattern = /[^a-zA-Z0-9\s-]/g;

export default function TableOfContents({ slug }: { slug: string }) {
  const articleTOC = generateTOC(
    path.join(process.cwd(), "data/writing", `${slug}.mdx`)
  ).map((title) => ({
    id: title
      .replace(nonSlugCharacterPattern, "")
      .trim()
      .split(whitespaceSequencePattern)
      .join("-"),
    title,
  }));

  return (
    <section className="hidden sm:col-span-1 sm:block">
      <div className="sticky top-11.25">
        <div className="bg-white px-5 pt-10 text-zinc-700">In this page</div>
        <TableOfContentsClient items={articleTOC} />
      </div>
    </section>
  );
}
