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
    <Link className="mt-10 -mb-5 block w-fit" href={href} prefetch={false}>
      <span className="inline-block w-full">
        <span className="group flex items-center">
          <ChevronLeftIcon
            className="-ml-2 h-5 w-5 pt-px text-action sm:group-hover:text-action-hover"
            strokeWidth={2}
          />
          <span className="-ml-0.5 block truncate text-action hover:underline sm:group-hover:text-action-hover">
            {name}
          </span>
        </span>
      </span>
    </Link>
  );
}
