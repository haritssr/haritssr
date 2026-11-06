import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { RefObject } from "react";

import {
  FOLLOW_LEAD_MINUTES,
  HOUR_REM,
  PAGE_COUNT,
  PAGE_MINUTES,
  pageAt,
  pagePeriod,
  periodRange,
} from "../utils/timelineWindow";
import { allDayPeriod, scheduledPeriod, timerDayBounds } from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import useTimelineMode from "./useTimelineMode";

interface TimelinePagerStep {
  label: string;
  select: () => void;
}

export interface TimelinePagerState {
  previous: TimelinePagerStep | null;
  /** Returns to the current time, or null when not applicable. */
  now: TimelinePagerStep | null;
  next: TimelinePagerStep | null;
}

/** The scrolling frame of the follow-now timeline. */
export interface TimelineScroll {
  /** Attach to the scrolling element; it scrolls itself to the opening position. */
  attach: (element: HTMLDivElement | null) => () => void;
  /** Available screen height, in pixels. */
  height: number;
}

/** Top margin of the full-day timeline inside the scroll frame, in rem. */
const TOP_MARGIN_REM = 0.75;

function rootFontSize() {
  return Number(
    getComputedStyle(document.documentElement).fontSize.replace("px", "")
  );
}

/**
 * Height that lets the whole page, footer included, fit the screen: the screen
 * height minus the frame's page position and everything laid out below it.
 */
function useAvailableHeight(
  ref: RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const [height, setHeight] = useState(640);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!enabled || element === null) {
      return () => {
        /* Nothing is measured outside follow-now mode. */
      };
    }
    const measure = () => {
      const frameElement = element.querySelector<HTMLElement>(
        "[data-timeline-frame]"
      );
      if (frameElement === null) {
        return;
      }
      // With the frame uncapped the page is always taller than the screen, so
      // the space below it contains no stretch from a short page.
      const previous = frameElement.style.maxHeight;
      // Uncapping clamps the scroll position to the top, so put it back.
      const scrolled = frameElement.scrollTop;
      frameElement.style.maxHeight = "none";
      const rect = frameElement.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const below =
        document.documentElement.scrollHeight - (rect.bottom + window.scrollY);
      frameElement.style.maxHeight = previous;
      frameElement.scrollTop = scrolled;
      setHeight(Math.max(240, Math.floor(window.innerHeight - top - below)));
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [enabled, ref]);
  return height;
}

/** Scroll position that puts the lead before `minute` at the top of the frame. */
function scrollTopFor(minute: number) {
  const lead = Math.max(0, minute - FOLLOW_LEAD_MINUTES);
  return (TOP_MARGIN_REM + (lead / 60) * HOUR_REM) * rootFontSize();
}

/**
 * Chooses the minutes the schedule shows and how it scrolls. The whole day is
 * always rendered; the 6-hour setting shows one page at a time, and the
 * follow-now setting scrolls the full day inside the available screen height,
 * opening just before the current time.
 */
export default function useTimelineWindow(
  tasks: TimerTask[],
  date: string,
  now: number
): {
  view: Period;
  pager: TimelinePagerState | null;
  /** Wrap the timeline; its screen position sizes the follow-now frame. */
  ref: RefObject<HTMLDivElement | null>;
  scroll: TimelineScroll | null;
} {
  const mode = useTimelineMode();
  const ref = useRef<HTMLDivElement>(null);
  const height = useAvailableHeight(ref, mode === "follow");
  const [choice, setChoice] = useState<{ date: string; page: number } | null>(
    null
  );
  // The follow-now frame opens once per date and stays put as time passes.
  const [anchor, setAnchor] = useState({ date, now });
  if (anchor.date !== date) {
    setAnchor({ date, now });
  }
  const frame = useRef<HTMLDivElement | null>(null);
  // The frame's visible band in pixels, to tell whether the now line is on screen.
  const [band, setBand] = useState<{ top: number; height: number } | null>(
    null
  );
  const minute = (now - timerDayBounds(date).start) / 60_000;
  const anchorMinute = (anchor.now - timerDayBounds(date).start) / 60_000;
  const nowPage = pageAt(minute);
  const starts = tasks.flatMap((task) => scheduledPeriod(task)?.from ?? []);
  const firstStart = starts.length === 0 ? null : Math.min(...starts);
  const openMinute =
    anchorMinute >= 0 && anchorMinute < 1440
      ? anchorMinute
      : (firstStart ?? 360);

  // Paged mode: one of four 6-hour pages.
  // Without a current time or tasks, open on the morning-to-noon page.
  const pageFallback =
    nowPage ??
    (firstStart === null ? 1 : Math.floor(firstStart / PAGE_MINUTES));
  const page = choice?.date === date ? choice.page : pageFallback;

  // Stable between renders so gesture effects keep running.
  const view = useMemo(
    () => (mode === "paged" ? pagePeriod(page) : allDayPeriod()),
    [mode, page]
  );
  const openTop = scrollTopFor(openMinute);
  // Scrolls to the opening position whenever the frame mounts, including the
  // swap from the static to the editable timeline.
  const attach = useCallback(
    (element: HTMLDivElement | null) => {
      frame.current = element;
      if (element === null) {
        return () => {
          /* The frame unmounted; its listeners were removed already. */
        };
      }
      element.scrollTop = openTop;
      const update = () => {
        setBand({ top: element.scrollTop, height: element.clientHeight });
      };
      update();
      element.addEventListener("scroll", update, { passive: true });
      const observer = new ResizeObserver(update);
      observer.observe(element);
      return () => {
        element.removeEventListener("scroll", update);
        observer.disconnect();
      };
    },
    [openTop]
  );

  if (mode === "paged") {
    return {
      view,
      ref,
      scroll: null,
      pager: pagedPager(page, nowPage, (target) => {
        setChoice({ date, page: target });
      }),
    };
  }
  if (mode === "follow") {
    const inDay = minute >= 0 && minute < 1440;
    // Only offer Now when the red line is scrolled out of the frame.
    const linePx = (TOP_MARGIN_REM + (minute / 60) * HOUR_REM) * rootFontSize();
    const lineVisible =
      band !== null && linePx >= band.top && linePx <= band.top + band.height;
    return {
      view,
      ref,
      scroll: { attach, height },
      pager: {
        previous: null,
        next: null,
        now:
          inDay && !lineVisible
            ? {
                label: "Now",
                select: () => {
                  setAnchor({ date, now });
                  frame.current?.scrollTo({
                    top: scrollTopFor(minute),
                    behavior: window.matchMedia(
                      "(prefers-reduced-motion: reduce)"
                    ).matches
                      ? "auto"
                      : "smooth",
                  });
                },
              }
            : null,
      },
    };
  }
  return { view, pager: null, ref, scroll: null };
}

/** Steps between the four 6-hour pages and back to the page holding now. */
function pagedPager(
  page: number,
  nowPage: number | null,
  select: (page: number) => void
): TimelinePagerState {
  const step = (target: number): TimelinePagerStep => ({
    label: `Show ${periodRange(pagePeriod(target))}${nowPage === target ? ", current time" : ""}`,
    select: () => {
      select(target);
    },
  });
  return {
    previous: page > 0 ? step(page - 1) : null,
    now:
      nowPage === null || nowPage === page
        ? null
        : {
            label: `Now, ${periodRange(pagePeriod(nowPage))}`,
            select: () => {
              select(nowPage);
            },
          },
    next: page < PAGE_COUNT - 1 ? step(page + 1) : null,
  };
}
