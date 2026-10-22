import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useSyncExternalStore,
} from "react";

import {
  canUseTimer,
  taskCompletionTime,
  taskSpent,
  timerMidnight,
} from "@/utils/timer";
import type { TimerSnapshot } from "@/utils/timer";
import { playClockTick, prepareTaskSound } from "@/utils/timerSound";
import {
  getTickingEnabled,
  setTickingEnabled as saveTickingEnabled,
  subscribeTicking,
} from "@/utils/timerTicking";

import useTimerAudioOwner from "./useTimerAudioOwner";

function getServerTickingEnabled() {
  return false;
}

export default function useTimerSchedule(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  refresh: () => Promise<unknown>
) {
  const ticking = useSyncExternalStore(
    subscribeTicking,
    getTickingEnabled,
    getServerTickingEnabled
  );
  const audio = useRef<AudioContext | null>(null);
  const canPlayAudio = useTimerAudioOwner(snapshot, clockOffset, ticking);
  const setTickingEnabled = useCallback((enabled: boolean) => {
    if (enabled) {
      audio.current = prepareTaskSound();
    }
    saveTickingEnabled(enabled);
  }, []);
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
    const urgent = remaining <= 10;
    if (canPlayAudio() && (urgent || (ticking && remaining < Infinity))) {
      const context = audio.current ?? prepareTaskSound();
      audio.current = context;
      playClockTick(context);
    }
    if (remaining <= 3) {
      return 250;
    }
    return remaining <= 6 ? 500 : 1000;
  });

  useEffect(() => {
    if (!hasRunningTask) {
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
  }, [hasRunningTask]);

  useEffect(() => {
    if (!canUseTimer(snapshot)) {
      return () => {
        /* No scheduled work in the read-only preview. */
      };
    }
    let finish = timerMidnight(snapshot.today);
    for (const task of snapshot.day.tasks) {
      finish = Math.min(finish, taskCompletionTime(task));
    }
    const timeout = window.setTimeout(
      () => {
        void refresh();
      },
      Math.max(100, finish - Date.now() - clockOffset + 50)
    );
    return () => {
      window.clearTimeout(timeout);
    };
  }, [snapshot, clockOffset, refresh]);

  return { tickingEnabled: ticking, setTickingEnabled };
}
