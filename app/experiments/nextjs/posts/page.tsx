import type { Metadata } from "next";
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import { getExperimentMetadata } from "@/data/ExperimentsData";
import { getSortedPostsData } from "@/utils/posts.js";

export const metadata: Metadata = getExperimentMetadata("nextjs", "posts");

interface Post {
  id: string;
  date: string;
  title: string;
}

export default function PostsPage() {
  const allPostsData = getSortedPostsData() as Post[];

  return (
    <>
      <PageTitle title="Posts" />
      <SubTitle>Posts by Nextjs tutorial</SubTitle>
      <div className="mb-14">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/nextjs/posts"
          name="Source code"
        />
      </div>
      <ul className="space-y-5">
        {allPostsData.map(({ id, date, title }: Post) => (
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
