import Button from "@/components/Button";

import type { TimerDay } from "../utils/timer";
import type { TimerCalendar, TimerView } from "../utils/timerCalendar";
import { calendarLoadingLabel, viewPeriodDate } from "../utils/timerCalendar";
import TimerCalendarDay from "./TimerCalendarDay";
import TimerMonth from "./TimerMonth";
import TimerWeek from "./TimerWeek";

/** Week, Month, and non-today Day views; loaded only when one of them is opened. */
export default function TimerCalendarContent({
  view,
  calendar,
  error,
  retry,
  month,
  week,
  today,
  selectedDate,
  days,
  day,
  now,
  onSelect,
}: {
  view: TimerView;
  calendar: TimerCalendar | undefined;
  error: Error | undefined;
  retry: () => void;
  month: string;
  /** Any date in the displayed week. */
  week: string;
  today: string;
  selectedDate: string;
  days: TimerDay[] | undefined;
  day: TimerDay | undefined;
  now: number;
  onSelect: (date: string) => void;
}) {
  if (calendar === undefined && !error) {
    return (
      <output className="text-muted block">
        {calendarLoadingLabel(
          view,
          viewPeriodDate(view, month, week, selectedDate)
        )}
      </output>
    );
  }
  return (
    <div className="space-y-3">
      {error ? (
        <div role="alert" className="flex items-center gap-2">
          <p className="text-danger text-sm">{error.message}</p>
          <Button variant="outline" onClick={retry}>
            Retry
          </Button>
        </div>
      ) : null}
      {view === "day" && day ? <TimerCalendarDay day={day} now={now} /> : null}
      {view === "week" && days ? (
        <TimerWeek
          date={week}
          today={today}
          days={days}
          now={now}
          onSelect={onSelect}
        />
      ) : null}
      {view === "month" && days ? (
        <TimerMonth
          key={month}
          month={month}
          today={today}
          selectedDate={selectedDate}
          days={days}
          onSelect={onSelect}
        />
      ) : null}
    </div>
  );
}
