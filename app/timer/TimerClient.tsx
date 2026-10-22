"use client";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import Button from "@/components/Button";

import TaskList from "./_components/TaskList";
import TimerDataControls from "./_components/TimerDataControls";
import TimerToolbar from "./_components/TimerToolbar";

export default function TimerClient() {
  return (
    <div className="space-y-5">
      <TimerDataControls>
        {(backupActions) => <TimerToolbar backupActions={backupActions} />}
      </TimerDataControls>
      <TimerLoadError />
      <TaskList />
    </div>
  );
}

function TimerLoadError() {
  const { error, refresh } = useTimer();
  return error === null ? null : (
    <div
      className="border-danger text-danger flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
      role="alert"
    >
      <p>{error}</p>
      <Button
        variant="secondary"
        onClick={() => {
          void refresh();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
