import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import type { ReactNode } from "react";

interface IndexCardProps {
  title: string;
  description: string;
  count?: number;
  countLabel?: string;
  icon: ReactNode;
  href?: string;
  headingLevel?: 2 | 3 | 4;
  className?: string;
}

export default function IndexCard({
  title,
  description,
  count,
  countLabel,
  icon,
  href,
  headingLevel = 2,
  className,
}: IndexCardProps) {
  const Heading = `h${headingLevel}` as const;
  const content = (
    <>
      <div className="flex items-center justify-between sm:gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {icon}
          <Heading
            className={`${href === undefined ? "text-muted" : "text-foreground"} font-medium sm:text-lg`}
          >
            {title}
          </Heading>
        </div>
        <div className="flex shrink-0 items-center space-x-1">
          {count === undefined ? null : (
            <span className="text-muted text-sm font-light tabular-nums">
              {count}
              <span className="sr-only"> {countLabel}</span>
            </span>
          )}
          {href === undefined ? null : (
            <ChevronRightIcon
              aria-hidden="true"
              className="text-muted size-4.5 shrink-0 stroke-2"
            />
          )}
        </div>
      </div>
      <p className="text-foreground/70 hidden sm:block">{description}</p>
    </>
  );
  const cardClassName = `corner-squircle border-border block h-full rounded-2xl border px-3 py-2.5 sm:space-y-1 ${className ?? ""}`;

  if (href === undefined) {
    return <div className={cardClassName}>{content}</div>;
  }

  return (
    <Link
      className={`${cardClassName} hover:bg-surface-hover hover:border-border-hover focus-visible:outline-action transition focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-97`}
      href={href}
      prefetch={false}
    >
      {content}
    </Link>
  );
}
