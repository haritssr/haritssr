"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Split words on whitespace and replace slug separators with spaces.
const whitespaceSequencePattern = /\s+/;
const segmentSeparatorPattern = /[-_]+/g;
const hiddenRootRoutes = new Set(["api", "commits"]);

export default function Breadcrumbs({
  routeLabels,
}: {
  routeLabels: Readonly<Record<string, string>>;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length === 0 ||
    (segments.length === 1 && hiddenRootRoutes.has(segments[0]))
  ) {
    return null;
  }

  let path = "";
  const breadcrumbs = [];
  for (const segment of segments) {
    path += `/${segment}`;
    breadcrumbs.push({
      href: path,
      label: routeLabels[path] ?? formatSegmentLabel(segment),
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="h-6">
      <div className="mx-auto flex w-full max-w-5xl justify-start px-5 xl:px-0">
        <ol className="scrollbar-hide corner-squircle flex h-6 w-fit items-center gap-1 overflow-x-auto overscroll-x-contain rounded-lg text-[15px] leading-6">
          <li className="flex shrink-0 items-center">
            <Link
              className="text-muted hover:text-foreground whitespace-nowrap"
              href="/"
              prefetch={false}
            >
              Home
            </Link>

            <Separator />
          </li>

          {breadcrumbs.map(({ href, label }, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li className="flex shrink-0 items-center" key={href}>
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-foreground whitespace-nowrap"
                  >
                    {label}
                  </span>
                ) : (
                  <>
                    <Link
                      className="text-muted hover:text-foreground/80 whitespace-nowrap"
                      href={href}
                      prefetch={false}
                    >
                      {label}
                    </Link>
                    <Separator />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function Separator() {
  return (
    <span aria-hidden="true" className="text-border ml-1">
      /
    </span>
  );
}

function formatSegmentLabel(segment: string) {
  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment);
  } catch {
    /* Keep malformed URLs readable on the not-found page. */
  }
  return decoded
    .replace(segmentSeparatorPattern, " ")
    .split(whitespaceSequencePattern)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
