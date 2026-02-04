"use client";

import { allBlogs } from "@content-collections";
import InternalLink from "./InternalLink";

export default function BlogGrid() {
  return (
    <div className="grid gap-3 sm:gap-x-5 sm:gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {allBlogs.map((post) => (
        <InternalLink href={`/blog/${post.slug}`} key={post.slug}>
          {post.title}
        </InternalLink>
      ))}
    </div>
  );
}
