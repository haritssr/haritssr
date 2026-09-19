import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InternalLink({
  className,
  children,
  href,
  lg,
}: {
  className?: string;
  children: string;
  href: string;
  lg?: boolean;
}) {
  return (
    <Link
      className={`group text-action hover:text-action-hover inline-flex w-fit cursor-pointer items-center justify-start py-0.5 ${lg === true ? "text-lg" : "text-base"} ${className ?? ""}`}
      href={href}
      prefetch={false}
    >
      <p className="flex items-center">
        {children}
        <ChevronRightIcon
          className={`${lg === true ? "h-4.5 w-4.5" : "h-4 w-4"} text-action group-hover:text-action-hover mb-[-1.5px]`}
          strokeWidth={2.25}
        />
      </p>
    </Link>
  );
}
