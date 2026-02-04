import type { Metadata } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post: Post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "force-cache" }
  ).then((post) => post.json());

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const post: Post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "force-cache" }
  ).then((post) => post.json());

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-5 xl:px-0">
      <div className="mt-10">
        <div className="text-action">Article {post.id}</div>
        <h1 className="font-bold text-3xl text-zinc-800">{post.title}</h1>
        <div className="mt-5 text-zinc-600">{post.body}</div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts/?_limit=20"
  ).then((post) => post.json());

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}
