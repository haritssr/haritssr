"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

interface ScrolledPageHeader {
  backLabel: string;
  href: string;
  pathname: string;
  scrolled: boolean;
  title: string;
}

const PAGE_HEADER_SELECTOR = "[data-page-header][data-page-path]";

function affectsPageHeader(record: MutationRecord) {
  const target =
    record.target instanceof Element
      ? record.target
      : record.target.parentElement;
  if (target !== null && target.closest("[data-page-header]") !== null) {
    return true;
  }
  return (
    record.type === "childList" &&
    [...record.addedNodes, ...record.removedNodes].some(
      (node) =>
        node instanceof Element &&
        (node.matches("[data-page-header]") ||
          node.querySelector("[data-page-header]") !== null)
    )
  );
}

function getPageHeader(main: Element, pathname: string) {
  const pageHeader = [
    ...main.querySelectorAll<HTMLElement>(PAGE_HEADER_SELECTOR),
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

function observePageHeader(
  pathname: string,
  offset: number,
  setHeader: Dispatch<SetStateAction<ScrolledPageHeader | null>>
) {
  const main = document.querySelector("#main-content");
  let observedHeading: HTMLElement | undefined;
  let observedTitle: string | undefined;
  let observedBackLabel: string | undefined;
  let observedHref: string | undefined;
  let intersectionObserver: IntersectionObserver | undefined;
  let disposed = false;

  function clearHeading() {
    intersectionObserver?.disconnect();
    intersectionObserver = undefined;
    observedHeading = undefined;
    observedTitle = undefined;
    observedBackLabel = undefined;
    observedHref = undefined;
    setHeader(null);
  }

  function observeHeading() {
    if (disposed || !main || offset <= 0) {
      return;
    }
    const pageHeader = getPageHeader(main, pathname);
    if (!pageHeader) {
      clearHeading();
      return;
    }
    const { backLabel, heading, href, title } = pageHeader;

    if (
      heading === observedHeading &&
      title === observedTitle &&
      backLabel === observedBackLabel &&
      href === observedHref
    ) {
      return;
    }
    observedHeading = heading;
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
  const mutationObserver = new MutationObserver((records) => {
    if (records.some(affectsPageHeader)) {
      observeHeading();
    }
  });
  if (offset > 0 && main) {
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
    observeHeading();
  }

  return () => {
    disposed = true;
    intersectionObserver?.disconnect();
    mutationObserver.disconnect();
  };
}

export default function useScrolledPageHeader(
  pathname: string,
  topBarHeight: number
) {
  const [header, setHeader] = useState<ScrolledPageHeader | null>(null);

  useEffect(() => {
    const cleanup =
      pathname === "/"
        ? undefined
        : observePageHeader(pathname, topBarHeight, setHeader);
    return () => cleanup?.();
  }, [pathname, topBarHeight]);

  return header?.pathname === pathname ? header : null;
}
