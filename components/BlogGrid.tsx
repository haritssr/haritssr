"use client";

import { allBlogs } from ".contentlayer/generated";
import Link from "next/link";

export default function BlogGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {allBlogs.map((post) => (
        <Link
          className="corner-squircle group flex items-start justify-between rounded-xl border border-zinc-300 px-3 py-2 hover:bg-zinc-50"
          href={`/blog/${post.slug}`}
          key={post.slug}
        >
          <div className="w-full text-zinc-500 lg:flex lg:justify-between">
            <div>
              <p className="text-zinc-800">{post.title}</p>
            </div>
            <div>
              <p className="inline font-light text-[14px]">
                {post.publishedAt}
              </p>
              .&nbsp;
              <p className="inline font-light text-[14px]">
                {post.structuredData.wordCount} Words
              </p>
              , &nbsp;
              <p className="inline font-light text-[14px]">
                {Math.ceil(post.structuredData.wordCount / 200)} min read.
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
