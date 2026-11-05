import { Tooltip } from "@base-ui/react/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

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

/** A pager button that names the hours it opens in a tooltip on hover or focus. */
function PagerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        aria-label={label}
        onClick={onClick}
        render={<ButtonGroupItem className="min-h-8.5 min-w-8.5" />}
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner
          side="bottom"
          sideOffset={6}
          className="z-50 max-w-[min(20rem,calc(100vw-2rem))]"
        >
          <Tooltip.Popup className="corner-squircle bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm wrap-anywhere shadow-lg supports-[corner-shape:squircle]:rounded-xl">
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/** Floating buttons that step the 6-hour timeline to the previous or next page, or back to the current time. */
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
    <div className="corner-squircle bg-background/80 absolute top-0 right-0 z-20 rounded-md backdrop-blur-xs supports-[corner-shape:squircle]:rounded-xl lg:top-2 lg:right-2">
      <Tooltip.Provider>
        <ButtonGroup aria-label="Schedule hours">
          {previous === null ? null : (
            <PagerButton
              label={`Show ${pageRange(previous)}${nowPage === page - 1 ? ", current time" : ""}`}
              onClick={() => {
                select(page - 1);
              }}
            >
              <ChevronLeftIcon
                aria-hidden="true"
                className="size-4.5 -translate-x-px"
              />
            </PagerButton>
          )}
          {nowPage === null || nowPage === page ? null : (
            <PagerButton
              label={`Now, ${pageRange(pagePeriod(nowPage))}`}
              onClick={() => {
                select(nowPage);
              }}
            >
              {dot}
            </PagerButton>
          )}
          {next === null ? null : (
            <PagerButton
              label={`Show ${pageRange(next)}${nowPage === page + 1 ? ", current time" : ""}`}
              onClick={() => {
                select(page + 1);
              }}
            >
              <ChevronRightIcon
                aria-hidden="true"
                className="size-4.5 translate-x-px"
              />
            </PagerButton>
          )}
        </ButtonGroup>
      </Tooltip.Provider>
    </div>
  );
}
