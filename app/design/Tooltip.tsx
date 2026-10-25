"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";

import Button from "@/components/Button";

const POPOVER_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-foreground before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function Tooltip() {
  return (
    <BasePopover.Root>
      <BasePopover.Trigger openOnHover render={<Button />}>
        Show
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner
          align="center"
          className="z-50 w-max max-w-[min(16rem,calc(100vw-2rem))]"
          positionMethod="fixed"
          side="top"
          sideOffset={8}
        >
          <BasePopover.Popup
            aria-label="Tooltip example"
            className="bg-foreground text-background w-full rounded-md px-2.5 py-1.5 text-sm shadow-xl outline-hidden"
            initialFocus={false}
            finalFocus={false}
          >
            <BasePopover.Title className="sr-only">
              Tooltip example
            </BasePopover.Title>
            <BasePopover.Description className="wrap-anywhere">
              Short, contextual information. Hover or tap to show.
            </BasePopover.Description>
            <BasePopover.Arrow className={POPOVER_ARROW_CLASS_NAME} />
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
