import Link from "next/link";
import type { ReactPortal } from "react";
import ExternalLink from "@/components/ExternalLink";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

//This pages includes : the list of the available pages to be visited

export async function getStaticProps() {
  // https://stackoverflow.com/questions/52842039/how-to-limit-the-amount-of-data-returned-from-a-json-file-using-fetch
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_limit=20"
  ).then((post) => post.json());
  return {
    props: {
      posts,
    },
  };
}

export default function Articles({ posts }) {
  return (
    <LayoutToExperiments domain="Nextjs" title="Articles ">
      <SubTitle>
        getStaticProps + Dynamic Pages. This data generated from{" "}
        <ExternalLink
          href="https://jsonplaceholder.typicode.com/posts"
          name="json placeholder"
        />{" "}
        using
        <ExternalLink
          href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props"
          name="getStaticProps"
        />
        and populated to new page for each article using
        <ExternalLink
          href="https://nextjs.org/docs/basic-features/data-fetching/get-static-paths"
          name="getStaticPaths"
        />
      </SubTitle>

      <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 gap-5 sm:grid-cols-3">
        {posts.map(
          (post: {
            id: number;
            title: boolean | ReactPortal;
            body: boolean | ReactPortal;
          }) => (
            <Link
              className="rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white"
              href={`/experiments/nextjs/articles/${post.id}`}
              key={post.id}
            >
              <div className="text-action">Article {post.id}</div>
              <div className="font-semibold text-gray-800 text-xl">
                {post.title}
              </div>
              {/* <p className="text-gray-600 text-ellipsis">{post.body}</p> */}
            </Link>
          )
        )}
      </div>
    </LayoutToExperiments>
  );
}
