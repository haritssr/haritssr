import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { AriaAttributes, MouseEventHandler, ReactNode } from "react";

export default function InternalLink({
  className,
  children,
  href,
  lg,
  onClick,
  "aria-current": ariaCurrent,
  variant = "navigation",
}: {
  className?: string;
  children: ReactNode;
  href: string;
  lg?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-current"?: AriaAttributes["aria-current"];
  variant?: "navigation" | "inline";
}) {
  const appearance =
    variant === "inline"
      ? "text-[length:inherit] leading-[inherit]"
      : `w-fit py-0.5 ${lg === true ? "text-lg" : "text-base"}`;

  return (
    <Link
      aria-current={ariaCurrent}
      className={`group text-action hover:text-action-hover inline cursor-pointer hover:underline ${appearance} ${className ?? ""}`}
      href={href}
      onClick={onClick}
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
