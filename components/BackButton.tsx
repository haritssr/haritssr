import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({
  name,
  href,
  variant = "text",
}: {
  name: string;
  href: string;
  variant?: "text" | "topbar";
}) {
  if (variant === "topbar") {
    return (
      <Link
        aria-label={`Back to ${name}`}
        className="floating-surface hover:bg-surface/95 text-foreground/90 focus-visible:outline-action flex size-9 shrink-0 items-center justify-center rounded-full border backdrop-blur-lg focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] sm:w-fit sm:gap-0.5 sm:pr-3.5 sm:pl-2"
        data-page-back-href={href}
        data-page-back-label={name}
        href={href}
        prefetch={false}
        title={`Back to ${name}`}
      >
        <ChevronLeftIcon
          aria-hidden="true"
          className="size-4.5 shrink-0 -translate-x-px sm:translate-x-0"
          strokeWidth={2}
        />
        <span className="hidden whitespace-nowrap sm:inline">{name}</span>
      </Link>
    );
  }

  return (
    <Link
      className="block w-fit max-w-full"
      data-page-back-href={href}
      data-page-back-label={name}
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
