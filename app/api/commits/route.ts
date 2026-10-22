import { parseChangelogSelection } from "@/utils/changelogSelection";
import { changelogSummary, getChangelogResult } from "@/utils/commitHistory";

export function GET(request: Request) {
  const selection = parseChangelogSelection(
    new URL(request.url).searchParams,
    changelogSummary.lastDay
  );
  return Response.json(getChangelogResult(selection), {
    headers: {
      "Cache-Control":
        "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
