"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface ScrolledArticle {
  backLabel: string;
  href: string;
  pathname: string;
  title: string;
}

export default function useScrolledArticle(
  pathname: string,
  navigationRef: RefObject<HTMLElement | null>
) {
  const [article, setArticle] = useState<ScrolledArticle | null>(null);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const navigation = navigationRef.current;
    const main = document.querySelector("#main-content");
    let observedHeading: HTMLElement | undefined;
    let observedOffset = -1;
    let observedTitle: string | undefined;
    let intersectionObserver: IntersectionObserver | undefined;

    function observeHeading() {
      if (!main || !navigation) {
        return;
      }
      const heading = [
        ...main.querySelectorAll<HTMLElement>("[data-article-path]"),
      ].find((element) => element.dataset.articlePath === pathname);
      if (!heading) {
        intersectionObserver?.disconnect();
        observedHeading = undefined;
        setArticle(null);
        return;
      }

      const { articleBackLabel, articleParent, articleTitle } = heading.dataset;
      if (
        articleBackLabel === undefined ||
        articleParent === undefined ||
        articleTitle === undefined
      ) {
        return;
      }

      const offset = navigation.getBoundingClientRect().bottom;
      if (
        heading === observedHeading &&
        offset === observedOffset &&
        articleTitle === observedTitle
      ) {
        return;
      }
      observedHeading = heading;
      observedOffset = offset;
      observedTitle = articleTitle;
      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          const scrolled =
            entry !== undefined &&
            entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0);
          setArticle(
            scrolled
              ? {
                  backLabel: articleBackLabel,
                  href: articleParent,
                  pathname,
                  title: articleTitle,
                }
              : null
          );
        },
        {
          rootMargin: `-${offset}px 0px 0px 0px`,
          threshold: 0,
        }
      );
      intersectionObserver.observe(heading);
    }

    // Route content may arrive after the persistent top bar has mounted.
    const mutationObserver = new MutationObserver(observeHeading);
    const resizeObserver = new ResizeObserver(observeHeading);
    const isArticleRoute =
      (segments[0] === "experiments" && segments.length === 3) ||
      (segments[0] === "writing" && segments.length === 2);
    if (isArticleRoute && navigation && main) {
      mutationObserver.observe(main, {
        attributeFilter: ["data-article-path", "data-article-title"],
        attributes: true,
        childList: true,
        subtree: true,
      });
      resizeObserver.observe(navigation);
      observeHeading();
    }

    return () => {
      intersectionObserver?.disconnect();
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [pathname, navigationRef]);

  return article?.pathname === pathname ? article : null;
}
