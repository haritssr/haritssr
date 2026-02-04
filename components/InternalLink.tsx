import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function InternalLink({
  children,
  href,
  lg,
}: {
  children: string;
  href: string;
  lg?: boolean;
}) {
  return (
    <Link
      className={`group inline-flex w-fit cursor-pointer items-center justify-start py-0.5 text-action hover:text-blue-400 ${lg ? "text-lg" : "text-normal"}`}
      href={href}
    >
      <p className="flex items-center hover:underline">
        {children}
        <ChevronRightIcon
          className={`${lg ? "h-[18px] w-[18px]" : "h-4 w-4"} -mb-[1.5px] text-action group-hover:text-blue-400`}
          strokeWidth={2.25}
        />
      </p>
    </Link>
  );
}
