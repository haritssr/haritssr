import { Popover } from "@base-ui/react/popover";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import type { TimerTask } from "@/utils/timer";

const TASK_DESCRIPTION_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-foreground before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function TaskDescription({ task }: { task: TimerTask }) {
  // Keep the popover's focus guards out of the card's space-y layout.
  return (
    <div className="min-w-0">
      <Popover.Root>
        <Popover.Trigger
          aria-label={`Show description for ${task.activity}`}
          className="text-muted hover:text-muted/70 focus-visible:outline-action group flex h-5 w-fit cursor-pointer items-center justify-start gap-px rounded text-base leading-5 group-data-completed/task:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
          openOnHover
        >
          <InformationCircleIcon
            aria-hidden="true"
            className="size-5.5 shrink-0"
            strokeWidth={1.5}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner
            align="center"
            className="z-50 w-64 max-w-[calc(100vw-2rem)]"
            positionMethod="fixed"
            side="top"
            sideOffset={8}
          >
            <Popover.Popup
              className="bg-foreground text-background w-full rounded-md px-2.5 py-1.5 text-sm shadow-xl outline-hidden"
              initialFocus={false}
              finalFocus={false}
            >
              <Popover.Title className="sr-only">
                {task.activity} description
              </Popover.Title>
              <Popover.Description
                className={`wrap-anywhere whitespace-pre-wrap ${task.description.trim().length === 0 ? "text-background/70 italic" : ""}`}
              >
                {task.description.trim().length === 0 ? "—" : task.description}
              </Popover.Description>
              <Popover.Arrow className={TASK_DESCRIPTION_ARROW_CLASS_NAME} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
