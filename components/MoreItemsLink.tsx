import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const moreItemsClassName =
  "corner-squircle flex h-fit w-full items-center justify-center rounded-xl border border-border py-2.5 text-center text-foreground/80 hover:bg-border";

export default function MoreItemsLink({
  className,
  count,
  href,
  itemName,
}: {
  className?: string;
  count: number;
  href: string;
  itemName: string;
}) {
  const label = `See ${count} more ${itemName}${count === 1 ? "" : "s"}`;

  return (
    <Link
      className={`group ${moreItemsClassName} ${className ?? ""}`}
      href={href}
      prefetch={false}
    >
      <span className="flex items-center">
        {label}
        <ChevronRightIcon
          aria-hidden="true"
          className="ml-1 h-5 w-5 shrink-0"
          strokeWidth={2}
        />
      </span>
    </Link>
  );
}
