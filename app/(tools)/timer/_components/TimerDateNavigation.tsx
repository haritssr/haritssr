import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";

import { shiftTimerDate } from "../utils/timer";
import {
  calendarDateLabel,
  isoDateLabel,
  shiftTimerMonth,
} from "../utils/timerCalendar";

export default function TimerDateNavigation({
  date,
  today,
  monthly = false,
  onChange,
}: {
  date: string;
  today: string;
  monthly?: boolean;
  onChange: (date: string) => void;
}) {
  const move = (amount: number) =>
    monthly
      ? `${shiftTimerMonth(date.slice(0, 7), amount)}-01`
      : shiftTimerDate(date, amount);
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="min-w-0 text-lg font-medium" aria-live="polite">
        {monthly ? (
          calendarDateLabel(date, true)
        ) : (
          <time dateTime={date} title={calendarDateLabel(date)}>
            {isoDateLabel(date)}
          </time>
        )}
      </h2>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          onClick={() => {
            onChange(today);
          }}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="icon-toolbar"
          aria-label={monthly ? "Previous month" : "Previous day"}
          onClick={() => {
            onChange(move(-1));
          }}
        >
          <ChevronLeftIcon
            aria-hidden="true"
            className="size-4.5 -translate-x-px"
          />
        </Button>
        <Button
          variant="outline"
          size="icon-toolbar"
          aria-label={monthly ? "Next month" : "Next day"}
          onClick={() => {
            onChange(move(1));
          }}
        >
          <ChevronRightIcon
            aria-hidden="true"
            className="size-4.5 translate-x-px"
          />
        </Button>
      </div>
    </div>
  );
}
