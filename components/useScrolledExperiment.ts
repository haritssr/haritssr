"use client";

import { useEffect, useState } from "react";
import type { RefObject } from "react";

interface ScrolledExperiment {
  backLabel: string;
  href: string;
  pathname: string;
  title: string;
}

export default function useScrolledExperiment(
  pathname: string,
  navigationRef: RefObject<HTMLElement | null>
) {
  const [experiment, setExperiment] = useState<ScrolledExperiment | null>(null);

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
        ...main.querySelectorAll<HTMLElement>("[data-experiment-path]"),
      ].find((element) => element.dataset.experimentPath === pathname);
      if (!heading) {
        intersectionObserver?.disconnect();
        observedHeading = undefined;
        setExperiment(null);
        return;
      }

      const { experimentBackLabel, experimentParent, experimentTitle } =
        heading.dataset;
      if (
        experimentBackLabel === undefined ||
        experimentParent === undefined ||
        experimentTitle === undefined
      ) {
        return;
      }

      const offset = navigation.getBoundingClientRect().bottom;
      if (
        heading === observedHeading &&
        offset === observedOffset &&
        experimentTitle === observedTitle
      ) {
        return;
      }
      observedHeading = heading;
      observedOffset = offset;
      observedTitle = experimentTitle;
      intersectionObserver?.disconnect();
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          const scrolled =
            entry !== undefined &&
            entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0);
          setExperiment(
            scrolled
              ? {
                  backLabel: experimentBackLabel,
                  href: experimentParent,
                  pathname,
                  title: experimentTitle,
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
    if (
      segments[0] === "experiments" &&
      segments.length === 3 &&
      navigation &&
      main
    ) {
      mutationObserver.observe(main, {
        attributeFilter: ["data-experiment-path", "data-experiment-title"],
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

  return experiment?.pathname === pathname ? experiment : null;
}
