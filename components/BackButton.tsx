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
        className="border-middle-hover text-foreground/90 focus-visible:outline-action flex size-9.5 shrink-0 items-center justify-center rounded-full border bg-white/50 backdrop-blur-lg hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-2"
        href={href}
        prefetch={false}
        title={`Back to ${name}`}
      >
        <ChevronLeftIcon
          aria-hidden="true"
          className="size-5"
          strokeWidth={2}
        />
      </Link>
    );
  }

  return (
    <Link className="mt-10 -mb-5 block w-fit" href={href} prefetch={false}>
      <span className="inline-block w-full">
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
