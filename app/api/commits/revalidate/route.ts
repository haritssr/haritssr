import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";

import { COMMIT_HISTORY_TAG } from "@/utils/commits/commitHistory";

function authorized(request: Request) {
  const secret = process.env.COMMITS_REVALIDATE_SECRET;
  if (secret === undefined || secret.length === 0) {
    return false;
  }
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(request.headers.get("authorization") ?? "");
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

/** Expires the cached commit history so the next visit reads the fresh import. */
export function POST(request: Request) {
  if (!authorized(request)) {
    return Response.json(
      { error: "Unauthorized." },
      { status: 401, headers: { "Cache-Control": "no-store" } }
    );
  }
  revalidateTag(COMMIT_HISTORY_TAG, { expire: 0 });
  return Response.json(
    { revalidated: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}
