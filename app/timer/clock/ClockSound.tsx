"use client";

import { Checkbox } from "@base-ui/react/checkbox";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState } from "react";

import {
  playClockTick,
  prepareTaskSound,
} from "@/app/timer/utils/timerSound";

export default function ClockSound() {
  const id = useId();
  const [enabled, setEnabled] = useState(false);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) {
      return () => {
        /* No clock sound or listeners while disabled. */
      };
    }
    let timeout: number;
    function schedule() {
      window.clearTimeout(timeout);
      if (document.hidden) {
        return;
      }
      timeout = window.setTimeout(
        () => {
          if (!document.hidden) {
            playClockTick(audio.current);
            schedule();
          }
        },
        1000 - (Date.now() % 1000)
      );
    }
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [enabled]);

  return (
    <label
      className="text-foreground flex cursor-pointer items-center gap-2 select-none"
      htmlFor={id}
    >
      Sound
      <Checkbox.Root
        id={id}
        checked={enabled}
        className="interactive-elevation focus-visible:outline-action data-checked:border-action data-checked:bg-action border-border hover:border-action-hover hover:bg-border bg-background flex size-6 items-center justify-center rounded-md border outline-hidden focus-visible:outline-2"
        onCheckedChange={(checked) => {
          if (checked) {
            audio.current = prepareTaskSound();
          }
          setEnabled(checked);
        }}
      >
        <Checkbox.Indicator className="text-background">
          <CheckIcon aria-hidden="true" className="size-5" />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </label>
  );
}
