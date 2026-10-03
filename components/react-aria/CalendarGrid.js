import { endOfMonth, getWeeksInMonth } from "@internationalized/date";
import { useCalendarGrid, useLocale } from "react-aria";

import { CalendarCell } from "./CalendarCell";

const EMPTY_OFFSET = {};

export function CalendarGrid({ state, offset = EMPTY_OFFSET }) {
  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(startDate, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, dayIndex) => (
            <th key={dayIndex}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: weeksInMonth }, (_, weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, dayIndex) =>
                date ? (
                  <CalendarCell
                    currentMonth={startDate}
                    date={date}
                    key={date.toString()}
                    state={state}
                  />
                ) : (
                  <td aria-hidden="true" key={`empty-${dayIndex}`} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
