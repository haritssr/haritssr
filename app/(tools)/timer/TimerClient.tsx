"use client";

import { Suspense, lazy, useState } from "react";
import type { ReactNode } from "react";

import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import TimerDateNavigation from "./_components/TimerDateNavigation";
import { useTimer } from "./_components/TimerProvider";
import TimerSettingsScope from "./_components/TimerSettings";
import TimerToolbar from "./_components/TimerToolbar";
import useTimerCalendar from "./hooks/useTimerCalendar";
import useTimerClock from "./hooks/useTimerClock";
import { timerDate } from "./utils/timer";
import { calendarLoadingLabel } from "./utils/timerCalendar";

// Today's Day view never downloads the Month and other-day views.
const TimerCalendarContent = lazy(
  async () => await import("./_components/TimerCalendarContent")
);

export default function TimerClient() {
  const [view, setView] = useState<"day" | "week" | "month" | "year">("day");
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset, true, 60_000);
  const today = snapshot?.today ?? timerDate(now);
  // Null follows today across Jakarta midnight; explicitly selected dates stay selected.
  const [selection, setSelection] = useState<string | null>(null);
  const selectedDate = selection ?? today;
  const [displayedMonth, setDisplayedMonth] = useState<string | null>(null);
  const month =
    view === "month"
      ? (displayedMonth ?? selectedDate.slice(0, 7))
      : selectedDate.slice(0, 7);
  const needsCalendar =
    view === "month" || (view === "day" && selectedDate !== today);
  const { calendar, error, retry } = useTimerCalendar(month, needsCalendar);
  const days = calendar?.days.map((day) =>
    day.date === today && snapshot ? snapshot.day : day
  );
  const day = days?.find((entry) => entry.date === selectedDate);
  function selectDate(date: string) {
    setSelection(date === today ? null : date);
    setDisplayedMonth(date.slice(0, 7));
  }
  function selectView(next: typeof view) {
    if (next === "month") {
      setDisplayedMonth(selectedDate.slice(0, 7));
    }
    setView(next);
  }
  let navigation: ReactNode = null;
  if (view === "day") {
    navigation = (
      <TimerDateNavigation
        date={selectedDate}
        today={today}
        onChange={selectDate}
      />
    );
  } else if (view === "month") {
    navigation = (
      <TimerDateNavigation
        monthly
        date={`${month}-01`}
        today={today}
        onChange={(date) => {
          setDisplayedMonth(date.slice(0, 7));
        }}
      />
    );
  }
  return (
    <TimerSettingsScope>
      <div className="space-y-4 pb-18 md:space-y-5 md:pb-0">
        <TimerDataControls>
          <TimerToolbar
            view={view}
            onViewChange={selectView}
            editableDate={selectedDate === today}
            navigation={navigation}
          />
        </TimerDataControls>
        {needsCalendar ? (
          <Suspense
            fallback={
              <output className="text-muted block">
                {calendarLoadingLabel(
                  view,
                  view === "month" ? month : selectedDate
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
        {view === "day" && selectedDate === today ? (
          <TaskList now={now} />
        ) : null}
        {view === "week" || view === "year" ? (
          <p className="capitalize">{view}</p>
        ) : null}
      </div>
    </TimerSettingsScope>
  );
}
