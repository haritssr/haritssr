import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import { useTimer } from "@/app/(tools)/timer/_components/TimerProvider";
import { canUseTimer } from "@/app/(tools)/timer/utils/timer";

import { AddTask } from "./TaskDialog";
import { TimerSettingsTrigger } from "./TimerSettings";

export default function TimerToolbar({
  backupActions,
}: {
  backupActions: ReactNode;
}) {
  const { snapshot } = useTimer("snapshot");
  return (
    <div className="border-border flex w-full flex-wrap items-end gap-2 border-b border-dashed pb-4 sm:gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-3">
        <AddTask disabled={!canUseTimer(snapshot)} />
        {backupActions}
        <TimerSettingsTrigger
          aria-label="Settings"
          size="icon-toolbar"
          variant="outline"
        >
          <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
          <span className="hidden lg:inline">Settings</span>
        </TimerSettingsTrigger>
      </div>
    </div>
  );
}
