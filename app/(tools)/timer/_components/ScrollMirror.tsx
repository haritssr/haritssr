/* oxlint-disable shadcn/no-inline-styles -- The mirror's width follows the scrolled content's measured width. */
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Wraps horizontally scrolling content with a second scrollbar above it on
 * mobile. Both bars stay in sync, and the bottom bar remains the real scroller.
 */
export default function ScrollMirror({ children }: { children: ReactNode }) {
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const bar = top.current;
    const body = bottom.current;
    if (!bar || !body) {
      return () => {
        /* Nothing mounted to sync. */
      };
    }
    const measure = () => {
      setWidth(body.scrollWidth);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(body);
    if (body.firstElementChild) {
      observer.observe(body.firstElementChild);
    }
    measure();

    const follow = (source: HTMLElement, target: HTMLElement) => () => {
      if (target.scrollLeft !== source.scrollLeft) {
        target.scrollLeft = source.scrollLeft;
      }
    };
    const onTopScroll = follow(bar, body);
    const onBottomScroll = follow(body, bar);
    bar.addEventListener("scroll", onTopScroll, { passive: true });
    body.addEventListener("scroll", onBottomScroll, { passive: true });
    return () => {
      observer.disconnect();
      bar.removeEventListener("scroll", onTopScroll);
      body.removeEventListener("scroll", onBottomScroll);
    };
  }, []);

  return (
    <div className="min-w-0 select-none">
      <div
        ref={top}
        aria-hidden="true"
        className="scrollbar-subtle overflow-x-auto md:hidden"
      >
        <div style={{ width, height: 1 }} />
      </div>
      <div ref={bottom} className="scrollbar-subtle overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
