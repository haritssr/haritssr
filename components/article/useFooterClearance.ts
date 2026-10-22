"use client";

import { useEffect, useRef } from "react";

// Keeps fixed reading controls above the site footer without scroll rerenders.
export default function useFooterClearance(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    if (enabled) {
      const controls = ref.current;
      const footer = document.querySelector<HTMLElement>("[data-site-footer]");
      if (controls && footer) {
        cleanup = trackFooterClearance(controls, footer);
      }
    }
    return () => cleanup?.();
  }, [enabled]);

  return ref;
}

function trackFooterClearance(controls: HTMLElement, footer: HTMLElement) {
  let frame = 0;
  let previousOverlap = -1;

  function updatePosition() {
    frame = 0;
    const overlap = Math.max(
      0,
      window.innerHeight - footer.getBoundingClientRect().top
    );
    if (overlap !== previousOverlap) {
      previousOverlap = overlap;
      controls.style.setProperty("--footer-overlap", `${overlap}px`);
    }
  }

  function schedulePosition() {
    if (!frame) {
      frame = requestAnimationFrame(updatePosition);
    }
  }

  // Only listen for scroll while the footer can overlap the controls.
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    window.removeEventListener("scroll", schedulePosition);
    if (entry?.isIntersecting) {
      window.addEventListener("scroll", schedulePosition, { passive: true });
    }
    schedulePosition();
  });
  intersectionObserver.observe(footer);

  // Content expansion and footer wrapping can change its position or size.
  const resizeObserver = new ResizeObserver(schedulePosition);
  resizeObserver.observe(footer);
  resizeObserver.observe(document.body);
  window.addEventListener("resize", schedulePosition, { passive: true });
  schedulePosition();

  return () => {
    intersectionObserver.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("scroll", schedulePosition);
    window.removeEventListener("resize", schedulePosition);
    cancelAnimationFrame(frame);
    controls.style.removeProperty("--footer-overlap");
  };
}
