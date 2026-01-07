import { createCalendar } from "@internationalized/date";
import { useCalendarState } from "@react-stately/calendar";
import { useRef } from "react";
import { useCalendar, useLocale } from "react-aria";
import { CalendarGrid } from "./CalendarGrid";
import { CalendarHeader } from "./CalendarHeader";

export default function Calendar(props) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
    ref
  );

  return (
    <div
      {...calendarProps}
      className="inline-block w-full text-gray-800"
      ref={ref}
    >
      <CalendarHeader
        calendarProps={calendarProps}
        nextButtonProps={nextButtonProps}
        prevButtonProps={prevButtonProps}
        state={state}
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <CalendarGrid state={state} />
        <CalendarGrid offset={{ months: 1 }} state={state} />
      </div>
    </div>
  );
}
