import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";

import Button from "@/components/Button";
import FloatingPlayer from "@/components/floating/FloatingPlayer";

export default function FloatingTask() {
  return (
    <FloatingPlayer className="mx-auto max-w-80 lg:mx-0">
      <div
        data-floating-details=""
        className="flex min-w-0 flex-1 items-center justify-between gap-2"
      >
        <span className="text-foreground flex min-w-0 items-center gap-1 text-sm leading-4 font-medium">
          <SparklesIcon aria-hidden="true" className="size-4 shrink-0" />
          <span className="truncate">Creative session</span>
        </span>
        <span className="text-muted shrink-0 text-sm leading-4 tabular-nums">
          -12:30
        </span>
      </div>
      <Button
        aria-label="Done"
        data-floating-details=""
        size="floating-control"
        variant="floating-control"
      >
        <CheckIcon aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </Button>
      <Button
        aria-label="Play"
        size="floating-control"
        variant="floating-control"
      >
        <PlayIcon aria-hidden="true" className="size-5 translate-x-px" />
      </Button>
    </FloatingPlayer>
  );
}
