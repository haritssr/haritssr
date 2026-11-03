"use client";

import { usePathname } from "next/navigation";
import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import useSWR, { useSWRConfig } from "swr";

import FloatingTimerDock from "@/app/(tools)/timer/_components/FloatingTimerDock";
import { getTaskCollection } from "@/app/(tools)/timer/_components/taskState";
import { TimerContext } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerAudio from "@/app/(tools)/timer/hooks/useTimerAudio";
import useTimerDeadlineReminders from "@/app/(tools)/timer/hooks/useTimerDeadlineReminders";
import useTimerNotifications from "@/app/(tools)/timer/hooks/useTimerNotifications";
import useTimerPolling from "@/app/(tools)/timer/hooks/useTimerPolling";
import useTimerSchedule from "@/app/(tools)/timer/hooks/useTimerSchedule";
import { formatTimerTime } from "@/app/(tools)/timer/utils/timer";
import type { TimerSnapshot } from "@/app/(tools)/timer/utils/timer";
import {
  fetchTimerSnapshot,
  subscribeTimerChanges,
  TIMER_SNAPSHOT_KEY,
  subscribeTimerRecovery,
} from "@/app/(tools)/timer/utils/timerClient";
import type { ReceivedTimerSnapshot } from "@/app/(tools)/timer/utils/timerClient";
import { createTimerController } from "@/app/(tools)/timer/utils/timerController";
import type { TimerController } from "@/app/(tools)/timer/utils/timerController";

const titleSegmenter = new Intl.Segmenter(undefined, {
  granularity: "grapheme",
});

function useTimerPageTitle(
  snapshot: TimerSnapshot | undefined,
  clockOffset: number
) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/timer" || snapshot === undefined) {
      return () => {
        // The title is managed only on the Timer page.
      };
    }

    const { day, now: snapshotNow } = snapshot;
    let pageTitle = document.title;
    let timerTitle: string | null = null;
    let timeout = 0;
    function tick() {
      window.clearTimeout(timeout);
      if (window.location.pathname !== "/timer") {
        return;
      }
      const now = Math.max(
        Date.now() + clockOffset,
        Date.parse(snapshotNow) || 0
      );
      const [running] = getTaskCollection(day.tasks, day.date, now)
        .active.filter(({ state }) => state.running)
        .toSorted(
          (a, b) =>
            a.task.duration - a.state.spent - (b.task.duration - b.state.spent)
        );
      if (running !== undefined) {
        const characters = [
          ...titleSegmenter.segment(running.task.activity),
        ].map(({ segment }) => segment);
        const name =
          characters.length > 10
            ? `${characters.slice(0, 9).join("")}…`
            : running.task.activity;
        timerTitle = `${name} – ${formatTimerTime(running.task.duration - running.state.spent)}`;
        if (document.title !== timerTitle) {
          document.title = timerTitle;
        }
        timeout = window.setTimeout(tick, Math.max(1, 1000 - (now % 1000)));
      } else if (timerTitle !== null) {
        if (document.title === timerTitle) {
          document.title = pageTitle;
        }
        timerTitle = null;
      }
    }
    const observer = new MutationObserver(() => {
      if (
        window.location.pathname === "/timer" &&
        document.title !== timerTitle
      ) {
        pageTitle = document.title;
        if (timerTitle !== null) {
          document.title = timerTitle;
        }
      }
    });
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    document.addEventListener("visibilitychange", tick);
    window.addEventListener("focus", tick);
    tick();
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", tick);
      window.removeEventListener("focus", tick);
      if (timerTitle !== null && document.title === timerTitle) {
        document.title = pageTitle;
      }
    };
  }, [pathname, snapshot, clockOffset]);
}

function useTimerRuntime(controller: TimerController) {
  const polling = useTimerPolling();
  const { mutations } = controller;
  const { mutate } = useSWRConfig();
  const state = useSyncExternalStore(
    mutations.subscribe,
    mutations.getSnapshot,
    mutations.getSnapshot
  );
  useSWR<ReceivedTimerSnapshot, Error>(TIMER_SNAPSHOT_KEY, fetchTimerSnapshot, {
    refreshInterval: (snapshot) => {
      const latest = mutations.getSnapshot().confirmed ?? snapshot;
      if (
        !polling ||
        latest?.mode === "demo" ||
        mutations.getSnapshot().loadFailure !== null
      ) {
        return 0;
      }
      return latest?.day.tasks.some((task) => task.startedAt !== null) === true
        ? 30_000
        : 120_000;
    },
    refreshWhenHidden: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    // The shared controller schedules recovery for every read entry point.
    shouldRetryOnError: false,
    onSuccess: mutations.receive,
    onError: mutations.loadFailed,
  });
  useEffect(() => {
    if (state.confirmed !== undefined) {
      // Manual reads, saves and broadcasts must also clear SWR's polling error.
      void mutate(TIMER_SNAPSHOT_KEY, state.confirmed, { revalidate: false });
    }
  }, [mutate, state.confirmed]);
  useEffect(
    () =>
      subscribeTimerRecovery(
        state.loadFailure,
        state.loadFailures,
        polling,
        mutations.refresh
      ),
    [mutations, polling, state.loadFailure, state.loadFailures]
  );
  useEffect(() => {
    try {
      return subscribeTimerChanges((snapshot) => {
        if (snapshot === undefined) {
          void mutations.refresh();
        } else {
          mutations.receive(snapshot);
        }
      });
    } catch {
      return () => {
        // Polling and focus remain available.
      };
    }
  }, [mutations]);
  const { snapshot, confirmed } = state;
  const clockOffset = snapshot?.clockOffset ?? 0;
  useTimerPageTitle(snapshot, clockOffset);
  useTimerAudio(snapshot, clockOffset);
  const previewCompletion = useTimerNotifications({
    snapshot: confirmed,
    publish: mutations.receive,
    autoplay: confirmed?.preferences?.autoplay ?? false,
    notificationsEnabled: confirmed?.preferences?.notificationsEnabled ?? true,
  });
  useTimerSchedule(snapshot, clockOffset, mutations.refresh, previewCompletion);
  useTimerDeadlineReminders({
    snapshot: confirmed,
    pending: state.pendingCount > 0,
    controller,
  });
}

export default function TimerRuntime({
  onReady,
}: {
  onReady: (controller: TimerController) => void;
}) {
  // oxlint-disable-next-line react/hook-use-state -- One stable controller for the lifetime of the deferred runtime.
  const [controller] = useState(createTimerController);
  const shared = useContext(TimerContext);
  useEffect(() => {
    onReady(controller);
  }, [onReady, controller]);
  return (
    <>
      <TimerEffects controller={controller} />
      {shared === controller ? <FloatingTimerDock /> : null}
    </>
  );
}

function TimerEffects({ controller }: { controller: TimerController }) {
  useTimerRuntime(controller);
  return null;
}
