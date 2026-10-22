import type { Metadata } from "next";
import Link from "next/link";

import LabPageHeader from "@/app/labs/_components/LabPageHeader";
import { getLabMetadata } from "@/app/labs/data";
import PageDescription from "@/components/PageDescription";
import { getSortedPostsData } from "@/utils/posts";

export const metadata: Metadata = getLabMetadata("nextjs", "posts");

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <LabPageHeader title="Posts">
        <PageDescription>
          Browse local Markdown posts and open each post on its own page.
        </PageDescription>
      </LabPageHeader>

      <ul className="space-y-5">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link className="block" href={`/labs/nextjs/posts/${id}`}>
              <div className="font-medium text-zinc-700 hover:text-zinc-800">
                {title}
              </div>
              <div className="text-zinc-500">{date}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
