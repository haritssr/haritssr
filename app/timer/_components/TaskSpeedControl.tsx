import { Button as BaseButton } from "@base-ui/react/button";
import { ClockIcon } from "@heroicons/react/24/outline";

import { useTimer } from "@/app/timer/_components/TimerProvider";
import { canUseTimer, TIMER_SPEEDS } from "@/app/timer/utils/timer";
import type { TimerTask } from "@/app/timer/utils/timer";

export default function TaskSpeedControl({
  task,
  date,
  showIcon = true,
}: {
  task: TimerTask;
  date: string;
  showIcon?: boolean;
}) {
  const { act, snapshot } = useTimer("act", "snapshot");
  const speed = task.speed ?? 1;
  const nextSpeed =
    TIMER_SPEEDS[(TIMER_SPEEDS.indexOf(speed) + 1) % TIMER_SPEEDS.length] ?? 1;
  return (
    <BaseButton
      aria-label={`Speed for ${task.activity}: ${speed}x. Change to ${nextSpeed}x`}
      className={`text-muted hover:text-foreground focus-visible:outline-action inline-flex shrink-0 cursor-pointer items-center gap-0 rounded text-base leading-5 select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${showIcon ? "h-5" : "min-h-10 min-w-10 justify-center sm:min-h-8 sm:min-w-8"} ${canUseTimer(snapshot) ? "disabled:opacity-100" : "disabled:opacity-50"}`}
      disabled={!canUseTimer(snapshot)}
      onClick={() => {
        void act({ action: "speed", date, taskId: task.id, speed: nextSpeed });
      }}
      title={`Timer speed: ${speed}x. Click for ${nextSpeed}x`}
      type="button"
    >
      {showIcon ? (
        <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
      ) : null}
      <span className="inline-block min-w-[4ch] text-right tabular-nums underline-offset-2 hover:underline">
        {speed}x
      </span>
    </BaseButton>
  );
}
