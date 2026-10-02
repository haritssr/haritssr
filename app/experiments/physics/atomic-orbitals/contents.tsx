"use client";

import { useEffect, useRef, useState } from "react";

interface ContentsItem {
  id: string;
  label: string;
}

export default function Contents({
  items,
}: {
  items: readonly ContentsItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const mobileRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const headings = items
      .map(({ id }) =>
        document.querySelector<HTMLElement>(`#${CSS.escape(id)}`)
      )
      .filter((heading): heading is HTMLElement => heading !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      const current = headings.findLast(
        (heading) => heading.getBoundingClientRect().top <= 160
      );
      setActiveId(
        (atBottom ? headings.at(-1)?.id : current?.id) ?? headings[0]?.id ?? ""
      );
    };
    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items]);

  const links = (closeOnSelect: boolean) => (
    <ol className="space-y-1">
      {items.map((item, index) => (
        <li key={item.id}>
          <a
            aria-current={activeId === item.id ? "location" : undefined}
            className={`focus-visible:outline-action block rounded-r-md border-l-2 px-3 py-2 text-sm focus-visible:outline-2 ${activeId === item.id ? "border-action bg-interface-hover text-foreground font-medium" : "text-foreground/65 hover:text-foreground border-transparent"}`}
            href={`#${item.id}`}
            onClick={() => {
              setActiveId(item.id);
              if (closeOnSelect && mobileRef.current) {
                mobileRef.current.open = false;
              }
            }}
          >
            <span className="text-foreground/45 mr-2 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details
        className="border-border bg-background sticky top-14 z-20 mb-8 rounded-xl border shadow-sm lg:hidden"
        ref={mobileRef}
      >
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
          On this page · {items.find(({ id }) => id === activeId)?.label}
        </summary>
        <nav
          aria-label="On this page"
          className="max-h-[60vh] overflow-y-auto p-2 pt-0"
        >
          {links(true)}
        </nav>
      </details>
      <nav
        aria-label="On this page"
        className="sticky top-20 hidden max-h-[calc(100vh-6rem)] self-start overflow-y-auto lg:block"
      >
        <p className="text-foreground/60 px-3 pb-3 text-xs font-medium tracking-wider uppercase">
          On this page
        </p>
        {links(false)}
      </nav>
    </>
  );
}
