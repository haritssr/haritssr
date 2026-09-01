"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import capitalizeFirstLetter from "utils/capitalizeFirstLetter";

interface TableOfContentsItem {
  id: string;
  title: string;
}

export default function TableOfContentsClient({
  items,
}: {
  items: TableOfContentsItem[];
}) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    const headingElements = items
      .map(({ id }) => document.querySelector(`#${id}`))
      .filter((heading): heading is HTMLElement => heading !== null);

    const updateActiveHeading = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      if (isAtBottom) {
        setActiveHeading(headingElements.at(-1)?.id ?? null);
        return;
      }

      const visibleHeading = headingElements.find((heading) => {
        const { bottom, top } = heading.getBoundingClientRect();
        return top < window.innerHeight && bottom > 0;
      });

      setActiveHeading(visibleHeading?.id ?? null);
    };

    const observer = new IntersectionObserver(updateActiveHeading);

    for (const heading of headingElements) {
      observer.observe(heading);
    }

    updateActiveHeading();

    return () => {
      observer.disconnect();
    };
  }, [items]);

  return (
    <div className="space-y-2 overflow-y-auto sm:p-5">
      {items.map((item) => {
        const isActive = activeHeading === item.id;

        return (
          <Link
            aria-current={isActive ? "location" : undefined}
            className={`block border-l-2 py-0.5 pl-3 text-sm transition-colors ${isActive ? "border-zinc-700 font-medium text-zinc-800" : "border-transparent text-zinc-500 hover:text-zinc-700"}`}
            href={`#${item.id}`}
            key={item.id}
            onClick={() => {
              setActiveHeading(item.id);
            }}
          >
            {capitalizeFirstLetter(item.title)}
          </Link>
        );
      })}
    </div>
  );
}
