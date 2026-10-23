export const SITE_URL = "https://haritssr.com";
export const SITE_THEME_COLOR = "#FAFCF2";
export const RSS_PATH = "/feed.xml";
export const WRITING_PATH = "/writing";
export const WRITING_DESCRIPTION = "Selected notes and ideas.";

export const SOURCE_CODE_URL = "https://github.com/haritssr/haritssr";
export function sourceUrl(
  path: string,
  type: "tree" | "blob" = "tree"
): string {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${SOURCE_CODE_URL}/${type}/main/${encodedPath}`;
}
