import path from "node:path";
import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";
import generateTOC from "utils/generateTOC";

const REGEX = /\s+/;

export default function TableOfContents({ slug }: { slug: string }) {
  const articleTOC = generateTOC(
    path.join(process.cwd(), "content", `${slug}.mdx`)
  );

  return (
    <section className="hidden sm:col-span-1 sm:block">
      <div className="sticky top-11.25">
        <div className="bg-white px-5 pt-10 text-zinc-700">In this page</div>

        <div className="space-y-2 overflow-y-auto sm:p-5">
          {articleTOC.map((heading) => {
            const headingSlug = heading
              .replace(/[^a-zA-Z0-9\s-]/g, "") // strip everything except letters, numbers, spaces, and hyphens
              .trim()
              .split(REGEX) // collapse consecutive spaces before joining
              .join("-");

            return (
              <Link
                className="block text-sm text-zinc-500 hover:text-zinc-700"
                href={`#${headingSlug}`}
                key={heading}
              >
                {capitalizeFirstLetter(heading)}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
