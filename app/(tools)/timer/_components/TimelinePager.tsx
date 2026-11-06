import { Tooltip } from "@base-ui/react/tooltip";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

import type { TimelinePagerState } from "../hooks/useTimelineWindow";
import { isDaytime } from "../utils/timelineWindow";
import type { Period } from "../utils/timer";

/** A sun for daytime periods and a moon for night periods. */
export function TimeOfDayIcon({
  period,
  className = "size-3.5 shrink-0",
}: {
  period: Period;
  className?: string;
}) {
  const Icon = isDaytime(period) ? SunIcon : MoonIcon;
  return <Icon aria-hidden="true" className={className} />;
}

/** A pager button that names the hours it opens in a tooltip on hover or focus. */
function PagerButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        aria-label={label}
        onClick={onClick}
        render={
          <ButtonGroupItem className="min-h-8.5 min-w-8.5" spacing="roomy" />
        }
      >
        {children}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner
          side="bottom"
          sideOffset={6}
          className="z-50 max-w-[min(20rem,calc(100vw-2rem))]"
        >
          <Tooltip.Popup className="corner-squircle bg-foreground text-background rounded-md px-2.5 py-1.5 text-sm wrap-anywhere shadow-lg supports-[corner-shape:squircle]:rounded-xl">
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

/** Floating buttons that step the timeline earlier or later, or back to the current time. */
export default function TimelinePager({
  previous,
  now,
  next,
  inset = false,
}: TimelinePagerState & {
  /** Moves the pager left of a visible scroll bar on small screens. */
  inset?: boolean;
}) {
  // A lone Now button (follow-now mode) floats as its own circle.
  if (previous === null && next === null && now !== null) {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger
            aria-label={now.label}
            onClick={() => {
              now.select();
            }}
            className="bg-background focus-visible:outline-action hover:inset-ring-foreground/50 absolute top-4 right-5 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full drop-shadow-lg transition-shadow duration-150 hover:inset-ring-1 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
          >
            <span
              aria-hidden="true"
              className="bg-danger size-6 rounded-full"
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner side="bottom" sideOffset={6} className="z-50">
              <Tooltip.Popup className="corner-squircle bg-foreground text-background rounded-md px-2 py-1 text-xs shadow-lg supports-[corner-shape:squircle]:rounded-lg">
                {now.label}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }
  const dot = (
    <span
      aria-hidden="true"
      className="bg-danger size-1.5 shrink-0 rounded-full"
    />
  );
  return (
    <div
      className={`corner-squircle bg-background/80 absolute top-0 ${inset ? "right-3" : "right-0"} z-20 rounded-md backdrop-blur-xs supports-[corner-shape:squircle]:rounded-xl lg:top-2 lg:right-2`}
    >
      <Tooltip.Provider>
        <ButtonGroup aria-label="Schedule hours">
          {previous === null ? null : (
            <PagerButton
              label={previous.label}
              onClick={() => {
                previous.select();
              }}
            >
              <ChevronLeftIcon
                aria-hidden="true"
                className="size-4.5 -translate-x-px"
              />
            </PagerButton>
          )}
          {now === null ? null : (
            <PagerButton
              label={now.label}
              onClick={() => {
                now.select();
              }}
            >
              {dot}
            </PagerButton>
          )}
          {next === null ? null : (
            <PagerButton
              label={next.label}
              onClick={() => {
                next.select();
              }}
            >
              <ChevronRightIcon
                aria-hidden="true"
                className="size-4.5 translate-x-px"
              />
            </PagerButton>
          )}
        </ButtonGroup>
      </Tooltip.Provider>
    </div>
  );
}
