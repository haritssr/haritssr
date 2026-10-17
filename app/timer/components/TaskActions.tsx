import type { ComponentProps } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";
import type { TimerTask } from "@/utils/timer";
import { playTaskSound, prepareTaskSound } from "@/utils/timerSound";

import type { TaskView } from "./taskPresentation";

export default function TaskActions({
  date,
  task,
  running,
  label,
  variant,
  view,
}: {
  date: string;
  task: TimerTask;
  running: boolean;
  label: string;
  variant: ComponentProps<typeof Button>["variant"];
  view: TaskView;
}) {
  const { act, snapshot, busy } = useTimer();
  const showDone = running || task.spent > 0;
  function toggleRunning() {
    const sound = running ? null : prepareTaskSound();
    void act({
      action: running ? "pause" : "start",
      date,
      taskId: task.id,
    }).then((saved) => {
      if (saved && !running) {
        playTaskSound(sound, "start");
      }
    });
  }

  function finishTask() {
    const sound = prepareTaskSound();
    void act({ action: "done", date, taskId: task.id }).then((saved) => {
      if (saved) {
        playTaskSound(sound, "done");
      }
    });
  }

  return (
    <div
      className={`flex items-center ${view === "cards" ? "space-x-2.5" : "space-x-3"}`}
    >
      <Button
        className="w-full"
        size="mobile-roomy"
        disabled={busy || snapshot?.mode === "demo"}
        onClick={showDone ? finishTask : toggleRunning}
        variant={showDone ? "secondary-strong" : variant}
      >
        {showDone ? "Done" : label}
      </Button>
      {showDone ? (
        <Button
          className="w-full"
          size="mobile-roomy"
          disabled={busy || snapshot?.mode === "demo"}
          onClick={toggleRunning}
          variant="neutral-subtle"
        >
          {label}
        </Button>
      ) : null}
    </div>
  );
}
