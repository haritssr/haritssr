import path from "node:path";

import SectionHeading from "@/components/SectionHeading";

import generateTOC from "./generateTOC";
import TableOfContentsClient from "./TableOfContentsClient";

export default function TableOfContents({ slug }: { slug: string }) {
  const articleTOC = generateTOC(
    path.join(process.cwd(), "data/blog", `${slug}.mdx`)
  );

  return (
    <nav aria-label="On this page" className="hidden sm:col-span-1 sm:block">
      <div className="sticky top-11.25">
        <div className="px-5 pt-10">
          <SectionHeading variant="compact">On this page</SectionHeading>
        </div>
        <TableOfContentsClient items={articleTOC} />
      </div>
    </nav>
  );
}
