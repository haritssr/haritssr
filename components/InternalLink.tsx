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
  variant?: "navigation" | "database" | "inline" | "footer";
}) {
  const appearance =
    variant === "navigation" || variant === "database"
      ? `w-fit py-0.5 ${lg === true ? "text-lg" : "text-base"}`
      : "text-[length:inherit] leading-[inherit]";
  const interaction =
    variant === "footer"
      ? "text-foreground/70 rounded-sm select-none transition-[color,transform] hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current hover:underline"
      : "text-action hover:text-action-hover hover:underline";

  return (
    <Link
      aria-current={ariaCurrent}
      className={`group inline-block cursor-pointer transition-transform active:scale-[0.98] motion-reduce:transition-none ${interaction} ${appearance} ${className ?? ""}`}
      href={href}
      onClick={onClick}
      prefetch={false}
    >
      <span>
        {children}
        {variant === "navigation" || variant === "database" ? (
          <ChevronRightIcon
            aria-hidden="true"
            className={`${lg === true ? "h-4.5 w-4.5" : "h-4 w-4"} text-action group-hover:text-action-hover inline align-middle`}
            strokeWidth={2.25}
          />
        ) : null}
        {variant === "database" ? (
          <span
            className="border-border bg-foreground/5 text-muted mx-1.5 inline-block rounded border px-1 py-0.5 align-middle text-xs leading-none font-medium"
            title="Uses a database"
          >
            <span aria-hidden="true">DB</span>
            <span className="sr-only">Uses a database</span>
          </span>
        ) : null}
      </span>
    </Link>
  );
}
