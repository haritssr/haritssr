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
      className={`text-foreground/70 focus-visible:outline-action hover:[&>svg]:text-foreground hover:[&>span]:text-foreground flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 sm:shrink-0 ${compact ? "w-fit shrink-0" : "w-fit"}`}
      href={href}
      prefetch={false}
      title={`Back to ${name}`}
    >
      <ChevronLeftIcon
        aria-hidden="true"
        className="size-5 shrink-0 sm:size-4.5"
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
