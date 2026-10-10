import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InternalLink({
  className,
  children,
  href,
  lg,
  variant = "navigation",
}: {
  className?: string;
  children: string;
  href: string;
  lg?: boolean;
  variant?: "navigation" | "inline";
}) {
  const appearance =
    variant === "inline"
      ? "text-[length:inherit] leading-[inherit]"
      : `w-fit py-0.5 ${lg === true ? "text-lg" : "text-base"}`;

  return (
    <Link
      className={`group text-action hover:text-action-hover inline cursor-pointer hover:underline ${appearance} ${className ?? ""}`}
      href={href}
      prefetch={false}
    >
      <span>
        {children}
        {variant === "navigation" ? (
          <ChevronRightIcon
            aria-hidden="true"
            className={`${lg === true ? "h-4.5 w-4.5" : "h-4 w-4"} text-action group-hover:text-action-hover inline align-middle`}
            strokeWidth={2.25}
          />
        ) : null}
      </span>
    </Link>
  );
}
