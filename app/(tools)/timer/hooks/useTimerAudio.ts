import { useEffect, useEffectEvent, useRef, useSyncExternalStore } from "react";

import useTimerAudioOwner from "@/app/(tools)/timer/hooks/useTimerAudioOwner";
import {
  canUseTimer,
  taskSpent,
  timerMidnight,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerSnapshot } from "@/app/(tools)/timer/utils/timer";
import {
  playClockTick,
  prepareTaskSound,
} from "@/app/(tools)/timer/utils/timerSound";
import {
  getTickingEnabled,
  subscribeTicking,
} from "@/app/(tools)/timer/utils/timerTicking";

function getServerTickingEnabled() {
  return false;
}

export default function useTimerAudio(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number
) {
  const ticking = useSyncExternalStore(
    subscribeTicking,
    getTickingEnabled,
    getServerTickingEnabled
  );
  const audio = useRef<AudioContext | null>(null);
  const canPlayAudio = useTimerAudioOwner(snapshot, clockOffset, ticking);
  const hasRunningTask =
    canUseTimer(snapshot) &&
    snapshot.day.tasks.some((task) => task.startedAt !== null);

  useEffect(() => {
    if (!ticking) {
      return () => {
        /* No audio activation listener while ticking is disabled. */
      };
    }
    function resumeAudio() {
      if (audio.current?.state !== "running") {
        audio.current = prepareTaskSound();
      }
    }
    window.addEventListener("pointerdown", resumeAudio);
    window.addEventListener("keydown", resumeAudio);
    return () => {
      window.removeEventListener("pointerdown", resumeAudio);
      window.removeEventListener("keydown", resumeAudio);
    };
  }, [ticking]);

  const tick = useEffectEvent(() => {
    if (!canUseTimer(snapshot)) {
      return 1000;
    }
    const now = Date.now() + clockOffset;
    let remaining = Infinity;
    if (now < timerMidnight(snapshot.today)) {
      for (const task of snapshot.day.tasks) {
        if (task.startedAt === null || task.reachedAt !== null) {
          continue;
        }
        const seconds =
          (task.duration - taskSpent(task, snapshot.today, now)) /
          (task.speed ?? 1);
        if (seconds > 0) {
          remaining = Math.min(remaining, seconds);
        }
      }
    }
    if (canPlayAudio() && ticking && remaining < Infinity) {
      const context = audio.current ?? prepareTaskSound();
      audio.current = context;
      playClockTick(context);
    }
    return 1000;
  });

  useEffect(() => {
    if (!hasRunningTask || !ticking) {
      return () => {
        /* No ticking timeout while idle. */
      };
    }
    let timeout: number;
    const scheduleTick = () => {
      const delay = tick();
      timeout = window.setTimeout(scheduleTick, delay);
    };
    scheduleTick();
    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasRunningTask, ticking]);
}
