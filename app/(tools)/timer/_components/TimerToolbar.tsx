import { ClockIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import Bento from "@/components/Bento";
import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

import CompletedTasksTable from "./CompletedTasksTable";
import { AddTask } from "./TaskDialog";
import { getTaskCollection } from "./taskState";
import { TimerSettingsTrigger } from "./TimerSettings";

export default function TimerToolbar({
  view,
  onViewChange,
}: {
  view: "day" | "week" | "month" | "year";
  onViewChange: (view: "day" | "week" | "month" | "year") => void;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset);
  const completed = snapshot
    ? getTaskCollection(snapshot.day.tasks, snapshot.today, now).completed
    : [];
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <AddTask disabled={!canUseTimer(snapshot)} />
        <TimerSettingsTrigger
          aria-label="Settings"
          title="Settings"
          variant="outline"
          size="icon-toolbar"
        >
          <Cog6ToothIcon aria-hidden="true" className="size-4.5" />
        </TimerSettingsTrigger>
        <Bento
          title="Today History"
          trigger="outline"
          modalSize="wide"
          closeButtonSize="compact"
          triggerIcon={<ClockIcon aria-hidden="true" className="size-4.5" />}
        >
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
      <ButtonGroup aria-label="Timer view">
        {(["day", "week", "month", "year"] as const).map((option) => (
          <ButtonGroupItem
            key={option}
            aria-pressed={view === option}
            onClick={() => {
              onViewChange(option);
            }}
          >
            {option[0]?.toUpperCase()}
            {option.slice(1)}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    </div>
  );
}
