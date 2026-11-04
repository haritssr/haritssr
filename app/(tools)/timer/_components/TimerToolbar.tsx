import {
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

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
  editableDate,
  navigation,
}: {
  editableDate: boolean;
  /** Date navigation; shares this row from `md`, otherwise sits on its own row. */
  navigation: ReactNode;
  view: "day" | "week" | "month" | "year";
  onViewChange: (view: "day" | "week" | "month" | "year") => void;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset);
  const completed = snapshot
    ? getTaskCollection(snapshot.day.tasks, snapshot.today, now).completed
    : [];
  return (
    <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-3">
      <div className="flex shrink-0 items-center gap-2 md:col-start-1 md:row-start-1">
        <AddTask disabled={!editableDate || !canUseTimer(snapshot)} />
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
          triggerIcon={
            <ClipboardDocumentCheckIcon
              aria-hidden="true"
              className="size-4.5"
            />
          }
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
      <div className="ml-auto w-fit shrink-0 md:col-start-3 md:row-start-1 md:justify-self-end">
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
      {navigation === null ? null : (
        <div className="w-full md:col-start-2 md:row-start-1 md:w-auto">
          {navigation}
        </div>
      )}
    </div>
  );
}
