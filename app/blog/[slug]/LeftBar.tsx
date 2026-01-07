"use client";

import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { usePathname } from "next/navigation";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

export default function LeftBar() {
  const pathname = usePathname();
  const segments = pathname?.split("/") as string[];
  const lastSegment = segments.at(-1);
  return (
    <div className="hidden border-r border-b border-l sm:col-span-1 sm:block">
      <Link className="sticky top-[45px] block border-b bg-white px-4 py-2 font-medium" href="/blog">
        Blog
      </Link>

      <div className="flex flex-col space-y-1.5 px-2 py-5 sm:max-h-screen sm:overflow-auto">
        {allBlogs
          .sort((a, b) => {
            if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((article) => {
            return (
              <Link
                className={`${
                  lastSegment === article.slug ? "text-action" : "text-zinc-800 hover:text-action"
                } rounded-md px-2 py-1 text-sm`}
                href={`/blog/${article.slug}`}
                key={article.slug}
              >
                {article.slug
                  .split("-")
                  .map((a) => capitalizeFirstLetter(a))
                  .join(" ")}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
