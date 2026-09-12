import path from "node:path";

import generateTOC from "utils/generateTOC";

import TableOfContentsClient from "./TableOfContentsClient";

export default function TableOfContents({ slug }: { slug: string }) {
  const articleTOC = generateTOC(
    path.join(process.cwd(), "data/writing", `${slug}.mdx`)
  );

  return (
    <section className="hidden sm:col-span-1 sm:block">
      <div className="sticky top-11.25">
        <div className="bg-white px-5 pt-10 text-zinc-700">In this page</div>
        <TableOfContentsClient items={articleTOC} />
      </div>
    </section>
  );
}
