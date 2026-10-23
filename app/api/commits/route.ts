import { parseChangelogSelection } from "@/utils/commits/changelogSelection";
import {
  changelogSummary,
  getChangelogResult,
} from "@/utils/commits/commitHistory";

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
