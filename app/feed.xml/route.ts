import { allWritingPosts } from "@/utils/content/writing-posts";

import { renderWritingRssFeed } from "./rss";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderWritingRssFeed(allWritingPosts), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
