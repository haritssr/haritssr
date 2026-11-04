"use client";

import { Suspense, lazy, useState } from "react";

import { TaskEditingContext } from "./_components/TaskEditing";
import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import {
  TimerDateControls,
  TimerDateHeading,
} from "./_components/TimerDateNavigation";
import { useTimer } from "./_components/TimerProvider";
import TimerSettingsScope from "./_components/TimerSettings";
import TimerToolbar from "./_components/TimerToolbar";
import TimerYear from "./_components/TimerYear";
import useTimerCalendar from "./hooks/useTimerCalendar";
import useTimerClock from "./hooks/useTimerClock";
import useTimerPlanning from "./hooks/useTimerPlanning";
import { shiftTimerDate, timerDate } from "./utils/timer";
import {
  calendarLoadingLabel,
  viewPeriodDate,
  weekStart,
} from "./utils/timerCalendar";
import type { TimerView } from "./utils/timerCalendar";

// Today's Day view never downloads the Week, Month, and other-day views.
const TimerCalendarContent = lazy(
  async () => await import("./_components/TimerCalendarContent")
);

export default function TimerClient() {
  const [view, setView] = useState<TimerView>("day");
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset, true, 60_000);
  const today = snapshot?.today ?? timerDate(now);
  // Null follows today across Jakarta midnight; explicitly selected dates stay selected.
  const [selection, setSelection] = useState<string | null>(null);
  const selectedDate = selection ?? today;
  const [displayedMonth, setDisplayedMonth] = useState<string | null>(null);
  const [displayedWeek, setDisplayedWeek] = useState<string | null>(null);
  const week = displayedWeek ?? weekStart(selectedDate);
  let month = selectedDate.slice(0, 7);
  // Year shares Month's displayed month so switching between them keeps the year.
  if (view === "month" || view === "year") {
    month = displayedMonth ?? month;
  } else if (view === "week") {
    month = week.slice(0, 7);
  }
  const needsCalendar =
    view === "day" ? selectedDate !== today : view !== "year";
  // A week that crosses a month boundary also reads the following month.
  const { calendar, error, retry } = useTimerCalendar(
    month,
    needsCalendar,
    view === "week" ? shiftTimerDate(week, 6).slice(0, 7) : month
  );
  const days = calendar?.days.map((day) =>
    day.date === today && snapshot ? snapshot.day : day
  );
  const day = days?.find((entry) => entry.date === selectedDate);
  const planning = useTimerPlanning(
    day,
    view === "day" && selectedDate > today
  );
  function selectDate(date: string) {
    setSelection(date === today ? null : date);
    setDisplayedMonth(date.slice(0, 7));
    setDisplayedWeek(null);
  }
  function selectView(next: typeof view) {
    if (next === "month" || next === "year") {
      setDisplayedMonth(selectedDate.slice(0, 7));
    } else if (next === "week") {
      setDisplayedWeek(null);
    }
    setView(next);
  }
  const periodDate = viewPeriodDate(view, `${month}-01`, week, selectedDate);
  function changePeriod(date: string) {
    if (view === "week") {
      setDisplayedWeek(weekStart(date));
    } else if (view === "month" || view === "year") {
      setDisplayedMonth(date.slice(0, 7));
    } else {
      selectDate(date);
    }
  }
  return (
    <TaskEditingContext value={planning}>
      <TimerSettingsScope>
        <div className="space-y-4 pb-18 md:space-y-5 md:pb-0">
          <TimerDataControls>
            <TimerToolbar
              view={view}
              onViewChange={selectView}
              editableDate={selectedDate === today || planning !== null}
              heading={<TimerDateHeading date={periodDate} period={view} />}
              dateControls={
                <TimerDateControls
                  date={periodDate}
                  today={today}
                  period={view}
                  onChange={changePeriod}
                />
              }
            />
          </TimerDataControls>
          {needsCalendar ? (
            <Suspense
              fallback={
                <output className="text-muted block">
                  {calendarLoadingLabel(
                    view,
                    viewPeriodDate(view, month, week, selectedDate)
                  )}
                </output>
              }
            >
              <TimerCalendarContent
                view={view}
                calendar={calendar}
                error={error}
                retry={retry}
                month={month}
                week={week}
                today={today}
                selectedDate={selectedDate}
                days={days}
                day={day}
                now={now}
                onSelect={(date) => {
                  selectDate(date);
                  setView("day");
                }}
              />
            </Suspense>
          ) : null}
          {view === "year" ? (
            <TimerYear
              year={month.slice(0, 4)}
              today={today}
              onSelect={(next) => {
                setDisplayedMonth(next);
                setView("month");
              }}
            />
          ) : null}
          {view === "day" && selectedDate === today ? (
            <TaskList now={now} />
          ) : null}
        </div>
      </TimerSettingsScope>
    </TaskEditingContext>
  );
}
