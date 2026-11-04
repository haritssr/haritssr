"use client";

import { useState } from "react";

import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import TimerSettingsScope from "./_components/TimerSettings";
import TimerToolbar from "./_components/TimerToolbar";

export default function TimerClient() {
  const [view, setView] = useState<"day" | "week" | "month" | "year">("day");
  return (
    <TimerSettingsScope>
      <div className="space-y-4 pb-18 md:pb-0">
        <TimerDataControls>
          <TimerToolbar view={view} onViewChange={setView} />
        </TimerDataControls>
        {view === "day" ? <TaskList /> : <p className="capitalize">{view}</p>}
      </div>
    </TimerSettingsScope>
  );
}
