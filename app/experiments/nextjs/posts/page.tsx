import type { Metadata } from "next";
import Link from "next/link";

import ExperimentPageHeader from "@/components/ExperimentPageHeader";
import PageDescription from "@/components/PageDescription";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { getSortedPostsData } from "@/utils/posts";

export const metadata: Metadata = getExperimentMetadata("nextjs", "posts");

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <ExperimentPageHeader title="Posts">
        <PageDescription>Posts by Nextjs tutorial</PageDescription>
      </ExperimentPageHeader>

      <ul className="space-y-5">
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link className="block" href={`/experiments/nextjs/posts/${id}`}>
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
