import path from "node:path";

import generateTOC from "utils/generateTOC";

import TableOfContentsClient from "./TableOfContentsClient";

export default function TableOfContents({ slug }: { slug: string }) {
  const articleTOC = generateTOC(
    path.join(process.cwd(), "data/blog", `${slug}.mdx`)
  );

  return (
    <nav aria-label="On this page" className="hidden sm:col-span-1 sm:block">
      <div className="sticky top-11.25">
        <div className="text-foreground/80 bg-white px-5 pt-10">
          In this page
        </div>
        <TableOfContentsClient items={articleTOC} />
      </div>
    </nav>
  );
}
