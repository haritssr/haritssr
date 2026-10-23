import { parseChangelogSelection } from "@/utils/commits/changelogSelection";
import {
  getChangelogSummary,
  getChangelogResult,
} from "@/utils/commits/commitHistory";

export async function GET(request: Request) {
  try {
    const { lastDay } = await getChangelogSummary();
    const selection = parseChangelogSelection(
      new URL(request.url).searchParams,
      lastDay
    );
    return Response.json(await getChangelogResult(selection), {
      headers: {
        "Cache-Control":
          "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch {
    console.error("Commit history could not be loaded.");
    return Response.json(
      { error: "Commit history is temporarily unavailable. Try again later." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
