import { getSearchIndex } from "@/utils/discovery/searchIndex";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex());
}
