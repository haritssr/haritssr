"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WHITESPACE_SPLIT_REGEX = /\s+/;

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="mt-52">
      <div className="xl-px-0 mx-auto flex w-full max-w-5xl justify-start px-5 xl:px-0">
        <div className="scrollbar-hide corner-squircle flex w-fit items-center gap-1 overflow-x-auto overscroll-x-contain rounded-lg py-1 text-[15px]">
          <Link className="text-zinc-400 hover:text-zinc-800" href="/">
            Home
          </Link>

          {segments.length > 0 && <Separator />}

          {segments.map((segment, index) => {
            const href = `/${segments.slice(0, index + 1).join("/")}`;
            const label = formatSegmentLabel(segment);
            const isLast = index === segments.length - 1;

            return (
              <span
                className="flex items-center"
                // biome-ignore lint/suspicious/noArrayIndexKey: segments can have duplicates like /a/b/a
                key={`${segment}-${index}`}
              >
                {isLast ? (
                  <span className="select-none whitespace-nowrap text-zinc-800">{label}</span>
                ) : (
                  <>
                    <Link className="whitespace-nowrap text-zinc-500 hover:text-zinc-700 hover:underline" href={href}>
                      {label}
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
    .replace(/[-_]+/g, " ")
    .split(WHITESPACE_SPLIT_REGEX)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
