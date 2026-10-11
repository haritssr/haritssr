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
      .map(({ id }) =>
        document.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      )
      .filter((heading): heading is HTMLElement => heading !== null);

    const updateActiveHeading = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      if (isAtBottom) {
        setActiveHeading(headingElements.at(-1)?.id ?? null);
        return;
      }

      const readingLine = 120;
      const current = headingElements.findLast(
        (heading) => heading.getBoundingClientRect().top <= readingLine
      );
      setActiveHeading(current?.id ?? headingElements[0]?.id ?? null);
    };

    let frame: number | null = null;
    const scheduleUpdate = () => {
      if (frame !== null) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = null;
        updateActiveHeading();
      });
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    updateActiveHeading();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  return (
    <ul className="scrollbar-subtle max-h-[calc(100dvh-10rem)] space-y-2 overflow-y-auto sm:p-5">
      {items.map((item) => {
        const isActive = activeHeading === item.id;

        return (
          <li key={item.id}>
            <Link
              aria-current={isActive ? "location" : undefined}
              className={`block border-l-2 py-0.5 pl-3 text-sm transition-colors ${isActive ? "border-foreground/80 text-foreground/85 font-medium" : "text-muted hover:text-foreground/80 border-transparent"}`}
              href={`#${item.id}`}
              onClick={() => {
                setActiveHeading(item.id);
              }}
            >
              {capitalizeFirstLetter(item.title)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
