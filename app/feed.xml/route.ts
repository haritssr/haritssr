import { allWritings } from "@content-collections";

import { renderWritingRssFeed } from "@/utils/rss";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderWritingRssFeed(allWritings), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
