import {
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerClock from "@/app/(tools)/timer/hooks/useTimerClock";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import type { TimerView } from "@/app/(tools)/timer/utils/timerCalendar";
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
  heading,
  dateControls,
}: {
  editableDate: boolean;
  /** Date heading; first row on mobile, left of the controls from `md`. */
  heading: ReactNode;
  /** Today and previous/next controls; beside the heading, then left of the cluster from `md`. */
  dateControls: ReactNode;
  view: TimerView;
  onViewChange: (view: TimerView) => void;
}) {
  const { snapshot, clockOffset } = useTimer("snapshot", "clockOffset");
  const now = useTimerClock(snapshot, clockOffset);
  const completed = snapshot
    ? getTaskCollection(snapshot.day.tasks, snapshot.today, now).completed
    : [];
  return (
    <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-4 md:flex-nowrap">
      <div className="min-w-0 flex-1">{heading}</div>
      {dateControls}
      <div className="flex w-full flex-wrap items-center gap-2 md:w-auto">
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
        <div className="ml-auto md:ml-0">
          <ButtonGroup aria-label="History and settings" joinChildren>
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
            <TimerSettingsTrigger
              aria-label="Settings"
              title="Settings"
              variant="outline"
              size="icon-toolbar"
            >
              <Cog6ToothIcon aria-hidden="true" className="size-4.5" />
            </TimerSettingsTrigger>
          </ButtonGroup>
        </div>
        <AddTask disabled={!editableDate || !canUseTimer(snapshot)} />
      </div>
    </div>
  );
}
