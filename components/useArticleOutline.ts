"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

import {
  affectsArticleHeadings,
  collectArticleOutline,
} from "@/utils/articleTableOfContents";
import type { ArticleOutline } from "@/utils/articleTableOfContents";

function outlineSignature(outline: ArticleOutline) {
  return JSON.stringify(
    [outline.entries[0], ...outline.sections].map((entry) => ({
      id: entry.id,
      label: entry.label,
      level: entry.level,
    }))
  );
}

// Recollect visible headings when article content or disclosure visibility changes.
export default function useArticleOutline(
  articleRef: RefObject<HTMLElement | null>,
  title: string,
  onOutlineChange: (outline: ArticleOutline) => void
) {
  const [outline, setOutline] = useState<ArticleOutline | null>(null);

  useEffect(() => {
    const article = articleRef.current;

    let frame = 0;
    let previous: ArticleOutline | null = null;
    let signature = "";
    let initialHash = window.location.hash;
    const generatedIds = new Map<HTMLElement, string>();

    function collect() {
      frame = 0;
      if (!article) {
        return;
      }
      const next = collectArticleOutline(article, title, generatedIds);
      const nextSignature = outlineSignature(next);
      const nextTargets = [next.entries[0], ...next.sections];
      const previousTargets = previous
        ? [previous.entries[0], ...previous.sections]
        : [];
      const sameTargets = nextTargets.every(
        (entry, index) => entry.target === previousTargets[index]?.target
      );

      if (nextSignature !== signature || !sameTargets) {
        signature = nextSignature;
        previous = next;
        setOutline(next);
        onOutlineChange(next);
      }

      if (initialHash) {
        const target = nextTargets.find(
          (entry) => `#${encodeURIComponent(entry.id)}` === initialHash
        )?.target;
        if (target) {
          initialHash = "";
          target.scrollIntoView({ block: "start" });
        }
      }
    }

    function scheduleCollect() {
      if (!frame) {
        frame = requestAnimationFrame(collect);
      }
    }

    const observer = new MutationObserver((records) => {
      if (records.some(affectsArticleHeadings)) {
        scheduleCollect();
      }
    });
    if (article !== null) {
      observer.observe(article, {
        attributeFilter: [
          "class",
          "style",
          "hidden",
          "aria-hidden",
          "open",
          "data-state",
          "data-open",
          "data-closed",
          "data-starting-style",
          "data-ending-style",
        ],
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
      scheduleCollect();
      window.addEventListener("resize", scheduleCollect, { passive: true });
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleCollect);
      for (const [target, id] of generatedIds) {
        if (target.id === id) {
          target.removeAttribute("id");
        }
      }
    };
  }, [articleRef, onOutlineChange, title]);

  return outline;
}

export function useActiveArticleSection(
  outline: ArticleOutline | null,
  enabled: boolean
) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const entries =
      outline === null ? [] : [outline.entries[0], ...outline.sections];
    let frame = 0;

    function updateActive() {
      frame = 0;
      let low = 0;
      let high = entries.length - 1;
      let [current] = entries;
      if (current === undefined) {
        return;
      }
      // Targets follow document order; avoid measuring every heading on scroll.
      while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        const entry = entries[middle];
        if (entry.target.getBoundingClientRect().top <= 101) {
          current = entry;
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }
      setActiveId((previous) =>
        previous === current.id ? previous : current.id
      );
    }

    function scheduleActive() {
      if (!frame) {
        frame = requestAnimationFrame(updateActive);
      }
    }

    const observer = new IntersectionObserver(scheduleActive, {
      rootMargin: "-100px 0px 0px",
    });
    if (enabled) {
      for (const entry of entries) {
        observer.observe(entry.target);
      }
      scheduleActive();
      window.addEventListener("scroll", scheduleActive, { passive: true });
      window.addEventListener("resize", scheduleActive, { passive: true });
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleActive);
      window.removeEventListener("resize", scheduleActive);
    };
  }, [outline, enabled]);

  return activeId;
}
