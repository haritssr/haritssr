import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({
  name,
  href,
  compact = false,
  variant = "text",
}: {
  name: string;
  href: string;
  compact?: boolean;
  variant?: "text" | "topbar";
}) {
  if (variant === "topbar") {
    return (
      <Link
        aria-label={`Back to ${name}`}
        className={`floating-surface text-foreground/90 focus-visible:outline-action flex h-10 min-w-10 items-center justify-center gap-0.5 border focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-9 sm:min-w-9 sm:shrink-0 ${compact ? "w-10 shrink-0 sm:w-fit sm:pr-3.5 sm:pl-2" : "pr-3.5 pl-2"}`}
        href={href}
        prefetch={false}
        title={`Back to ${name}`}
      >
        <ChevronLeftIcon
          aria-hidden="true"
          className={`size-5 shrink-0 sm:size-4.5 ${compact ? "-translate-x-px sm:translate-x-0" : ""}`}
          strokeWidth={2}
        />
        <span
          className={
            compact ? "hidden whitespace-nowrap sm:inline" : "truncate"
          }
        >
          {name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      className="block w-fit max-w-full transition-transform active:scale-[0.98] motion-reduce:transition-none"
      href={href}
      prefetch={false}
    >
      <span className="inline-block w-full align-top">
        <span className="group flex items-center">
          <ChevronLeftIcon
            className="text-action sm:group-hover:text-action-hover -ml-2 h-5 w-5 pt-px"
            strokeWidth={2}
          />
          <span className="text-action sm:group-hover:text-action-hover -ml-0.5 block truncate hover:underline">
            {name}
          </span>
        </span>
      </span>
    </Link>
  );
}
