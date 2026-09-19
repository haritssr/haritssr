import { getSearchIndex } from "@/utils/searchIndex";

export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex());
}
