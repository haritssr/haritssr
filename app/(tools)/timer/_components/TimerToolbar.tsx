import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import Bento from "@/components/Bento";

import CompletedTasksTable from "./CompletedTasksTable";
import { AddTask } from "./TaskDialog";
import { getTaskCollection } from "./taskState";
import { TimerSettingsTrigger } from "./TimerSettings";

export default function TimerToolbar({
  backupActions,
}: {
  backupActions: ReactNode;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset);
  const completed = snapshot
    ? getTaskCollection(snapshot.day.tasks, snapshot.today, now).completed
    : [];
  return (
    <div className="flex w-full flex-wrap items-end gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <AddTask disabled={!canUseTimer(snapshot)} />
        {backupActions}
        <TimerSettingsTrigger
          aria-label="Settings"
          size="responsive-toolbar"
          variant="outline"
        >
          <Cog6ToothIcon
            aria-hidden="true"
            className="size-4.5 stroke-2 md:hidden"
          />
          <span className="hidden md:inline">Settings</span>
        </TimerSettingsTrigger>
        <Bento title="History" trigger="secondary" modalSize="wide">
          {snapshot ? (
            <CompletedTasksTable
              tasks={completed}
              date={snapshot.today}
              now={now}
            />
          ) : (
            <p className="text-muted text-sm">
              No completed or missed tasks today.
            </p>
          )}
        </Bento>
      </div>
    </div>
  );
}
