"use client";

import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import TimerSettingsScope from "./_components/TimerSettings";
import TimerToolbar from "./_components/TimerToolbar";

export default function TimerClient() {
  return (
    <TimerSettingsScope>
      <div className="space-y-4">
        <TimerDataControls>
          {(backupActions) => <TimerToolbar backupActions={backupActions} />}
        </TimerDataControls>
        <TaskList />
      </div>
    </TimerSettingsScope>
  );
}
