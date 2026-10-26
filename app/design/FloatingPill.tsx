import {
  ForwardIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";

import Button from "@/components/Button";

export default function FloatingPill() {
  return (
    <div className="border-foreground/10 bg-background/70 shadow-foreground/10 mx-auto flex min-h-13.25 w-full max-w-[22.4rem] items-center gap-2 rounded-full border py-2 pr-2 pl-5 shadow-lg backdrop-blur-md [corner-shape:round]">
      <div className="min-w-0 flex-1 space-y-2 sm:space-y-1.5">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="text-foreground flex min-w-0 items-center gap-1 text-sm leading-4 font-medium">
            <SparklesIcon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">Creative session</span>
          </span>
          <span className="text-muted shrink-0 text-sm leading-4 tabular-nums">
            -12:30
          </span>
        </div>
        <progress
          aria-label="Creative session progress"
          className="bg-slider-track-hover [&::-webkit-progress-bar]:bg-slider-track-hover [&::-moz-progress-bar]:bg-foreground [&::-webkit-progress-value]:bg-foreground block h-2 w-full appearance-none overflow-hidden rounded-full border-0 sm:h-1.5 [&::-moz-progress-bar]:rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full"
          max={100}
          value={40}
        />
      </div>
      <Button aria-label="Next" size="icon-circle" variant="outline">
        <ForwardIcon aria-hidden="true" className="size-4.5" strokeWidth={2} />
      </Button>
      <Button aria-label="Dismiss" size="icon-circle" variant="outline">
        <XMarkIcon aria-hidden="true" className="size-4.5" strokeWidth={2.5} />
      </Button>
      <Button aria-label="Play" size="icon-circle" variant="neutral-subtle">
        <PlayIcon aria-hidden="true" className="size-4.5 translate-x-px" />
      </Button>
    </div>
  );
}
