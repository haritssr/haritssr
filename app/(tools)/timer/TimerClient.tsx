"use client";

import { useState } from "react";

import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import { useTimer } from "./_components/TimerProvider";
import TimerSettingsScope from "./_components/TimerSettings";
import TimerToolbar from "./_components/TimerToolbar";
import useTimerClock from "./hooks/useTimerClock";

export default function TimerClient() {
  const [view, setView] = useState<"day" | "week" | "month" | "year">("day");
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset, true, 60_000);
  return (
    <TimerSettingsScope>
      <div className="space-y-4 pb-18 md:pb-0">
        <TimerDataControls>
          <TimerToolbar view={view} onViewChange={setView} />
        </TimerDataControls>
        {view === "day" ? (
          <TaskList now={now} />
        ) : (
          <p className="capitalize">{view}</p>
        )}
      </div>
    </TimerSettingsScope>
  );
}
