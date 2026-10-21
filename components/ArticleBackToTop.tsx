"use client";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { scrollArticleToTop } from "@/components/useArticleContentsNavigation";
import useFooterClearance from "@/components/useFooterClearance";

export default function ArticleBackToTop() {
  const [visible, setVisible] = useState(false);
  const controlsRef = useFooterClearance(visible);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let shown = false;

    function updateVisibility() {
      const currentY = Math.max(0, window.scrollY);
      if (currentY === previousY) {
        return;
      }
      const nextShown = currentY > 0 && currentY < previousY;
      previousY = currentY;
      if (nextShown !== shown) {
        shown = nextShown;
        setVisible(nextShown);
      }
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[max(calc(max(1.25rem,env(safe-area-inset-bottom))+var(--footer-overlap,0px)),var(--timer-dock-clearance,0px))] z-40 mx-auto flex w-full max-w-5xl items-center justify-between gap-3 pr-[max(1.25rem,env(safe-area-inset-right))] pl-[max(1.25rem,env(safe-area-inset-left))] xl:pr-[env(safe-area-inset-right)] xl:pl-[env(safe-area-inset-left)]"
      ref={controlsRef}
    >
      <Button
        aria-label="To the top"
        data-article-back-to-top=""
        className="text-foreground/90! focus-visible:outline-action pointer-events-auto size-10 shrink-0 -translate-x-1 border p-0! text-base! select-none sm:size-9"
        iconOnly
        onClick={scrollArticleToTop}
        variant="ghost"
      >
        <ArrowUpIcon
          aria-hidden="true"
          className="pointer-events-none size-5 stroke-2 sm:size-4.5"
        />
      </Button>
    </div>
  );
}
