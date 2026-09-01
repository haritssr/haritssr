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
            className="mb-6 inline-flex select-none items-center font-semibold text-2xl text-zinc-800 hover:underline"
            href={`/${id}`}
          >
            {topic}
            <ChevronRightIcon
              aria-hidden="true"
              className="ml-1 h-5 w-5 shrink-0 text-zinc-400"
              strokeWidth={3}
            />
          </Link>
        ) : (
          <h2 className="mb-6 select-none font-semibold text-2xl text-zinc-800">
            {topic}
          </h2>
        )}
      </section>
      <div className={`mb-16 ${className}`}>{children}</div>
    </div>
  );
}
