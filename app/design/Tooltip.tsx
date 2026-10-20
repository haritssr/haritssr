"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const TOOLTIP_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-foreground before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function Tooltip() {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root>
        <div className="flex space-x-1">
          <div className="text-foreground/80">Tooltip</div>
          <BaseTooltip.Trigger className="hover:bg-foreground/10 active:ring-foreground flex items-center rounded px-1 py-0.5 active:ring-1">
            <ExclamationCircleIcon
              className="text-muted hover:text-foreground/80 h-4 w-4"
              strokeWidth={2}
            />
          </BaseTooltip.Trigger>
          <BaseTooltip.Portal>
            <BaseTooltip.Positioner align="center" side="top">
              <BaseTooltip.Popup className="bg-foreground text-background rounded-md px-2.5 py-1.5 shadow-xl">
                <div>Hey, I am Tooltip!</div>
                <BaseTooltip.Arrow className={TOOLTIP_ARROW_CLASS_NAME} />
              </BaseTooltip.Popup>
            </BaseTooltip.Positioner>
          </BaseTooltip.Portal>
        </div>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
