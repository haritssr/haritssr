"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Matches one or more whitespace characters.
// Example: "hello  world" splits into ["hello", "world"].
const whitespaceSequencePattern = /\s+/;

// Matches consecutive hyphens or underscores used as segment separators.
// Example: "hello-world" becomes "hello world".
const segmentSeparatorPattern = /[-_]+/g;
const mainRoutes = new Set(["projects", "experiments", "blog", "design"]);

export default function Breadcrumbs({
  routeLabels,
}: {
  routeLabels: Readonly<Record<string, string>>;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length === 0 ||
    (segments.length === 1 && mainRoutes.has(segments[0]))
  ) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="pt-3">
      <div className="mx-auto flex w-full max-w-5xl justify-start px-5 xl:px-0">
        <ol className="scrollbar-hide corner-squircle flex w-fit items-center gap-1 overflow-x-auto overscroll-x-contain rounded-lg py-1 text-[15px]">
          <li className="flex items-center">
            <Link className="text-muted hover:text-foreground" href="/">
              Home
            </Link>

            {segments.length > 0 && <Separator />}
          </li>

          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const label = routeLabels[href] ?? formatSegmentLabel(segment);
            const isLast = index === segments.length - 1;

            return (
              <li className="flex items-center" key={href}>
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
