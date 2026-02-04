import Link from "next/link";
import SubTitle from "@/components/SubTitle";
import { getSortedPostsData } from "@/utils/posts.js";

interface Post {
  id: string;
  date: string;
  title: string;
}

export default function PostsPage() {
  const allPostsData = getSortedPostsData() as Post[];

  return (
    <>
      <SubTitle>Posts by Nextjs tutorial</SubTitle>
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
