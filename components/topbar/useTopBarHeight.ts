"use client";

import { useLayoutEffect, useState } from "react";
import type { RefObject } from "react";

export default function useTopBarHeight(ref: RefObject<HTMLElement | null>) {
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const bar = ref.current;
    const root = document.documentElement;
    const previous = root.style.getPropertyValue("--topbar-height");
    function measure() {
      if (!bar) {
        return;
      }
      const next = Math.ceil(bar.getBoundingClientRect().bottom);
      root.style.setProperty("--topbar-height", `${next}px`);
      setHeight(next);
    }
    const observer = new ResizeObserver(measure);
    if (bar) {
      observer.observe(bar);
    }
    measure();
    return () => {
      observer.disconnect();
      if (previous) {
        root.style.setProperty("--topbar-height", previous);
      } else {
        root.style.removeProperty("--topbar-height");
      }
    };
  }, [ref]);
  return height;
}
