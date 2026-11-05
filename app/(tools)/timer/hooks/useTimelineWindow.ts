import { useMemo, useState } from "react";

import { PAGE_MINUTES, pageAt, pagePeriod } from "../utils/timelineWindow";
import { allDayPeriod, scheduledPeriod, timerDayBounds } from "../utils/timer";
import type { Period, TimerTask } from "../utils/timer";
import usePagedTimeline from "./usePagedTimeline";

export interface TimelinePagerState {
  page: number;
  /** The page holding the current time, or null outside today. */
  nowPage: number | null;
  select: (page: number) => void;
}

/**
 * Chooses the minutes the schedule shows: the whole day, or one 6-hour page
 * when the "6-hour timeline" setting is on. Pages open on the current time,
 * or on the first scheduled task of other days, until one is chosen.
 */
export default function useTimelineWindow(
  tasks: TimerTask[],
  date: string,
  now: number
): { view: Period; pager: TimelinePagerState | null } {
  const { paged } = usePagedTimeline();
  const [choice, setChoice] = useState<{ date: string; page: number } | null>(
    null
  );
  const nowPage = pageAt((now - timerDayBounds(date).start) / 60_000);
  const starts = tasks.flatMap((task) => scheduledPeriod(task)?.from ?? []);
  // Without a current time or tasks, open on the morning-to-noon page.
  const fallback =
    nowPage ??
    (starts.length === 0 ? 1 : Math.floor(Math.min(...starts) / PAGE_MINUTES));
  const page = choice?.date === date ? choice.page : fallback;
  // Stable between renders so gesture effects keep running.
  const view = useMemo(
    () => (paged ? pagePeriod(page) : allDayPeriod()),
    [paged, page]
  );
  return {
    view,
    pager: paged
      ? {
          page,
          nowPage,
          select: (next) => {
            setChoice({ date, page: next });
          },
        }
      : null,
  };
}
