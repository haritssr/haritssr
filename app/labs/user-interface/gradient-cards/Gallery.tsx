"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const Inspector = dynamic(async () => await import("./Inspector"), {
  ssr: false,
});

export default function Gallery({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const gallery = root.current;
    if (!gallery) {
      return () => {
        /* No gallery was mounted. */
      };
    }
    const inspect = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }
      const button = event.target.closest<HTMLButtonElement>(
        "button[data-inspect-card]"
      );
      if (!button || !gallery.contains(button)) {
        return;
      }
      trigger.current = button;
      setSelected(button.dataset.inspectCard ?? null);
      setOpen(true);
    };
    gallery.addEventListener("click", inspect);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          entry.target.dataset.visible = String(entry.isIntersecting);
        }
      }
    });
    for (const card of gallery.querySelectorAll("[data-motion]")) {
      observer.observe(card);
    }
    return () => {
      gallery.removeEventListener("click", inspect);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="gradient-gallery" ref={root}>
        {children}
      </div>
      {selected === null ? null : (
        <Inspector
          id={selected}
          onClosed={() => {
            setSelected(null);
          }}
          onOpenChange={setOpen}
          open={open}
          returnFocus={trigger}
        />
      )}
    </>
  );
}
