/* oxlint-disable shadcn/no-inline-styles -- The mirror's width follows the scrolled content's measured width. */
"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Wraps horizontally scrolling content with a second scrollbar above it on
 * mobile. Both bars stay in sync, and the bottom bar remains the real scroller.
 */
export default function ScrollMirror({
  children,
  header,
}: {
  children: ReactNode;
  /** Sticky row kept under the toolbar; its horizontal scroll follows the body. */
  header?: ReactNode;
}) {
  const top = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const headerClip = useRef<HTMLDivElement>(null);
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

    const clip = headerClip.current;
    const followBar = () => {
      if (bar.scrollLeft !== body.scrollLeft) {
        bar.scrollLeft = body.scrollLeft;
      }
    };
    const followBody = () => {
      if (body.scrollLeft !== bar.scrollLeft) {
        body.scrollLeft = bar.scrollLeft;
      }
    };
    const onBodyScroll = () => {
      followBar();
      if (clip && clip.scrollLeft !== body.scrollLeft) {
        clip.scrollLeft = body.scrollLeft;
      }
    };
    bar.addEventListener("scroll", followBody, { passive: true });
    body.addEventListener("scroll", onBodyScroll, { passive: true });
    return () => {
      observer.disconnect();
      bar.removeEventListener("scroll", followBody);
      body.removeEventListener("scroll", onBodyScroll);
    };
  }, []);

  return (
    <div className="min-w-0 select-none">
      {header === undefined ? null : (
        <div
          ref={headerClip}
          className="bg-background sticky top-[calc(var(--topbar-height,4rem)+var(--timer-toolbar-height,0px))] z-10 overflow-hidden"
        >
          {header}
        </div>
      )}
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
