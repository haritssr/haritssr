import type { ComponentProps } from "react";

import Button from "@/components/Button";
import { useTimer } from "@/components/TimerProvider";
import type { TimerTask } from "@/utils/timer";
import { playTaskSound, prepareTaskSound } from "@/utils/timerSound";

import DeleteTaskButton from "./DeleteTaskButton";
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
    const sound = prepareTaskSound();
    void act({
      action: running ? "pause" : "start",
      date,
      taskId: task.id,
    }).then((saved) => {
      if (saved) {
        playTaskSound(sound, running ? "pause" : "start");
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
      {showDone ? null : (
        <DeleteTaskButton
          className="w-full"
          dimWhenDisabled={snapshot?.mode !== "local"}
          size="mobile-roomy"
          disabled={busy || snapshot?.mode !== "local"}
          onDelete={async () =>
            await act({ action: "delete", date, taskId: task.id })
          }
          variant="secondary-strong"
          aria-label={`Delete ${task.activity}`}
        />
      )}
      <Button
        className={`w-full ${showDone ? "" : "select-none"}`}
        dimWhenDisabled={snapshot?.mode !== "local"}
        size="mobile-roomy"
        disabled={busy || snapshot?.mode === "demo"}
        onClick={showDone ? finishTask : toggleRunning}
        variant={showDone ? "secondary-strong" : variant}
      >
        {showDone ? "Done" : label}
      </Button>
      {showDone ? (
        <Button
          className="w-full select-none"
          dimWhenDisabled={snapshot?.mode !== "local"}
          size="mobile-roomy"
          disabled={busy || snapshot?.mode === "demo"}
          onClick={toggleRunning}
          variant={running ? "danger-subtle" : "attention-subtle"}
        >
          {label}
        </Button>
      ) : null}
    </div>
  );
}
