"use client";

import Link from "next/link";

export default function HomeSectionWrapper({
  topic,
  className,
  children,
  id,
  explanation,
  isTitleLink = true,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
  explanation: string;
  isTitleLink?: boolean;
}) {
  return (
    <div id={id}>
      <section className="flex items-center justify-between">
        {isTitleLink ? (
          <Link className="select-none font-semibold text-3xl text-zinc-800 hover:underline" href={`/${id}`}>
            {topic}
          </Link>
        ) : (
          <h2 className="select-none font-semibold text-3xl text-zinc-800">{topic}</h2>
        )}
      </section>
      <div className="mb-16">
        <div className="mt-3 mb-5 select-none text-xl text-zinc-500">{explanation}</div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
