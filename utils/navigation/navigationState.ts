import { topLevelNavigation } from "@/data/topLevelNavigation";

const topLevelPaths = new Set<string>(
  topLevelNavigation.map(({ route }) => route)
);

export function navigationCurrent(
  pathname: string,
  href: string
): "page" | "location" | undefined {
  if (pathname === href) {
    return "page";
  }
  return href !== "/" && pathname.startsWith(`${href}/`)
    ? "location"
    : undefined;
}

export function showsMobileNavigation(pathname: string): boolean {
  const segments = pathname.split("/").filter(Boolean);
  const sectionPath = `/${segments[0] ?? ""}`;
  return (
    segments.length <= 2 &&
    !(segments[0] === "writing" && segments.length > 1) &&
    topLevelPaths.has(sectionPath)
  );
}
