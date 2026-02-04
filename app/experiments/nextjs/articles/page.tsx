import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default async function ArticlesPage() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_limit=20",
    { cache: "force-cache" }
  ).then((post) => post.json());

  return (
    <>
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

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            className="rounded-md border border-zinc-300 bg-zinc-50 p-4 duration-200 ease-out hover:cursor-pointer hover:bg-white"
            href={`/experiments/nextjs/articles/${post.id}`}
            key={post.id}
          >
            <div className="text-action">Article {post.id}</div>
            <div className="font-semibold text-gray-800 text-xl">
              {post.title}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
