import { Tooltip } from "@base-ui/react/tooltip";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const TOOLTIP_ARROW_CLASS_NAME =
  "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:bg-zinc-700 before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]";

export default function TooltipDemo() {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <div className="flex space-x-1">
          <div className="text-zinc-700">Tooltip</div>
          <Tooltip.Trigger className="flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700">
            <ExclamationCircleIcon
              className="h-4 w-4 text-zinc-600 hover:text-zinc-700"
              strokeWidth={2}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner align="center" side="top">
              <Tooltip.Popup className="rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl">
                <div>Hey, I am Tooltip!</div>
                <Tooltip.Arrow className={TOOLTIP_ARROW_CLASS_NAME} />
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </div>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
