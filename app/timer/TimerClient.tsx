"use client";

import { useState, useSyncExternalStore } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";

import TaskList from "./components/TaskList";
import type { TaskView } from "./components/taskPresentation";
import TimerDataControls from "./components/TimerDataControls";
import TimerToolbar from "./components/TimerToolbar";

function subscribeToMobile(onChange: () => void) {
  const media = window.matchMedia("(width < 40rem)");
  media.addEventListener("change", onChange);
  return () => {
    media.removeEventListener("change", onChange);
  };
}

function getMobileSnapshot() {
  return window.matchMedia("(width < 40rem)").matches;
}

function getServerMobileSnapshot() {
  return false;
}

export default function TimerClient() {
  const [view, setView] = useState<TaskView>("cards");
  const mobile = useSyncExternalStore(
    subscribeToMobile,
    getMobileSnapshot,
    getServerMobileSnapshot
  );
  return (
    <div className="space-y-5">
      <TimerDataControls>
        {(backupActions) => (
          <TimerToolbar
            view={view}
            onViewChange={setView}
            backupActions={backupActions}
          />
        )}
      </TimerDataControls>
      <TimerLoadError />
      <TaskList view={mobile ? "cards" : view} />
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
