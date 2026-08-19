"use client";

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
            className="mb-6 select-none font-semibold text-3xl text-zinc-800 hover:underline"
            href={`/${id}`}
          >
            {topic}
          </Link>
        ) : (
          <h2 className="mb-6 select-none font-semibold text-3xl text-zinc-800">
            {topic}
          </h2>
        )}
      </section>
      <div className={`mb-16 ${className}`}>{children}</div>
    </div>
  );
}
