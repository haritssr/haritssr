import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { AriaAttributes, MouseEventHandler, ReactNode } from "react";

export default function InternalLink({
  className,
  children,
  href,
  lg,
  noScale = false,
  onClick,
  "aria-current": ariaCurrent,
  "aria-keyshortcuts": ariaKeyShortcuts,
  variant = "navigation",
}: {
  className?: string;
  children: ReactNode;
  href: string;
  lg?: boolean;
  noScale?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  "aria-current"?: AriaAttributes["aria-current"];
  "aria-keyshortcuts"?: AriaAttributes["aria-keyshortcuts"];
  variant?:
    | "navigation"
    | "inline"
    | "footer"
    | "control"
    | "contents"
    | "floating";
}) {
  let appearance = `${variant === "control" ? "rounded-sm py-1 pl-2 " : ""}text-[length:inherit] leading-[inherit]`;
  if (variant === "navigation") {
    appearance = `w-fit py-0.5 ${lg === true ? "text-lg" : "text-base"}`;
  } else if (variant === "contents") {
    appearance = "inline text-base leading-6";
  }

  let interaction = `text-action hover:text-action-hover ${variant === "control" ? "focus-visible:outline-action focus-visible:outline-2 focus-visible:outline-offset-2" : "hover:underline"}`;
  if (variant === "contents") {
    interaction = "hover:underline";
  } else if (variant === "floating") {
    interaction = "text-foreground hover:text-foreground";
  } else if (variant === "footer") {
    interaction =
      "text-foreground/70 rounded-sm select-none transition-[color,transform] hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current hover:underline";
  }

  return (
    <Link
      aria-current={ariaCurrent}
      aria-keyshortcuts={ariaKeyShortcuts}
      className={`group ${variant === "contents" ? "" : "inline-block"} cursor-pointer transition-transform ${noScale ? "" : "active:scale-[0.95]"} motion-reduce:transition-none ${interaction} ${appearance} ${className ?? ""}`}
      href={href}
      onClick={onClick}
      prefetch={false}
    >
      {children}
      {variant === "navigation" ? (
        <ChevronRightIcon
          aria-hidden="true"
          className={`${lg === true ? "h-4.5 w-4.5" : "h-4 w-4"} text-action group-hover:text-action-hover inline align-middle`}
          strokeWidth={2.25}
        />
      ) : null}
    </Link>
  );
}
