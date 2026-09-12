import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HomeSectionWrapper({
  topic,
  className,
  children,
  id,
  isTitleLink = true,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
  isTitleLink?: boolean;
}) {
  return (
    <div id={id}>
      <section className="flex items-center justify-between">
        {isTitleLink ? (
          <Link
            className="mb-6 inline-flex items-center text-2xl font-semibold text-zinc-800 select-none hover:text-zinc-500"
            href={`/${id}`}
          >
            {topic}
            <ChevronRightIcon
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-zinc-500"
              strokeWidth={2.5}
            />
          </Link>
        ) : (
          <h2 className="mb-6 text-2xl font-semibold text-zinc-800 select-none">
            {topic}
          </h2>
        )}
      </section>
      <div className={`mb-16 ${className}`}>{children}</div>
    </div>
  );
}
