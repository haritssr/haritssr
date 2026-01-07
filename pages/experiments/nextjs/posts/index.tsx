import Link from "next/link";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";
import { getSortedPostsData } from "../../../../utils/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Posts({ allPostsData }) {
  return (
    <LayoutToExperiments domain="Nextjs" title="Posts">
      <SubTitle>Posts by Nextjs tutorial</SubTitle>
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
    </LayoutToExperiments>
  );
}
