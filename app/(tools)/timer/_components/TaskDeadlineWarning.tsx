import { Popover } from "@base-ui/react/popover";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { formatDeadlineTime } from "../utils/timerDeadline";
import type { TaskState } from "./taskState";

const WARNING_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-foreground before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function TaskDeadlineWarning({ state }: { state: TaskState }) {
  if (state.deadlineWarning === null) {
    return null;
  }
  const message =
    state.deadlineWarning === "late"
      ? `Not enough time to finish before ${formatDeadlineTime(state.closesAt)}.`
      : `Start by ${formatDeadlineTime(state.latestStartAt)} to finish before ${formatDeadlineTime(state.closesAt)}.`;
  return (
    <div className="flex size-5 shrink-0 items-center justify-center">
      <Popover.Root>
        <Popover.Trigger
          aria-label={message}
          className="text-danger focus-visible:outline-action flex size-5 shrink-0 cursor-pointer items-center justify-center rounded outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
          openOnHover
        >
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="size-5 translate-y-px motion-safe:animate-pulse"
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner
            align="center"
            className="z-50 w-max max-w-[min(16rem,calc(100vw-2rem))]"
            positionMethod="fixed"
            side="top"
            sideOffset={8}
          >
            <Popover.Popup
              className="bg-foreground text-background w-full rounded-md px-2.5 py-1.5 text-sm shadow-xl outline-hidden"
              initialFocus={false}
              finalFocus={false}
            >
              <Popover.Title className="sr-only">Task deadline</Popover.Title>
              <Popover.Description className="wrap-anywhere">
                {message}
              </Popover.Description>
              <Popover.Arrow className={WARNING_ARROW_CLASS_NAME} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
