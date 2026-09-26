import { allBlogPosts } from "@/utils/blog-posts";
import { renderBlogRssFeed } from "@/utils/rss";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderBlogRssFeed(allBlogPosts), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
