"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface ScrolledPageHeader {
  backLabel: string;
  href: string;
  pathname: string;
  scrolled: boolean;
  title: string;
}

function getPageHeader(main: Element, pathname: string) {
  const pageHeader = [
    ...main.querySelectorAll<HTMLElement>("[data-page-header][data-page-path]"),
  ].find((element) => element.dataset.pagePath === pathname);
  const heading =
    pageHeader?.querySelector<HTMLElement>("[data-page-title]") ?? undefined;
  const backLabel = pageHeader?.dataset.pageBackLabel;
  const href = pageHeader?.dataset.pageBackHref;
  const title = (heading?.dataset.articleTitle ?? heading?.textContent ?? "")
    .replaceAll(/\s+/gu, " ")
    .trim();

  if (backLabel === undefined || href === undefined) {
    return null;
  }

  return { backLabel, heading, href, title };
}

export default function useScrolledPageHeader(
  pathname: string,
  navigationRef: RefObject<HTMLElement | null>
) {
  const [header, setHeader] = useState<ScrolledPageHeader | null>(null);

  useEffect(() => {
    const navigation = navigationRef.current;
    const main = document.querySelector("#main-content");
    let observedHeading: HTMLElement | undefined;
    let observedOffset = -1;
    let observedTitle: string | undefined;
    let observedBackLabel: string | undefined;
    let observedHref: string | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    let disposed = false;

    function clearHeading() {
      intersectionObserver?.disconnect();
      intersectionObserver = undefined;
      observedHeading = undefined;
      observedOffset = -1;
      observedTitle = undefined;
      observedBackLabel = undefined;
      observedHref = undefined;
      setHeader(null);
    }

    function observeHeading() {
      if (disposed || !main || !navigation) {
        return;
      }
      const pageHeader = getPageHeader(main, pathname);
      if (!pageHeader) {
        clearHeading();
        return;
      }
      const { backLabel, heading, href, title } = pageHeader;

      const offset = navigation.getBoundingClientRect().bottom;
      if (
        heading === observedHeading &&
        offset === observedOffset &&
        title === observedTitle &&
        backLabel === observedBackLabel &&
        href === observedHref
      ) {
        return;
      }
      observedHeading = heading;
      observedOffset = offset;
      observedTitle = title;
      observedBackLabel = backLabel;
      observedHref = href;
      intersectionObserver?.disconnect();
      intersectionObserver = undefined;
      setHeader({
        backLabel,
        href,
        pathname,
        scrolled:
          heading !== undefined &&
          title.length > 0 &&
          heading.getBoundingClientRect().bottom <= offset,
        title,
      });
      if (!heading || title.length === 0) {
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (disposed || intersectionObserver !== observer) {
            return;
          }
          const scrolled =
            entry !== undefined &&
            entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0);
          setHeader((current) =>
            current?.pathname === pathname && current.scrolled === scrolled
              ? current
              : { backLabel, href, pathname, scrolled, title }
          );
        },
        {
          rootMargin: `-${offset}px 0px 0px 0px`,
          threshold: 0,
        }
      );
      intersectionObserver = observer;
      observer.observe(heading);
    }

    // Route content may arrive after the persistent top bar has mounted.
    const mutationObserver = new MutationObserver(observeHeading);
    const resizeObserver = new ResizeObserver(observeHeading);
    if (navigation && main) {
      mutationObserver.observe(main, {
        attributeFilter: [
          "data-page-path",
          "data-page-title",
          "data-page-back-href",
          "data-page-back-label",
          "data-article-title",
        ],
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
      resizeObserver.observe(navigation);
      observeHeading();
    }

    return () => {
      disposed = true;
      intersectionObserver?.disconnect();
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [pathname, navigationRef]);

  return header?.pathname === pathname ? header : null;
}
