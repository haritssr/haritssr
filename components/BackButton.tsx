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
            className="text-action sm:group-hover:text-action-hover -ml-2 h-5 w-5 pt-px"
            strokeWidth={2}
          />
          <span className="text-action sm:group-hover:text-action-hover -ml-0.5 block truncate hover:underline">
            {name}
          </span>
        </span>
      </span>
    </Link>
  );
}
