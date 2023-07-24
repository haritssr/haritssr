import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <Link passHref href={href} className="mt-5 sm:mt-10 block">
      <span className=" inline-block w-full">
        <span className="group flex items-center">
          <ChevronLeftIcon
            className="-ml-0.5 mt-0.5 h-5 w-5 text-blue-600 sm:group-hover:text-purple-800"
            strokeWidth={2}
          />
          <span className="-ml-0.5 block truncate text-blue-600 sm:group-hover:text-purple-800 ">
            {name}
          </span>
        </span>
      </span>
    </Link>
  );
}
