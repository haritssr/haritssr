import { useCallback, useEffect, useRef } from "react";

import { canUseTimer, taskCompletionTime, timerMidnight } from "@/utils/timer";
import type { TimerSnapshot } from "@/utils/timer";

// Coordinate continuous audio only; explicit actions sound in the clicked tab,
// and completion feedback is protected by the database's atomic notice claim.
export default function useTimerAudioOwner(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number,
  ticking: boolean
) {
  const owner = useRef(false);
  const fallback = useRef(false);
  useEffect(() => {
    if (snapshot?.mode !== "turso" || !("locks" in navigator)) {
      return () => {
        /* Local timers need no browser audio election. */
      };
    }
    let controller: AbortController | undefined;
    let release: (() => void) | undefined;
    let timeout: number | undefined;
    function stop() {
      owner.current = false;
      controller?.abort();
      release?.();
      window.clearTimeout(timeout);
    }
    function start() {
      stop();
      fallback.current = false;
      if (!canUseTimer(snapshot)) {
        return;
      }
      const now = Date.now() + clockOffset;
      const finishes = snapshot.day.tasks
        .map(taskCompletionTime)
        .filter((time) => time > now && time <= timerMidnight(snapshot.today));
      const hasRunning = snapshot.day.tasks.some(
        (task) => task.startedAt !== null
      );
      if (!hasRunning || now >= timerMidnight(snapshot.today)) {
        return;
      }
      const wait = ticking
        ? 0
        : Math.max(0, Math.min(...finishes) - now - 10_000);
      if (!Number.isFinite(wait)) {
        return;
      }
      controller = new AbortController();
      const { signal } = controller;
      timeout = window.setTimeout(() => {
        void acquire(signal);
      }, wait);
    }
    async function acquire(signal: AbortSignal) {
      try {
        await navigator.locks.request(
          "haritssr-timer-audio",
          { signal },
          async () => {
            owner.current = true;
            // oxlint-disable-next-line promise/avoid-new -- Web Locks holds ownership until this promise is released.
            await new Promise<void>((resolve) => {
              release = resolve;
            });
          }
        );
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          fallback.current = true;
        }
      }
    }
    start();
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", start);
    return () => {
      stop();
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", start);
    };
  }, [snapshot, clockOffset, ticking]);

  return useCallback(() => {
    if (snapshot?.mode !== "turso") {
      return true;
    }
    if (!("locks" in navigator) || fallback.current) {
      return document.visibilityState === "visible" && document.hasFocus();
    }
    return owner.current;
  }, [snapshot?.mode]);
}
