import Link from "next/link";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";
import generateTOC from "utils/generateTOC";

export default function TableOfContents({ title }: { title: string }) {
  const articleTOC = generateTOC(`../haritssr/content/${title}.mdx`);

  return (
    <section className="hidden sm:col-span-1 sm:block sm:border-r sm:border-b">
      <div className="sticky top-[45px]">
        <div className="border-b bg-white px-5 py-2 text-zinc-500">In this page</div>

        <div className="space-y-2 overflow-y-auto sm:p-5">
          {articleTOC.map((heading) => {
            const slug = heading
              .replace(/[^a-zA-Z0-9\s-]/g, "") // strip everything except letters, numbers, spaces, and hyphens
              .trim()
              .split(/\s+/) // collapse consecutive spaces before joining
              .join("-");

            return (
              <Link className="block text-sm text-zinc-500 hover:text-zinc-700" href={`#${slug}`} key={heading}>
                {capitalizeFirstLetter(heading)}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
