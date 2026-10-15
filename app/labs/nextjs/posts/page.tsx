import type { Metadata } from "next";
import Link from "next/link";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import { getLabMetadata } from "@/data/LabsData";
import { getSortedPostsData } from "@/utils/posts";

export const metadata: Metadata = getLabMetadata("nextjs", "posts");

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <LabPageHeader title="Posts">
        <PageDescription>Posts by Nextjs tutorial</PageDescription>
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
