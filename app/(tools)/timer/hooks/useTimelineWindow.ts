import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

import { FOLLOW_LEAD_MINUTES, HOUR_REM } from "../utils/timelineWindow";
import { allDayPeriod, scheduledPeriod, timerDayBounds } from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import useTimelineMode from "./useTimelineMode";

interface TimelinePagerStep {
  label: string;
  select: () => void;
}

export interface TimelinePagerState {
  /** Scrolls back to the current time, or null when the line is on screen. */
  now: TimelinePagerStep | null;
}

/** The scrolling frame of the follow-now timeline. */
export interface TimelineScroll {
  /** Attach to the scrolling element; it scrolls itself to the opening position. */
  attach: (element: HTMLDivElement | null) => () => void;
  /** Available screen height, in pixels. */
  height: number;
}

/** Stable between renders so gesture effects keep running. */
const WHOLE_DAY = allDayPeriod();

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
 * Chooses how the schedule scrolls. The whole day is always rendered; the
 * follow-now setting scrolls it inside the available screen height, opening
 * just before the current time.
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
  const starts = tasks.flatMap((task) => scheduledPeriod(task)?.from ?? []);
  const firstStart = starts.length === 0 ? null : Math.min(...starts);
  const openMinute =
    anchorMinute >= 0 && anchorMinute < 1440
      ? anchorMinute
      : (firstStart ?? 360);

  const view = WHOLE_DAY;
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
