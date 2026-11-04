import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

import { shiftTimerDate } from "../utils/timer";
import {
  calendarDateLabel,
  shortDateLabel,
  shiftTimerMonth,
  weekRangeLabel,
  weekStart,
} from "../utils/timerCalendar";
import type { TimerView } from "../utils/timerCalendar";

const groupLabel = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
} as const;

function periodState(date: string, today: string, period: TimerView) {
  const move = (amount: number) => {
    if (period === "month" || period === "year") {
      const months = period === "year" ? amount * 12 : amount;
      return `${shiftTimerMonth(date.slice(0, 7), months)}-01`;
    }
    return shiftTimerDate(date, period === "week" ? amount * 7 : amount);
  };
  let isCurrentPeriod = date === today;
  if (period === "month") {
    isCurrentPeriod = date.slice(0, 7) === today.slice(0, 7);
  } else if (period === "week") {
    isCurrentPeriod = weekStart(date) === weekStart(today);
  } else if (period === "year") {
    isCurrentPeriod = date.slice(0, 4) === today.slice(0, 4);
  }
  return { move, isCurrentPeriod };
}

/** Heading for the displayed day, week, month, or year. */
export function TimerDateHeading({
  date,
  period,
}: {
  date: string;
  period: TimerView;
}) {
  let heading = (
    <time dateTime={date} title={date}>
      <span className="md:hidden">{shortDateLabel(date)}</span>
      <span className="hidden md:inline">{calendarDateLabel(date)}</span>
    </time>
  );
  if (period === "month") {
    heading = <>{calendarDateLabel(date, true)}</>;
  } else if (period === "week") {
    heading = <>{weekRangeLabel(date)}</>;
  } else if (period === "year") {
    heading = <>{date.slice(0, 4)}</>;
  }
  return (
    <h2 className="min-w-0 text-xl font-medium" aria-live="polite">
      {heading}
    </h2>
  );
}

/** Previous/next controls and the Today shortcut, in toolbar order. */
export function TimerDateControls({
  date,
  today,
  period,
  onChange,
}: {
  date: string;
  today: string;
  period: TimerView;
  onChange: (date: string) => void;
}) {
  const { move, isCurrentPeriod } = periodState(date, today, period);
  return (
    <div className="flex shrink-0 items-center gap-2">
      {isCurrentPeriod ? null : (
        <Button
          className="min-h-8.5"
          variant="tonal"
          onClick={() => {
            onChange(today);
          }}
        >
          Today
        </Button>
      )}
      <ButtonGroup aria-label={`${groupLabel[period]} navigation`}>
        <ButtonGroupItem
          aria-label={`Previous ${period}`}
          onClick={() => {
            onChange(move(-1));
          }}
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="size-4.5 -translate-x-px"
          />
        </ButtonGroupItem>
        <ButtonGroupItem
          aria-label={`Next ${period}`}
          onClick={() => {
            onChange(move(1));
          }}
        >
          <ChevronRightIcon
            aria-hidden="true"
            className="size-4.5 translate-x-px"
          />
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}
