import type { Metadata } from "next";
import Link from "next/link";

import PageTitle from "@/components/PageTitle";
import SourceCodeLink from "@/components/SourceCodeLink";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { getSortedPostsData } from "@/utils/posts";

export const metadata: Metadata = getExperimentMetadata("nextjs", "posts");

export default function PostsPage() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <PageTitle>Posts</PageTitle>
      <SubTitle>Posts by Nextjs tutorial</SubTitle>
      <div className="mb-14">
        <SourceCodeLink />
      </div>
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
