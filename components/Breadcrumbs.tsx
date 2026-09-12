"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Matches one or more whitespace characters.
// Example: "hello  world" splits into ["hello", "world"].
const whitespaceSequencePattern = /\s+/;

// Matches consecutive hyphens or underscores used as segment separators.
// Example: "hello-world" becomes "hello world".
const segmentSeparatorPattern = /[-_]+/g;

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="mt-52">
      <div className="xl-px-0 mx-auto flex w-full max-w-5xl justify-start px-5 xl:px-0">
        <div className="scrollbar-hide corner-squircle flex w-fit items-center gap-1 overflow-x-auto overscroll-x-contain rounded-lg py-1 text-[15px]">
          <Link className="text-zinc-500 hover:text-zinc-800" href="/">
            home
          </Link>

          {segments.length > 0 && <Separator />}

          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const label = formatSegmentLabel(segment);
            const isLast = index === segments.length - 1;

            return (
              <span className="flex items-center" key={href}>
                {isLast ? (
                  <span className="whitespace-nowrap text-zinc-800 select-none">
                    {label.toLocaleLowerCase()}
                  </span>
                ) : (
                  <>
                    <Link
                      className="whitespace-nowrap text-zinc-500 hover:text-zinc-700"
                      href={href}
                    >
                      {label.toLocaleLowerCase()}
                    </Link>
                    <Separator />
                  </>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function Separator() {
  return <span className="ml-1 text-zinc-300">/</span>;
}

function formatSegmentLabel(segment: string) {
  return decodeURIComponent(segment)
    .replace(segmentSeparatorPattern, " ")
    .split(whitespaceSequencePattern)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
