"use client";

import Link from "next/link";

export default function HomeSectionWrapper({
  topic,
  className,
  children,
  id,
  explanation,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
  explanation: string;
}) {
  return (
    <div id={id}>
      <section className="flex items-center justify-between">
        <Link
          className="select-none font-semibold text-2xl text-zinc-800 hover:underline"
          href={`/${id}`}
        >
          {topic}
        </Link>
      </section>
      <div className="mb-16">
        <div className="mt-3 mb-5 select-none text-lg text-zinc-500">{explanation}</div>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}
