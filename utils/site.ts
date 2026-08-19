export const SITE_URL = "https://www.haritssr.com";

export const SOURCE_CODE_BASE_URL =
  "https://github.com/haritssr/haritssr/tree/main";

export function sourceUrl(path: string): string {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${SOURCE_CODE_BASE_URL}/${encodedPath}`;
}
