import { sourceUrl } from "@/utils/site";

const trailingSlashPattern = /\/+$/u;
const writingPathPattern = /^\/writing\/(?<slug>[^/]+)$/u;
const projectPathPattern = /^\/projects\/[^/]+$/u;
const nextjsDetailPathPattern =
  /^(?<path>\/labs\/nextjs\/(?:articles|posts|students))\/[^/]+$/u;

export default function pageSourceUrl(pathname: string): string {
  const path = pathname.replace(trailingSlashPattern, "");
  const writingSlug = writingPathPattern.exec(path)?.groups?.slug;

  if (writingSlug !== undefined) {
    return sourceUrl(`app/writing/content/${writingSlug}.mdx`, "blob");
  }

  if (projectPathPattern.test(path)) {
    return sourceUrl("app/projects/[project]");
  }

  const nextjsDetailPath = nextjsDetailPathPattern.exec(path)?.groups?.path;

  if (nextjsDetailPath !== undefined) {
    return sourceUrl(`app${nextjsDetailPath}/[id]`);
  }

  return path.length === 0
    ? sourceUrl("app/page.tsx", "blob")
    : sourceUrl(`app${path}`);
}
