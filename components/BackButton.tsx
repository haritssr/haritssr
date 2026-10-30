import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { ComponentProps } from "react";

export default function BackButton({
  name,
  href,
  compact = false,
  label,
  onNavigate,
  showChevron = true,
}: {
  name: string;
  href: string;
  compact?: boolean;
  label?: string;
  onNavigate?: ComponentProps<typeof Link>["onNavigate"];
  showChevron?: boolean;
}) {
  const padding = showChevron ? "pr-4 pl-3" : "px-4";

  return (
    <Link
      aria-label={label ?? `Back to ${name}`}
      className={`group navigation-material border-border text-foreground shadow-foreground/5 focus-visible:outline-action hover:before:bg-foreground/8 border-hairline relative isolate flex min-h-10.5 w-fit min-w-10.5 shrink-0 items-center justify-center gap-0.5 rounded-full py-2 font-medium shadow-sm transition-colors duration-150 [corner-shape:round] before:pointer-events-none before:absolute before:inset-1 before:-z-10 before:rounded-full before:transition-colors before:duration-150 hover:[font-variation-settings:"GRAD"_150] focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.95] motion-reduce:transition-none motion-reduce:before:transition-none ${compact ? "px-0 sm:pr-4 sm:pl-3" : padding}`}
      href={href}
      onNavigate={onNavigate}
      prefetch={false}
      title={label ?? `Back to ${name}`}
    >
      {showChevron && (
        <ChevronLeftIcon
          aria-hidden="true"
          className="size-5 shrink-0 -translate-x-px"
          strokeWidth={2.5}
        />
      )}
      <span
        className={compact ? "hidden whitespace-nowrap sm:inline" : "truncate"}
      >
        {name}
      </span>
    </Link>
  );
}
