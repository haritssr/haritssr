import { Popover } from "@base-ui/react/popover";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

import type { TimerTask } from "@/utils/timer";

const TASK_DESCRIPTION_ARROW_CLASS_NAME =
  "relative block h-1.75 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-[1px] before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:border before:border-border before:bg-white before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function TaskDescription({ task }: { task: TimerTask }) {
  const anchor = useRef<HTMLDivElement>(null);
  // Keep the popover's focus guards out of the card's space-y layout.
  return (
    <div className="min-w-0" ref={anchor}>
      <Popover.Root>
        <Popover.Trigger
          aria-label={`Show description for ${task.activity}`}
          className="text-muted hover:text-muted/70 focus-visible:outline-action group flex h-5 w-fit cursor-pointer items-center justify-start gap-px rounded text-base leading-5 group-data-completed/task:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"
          openOnHover
        >
          <span>Description</span>
          <ChevronRightIcon
            aria-hidden="true"
            className="mt-px size-4 shrink-0 transition-transform group-data-popup-open:rotate-90"
            strokeWidth={2.5}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner
            align="start"
            anchor={anchor}
            className="z-50 w-(--anchor-width)"
            positionMethod="fixed"
            side="bottom"
            sideOffset={8}
          >
            <Popover.Popup
              className="border-border text-foreground w-full rounded-lg border bg-white px-3 py-2 text-sm shadow-2xl outline-hidden"
              initialFocus={false}
              finalFocus={false}
            >
              <Popover.Title className="sr-only">
                {task.activity} description
              </Popover.Title>
              <Popover.Description
                className={`wrap-anywhere whitespace-pre-wrap ${task.description.trim().length === 0 ? "text-muted italic" : ""}`}
              >
                {task.description.trim().length === 0
                  ? "No description added"
                  : task.description}
              </Popover.Description>
              <Popover.Arrow className={TASK_DESCRIPTION_ARROW_CLASS_NAME} />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
