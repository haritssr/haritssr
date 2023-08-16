import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function InternalLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Link
      passHref
      href={href}
      className="group flex w-fit cursor-pointer items-center justify-start py-0.5 text-tiny text-blue-600 hover:text-blue-400 sm:text-base"
    >
      <p className="flex items-center">
        {name}
        <ChevronRightIcon
          className="h-4 w-4 text-blue-600 -mb-[1.5px] group-hover:text-blue-400 pt-[1px]"
          strokeWidth={2.25}
        />
      </p>
    </Link>
  );
}
