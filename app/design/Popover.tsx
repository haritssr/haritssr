"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";

import Button from "@/components/Button";

const POPOVER_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:border before:border-border before:bg-white before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function Popover() {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger render={<Button />}>
        Show Popover
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" sideOffset={10}>
          <BasePopover.Popup
            aria-label="Popover example"
            className="border-border text-foreground w-[min(80vw,24rem)] rounded-lg border bg-white p-4 text-sm shadow-xl outline-hidden"
          >
            Popovers are useful for short, contextual information.
            <BasePopover.Close className="text-action hover:text-action-hover focus-visible:outline-action mt-3 block text-sm hover:underline focus-visible:outline-2">
              Close
            </BasePopover.Close>
            <BasePopover.Arrow className={POPOVER_ARROW_CLASS_NAME} />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
