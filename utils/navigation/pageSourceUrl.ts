import { sourceUrl } from "@/utils/metadata/site";

import { getDynamicRoute } from "./routePatterns";

const trailingSlashPattern = /\/+$/u;
const writingPathPattern = /^\/writing\/(?<slug>[^/]+)$/u;
export default function pageSourceUrl(pathname: string): string {
  const path = pathname.replace(trailingSlashPattern, "");
  const writingSlug = writingPathPattern.exec(path)?.groups?.slug;

  if (writingSlug !== undefined) {
    return sourceUrl(`app/writing/content/${writingSlug}.mdx`, "blob");
  }

  const dynamic = getDynamicRoute(path);
  const child = dynamic ? path.slice(dynamic.parent.length + 1) : "";
  if (dynamic && child.length > 0 && !child.includes("/")) {
    return sourceUrl(`app${dynamic.pattern}`);
  }

  return path.length === 0
    ? sourceUrl("app/page.tsx", "blob")
    : sourceUrl(`app${path}`);
}
