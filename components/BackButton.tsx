import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({
  name,
  href,
  compact = false,
}: {
  name: string;
  href: string;
  compact?: boolean;
}) {
  return (
    <Link
      aria-label={`Back to ${name}`}
      className={`floating-surface text-foreground/90 focus-visible:outline-action flex h-10 min-w-10 items-center justify-center gap-0.5 border focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-9 sm:min-w-9 sm:shrink-0 hover:[&>span]:opacity-50 hover:[&>svg]:opacity-50 ${compact ? "w-10 shrink-0 sm:w-fit sm:pr-3.5 sm:pl-2" : "w-fit pr-3.5 pl-2"}`}
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
        className={compact ? "hidden whitespace-nowrap sm:inline" : "truncate"}
      >
        {name}
      </span>
    </Link>
  );
}
