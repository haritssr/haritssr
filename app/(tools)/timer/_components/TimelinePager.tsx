import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

import type { TimelinePagerState } from "../hooks/useTimelineWindow";
import { isDaytime, PAGE_COUNT, pagePeriod } from "../utils/timelineWindow";
import type { Period } from "../utils/timer";

/** A sun for daytime periods and a moon for night periods. */
export function TimeOfDayIcon({
  period,
  className = "size-3.5 shrink-0",
}: {
  period: Period;
  className?: string;
}) {
  const Icon = isDaytime(period) ? SunIcon : MoonIcon;
  return <Icon aria-hidden="true" className={className} />;
}

/** A 12-hour hour with its suffix, such as `6AM`. */
function hourLabel(minute: number) {
  const hour = Math.floor(minute / 60) % 24;
  return `${hour % 12 || 12}${hour < 12 ? "AM" : "PM"}`;
}

/** A compact range that drops the shared suffix: `1-6PM`, or `6AM-12PM` when suffixes differ. */
function pageRange(period: Period) {
  const start = hourLabel(period.from);
  const end = hourLabel(period.until);
  const startSuffix = start.slice(-2);
  const endSuffix = end.slice(-2);
  if (startSuffix === endSuffix) {
    return `${start.slice(0, -2)}-${end}`;
  }
  return `${start}-${end}`;
}

/** Floating buttons that step the 6-hour timeline to the previous or next page. */
export default function TimelinePager({
  page,
  nowPage,
  select,
}: TimelinePagerState) {
  const previous = page > 0 ? pagePeriod(page - 1) : null;
  const next = page < PAGE_COUNT - 1 ? pagePeriod(page + 1) : null;
  const dot = (
    <span
      aria-hidden="true"
      className="bg-danger size-1.5 shrink-0 rounded-full"
    />
  );
  return (
    <div className="corner-squircle bg-background/80 absolute top-0 right-0 z-40 rounded-md backdrop-blur-xs supports-[corner-shape:squircle]:rounded-xl lg:top-2 lg:right-2">
      <ButtonGroup aria-label="Schedule hours">
        {previous === null ? null : (
          <ButtonGroupItem
            className="min-h-8.5 min-w-8.5"
            aria-label={`Show ${pageRange(previous)}${nowPage === page - 1 ? ", current time" : ""}`}
            onClick={() => {
              select(page - 1);
            }}
          >
            <ChevronLeftIcon
              aria-hidden="true"
              className="size-4.5 -translate-x-px"
            />
            {nowPage !== null && nowPage < page ? dot : null}
          </ButtonGroupItem>
        )}
        {next === null ? null : (
          <ButtonGroupItem
            className="min-h-8.5 min-w-8.5"
            aria-label={`Show ${pageRange(next)}${nowPage === page + 1 ? ", current time" : ""}`}
            onClick={() => {
              select(page + 1);
            }}
          >
            {nowPage !== null && nowPage > page ? dot : null}
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4.5 translate-x-px"
            />
          </ButtonGroupItem>
        )}
      </ButtonGroup>
    </div>
  );
}
