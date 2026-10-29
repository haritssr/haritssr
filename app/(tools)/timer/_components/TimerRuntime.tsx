"use client";

import { useContext, useEffect, useState, useSyncExternalStore } from "react";
import useSWR from "swr";

import FloatingTimerDock from "@/app/(tools)/timer/_components/FloatingTimerDock";
import { TimerContext } from "@/app/(tools)/timer/_components/TimerProvider";
import useTimerAudio from "@/app/(tools)/timer/hooks/useTimerAudio";
import useTimerDeadlineReminders from "@/app/(tools)/timer/hooks/useTimerDeadlineReminders";
import useTimerNotifications from "@/app/(tools)/timer/hooks/useTimerNotifications";
import useTimerPolling from "@/app/(tools)/timer/hooks/useTimerPolling";
import useTimerSchedule from "@/app/(tools)/timer/hooks/useTimerSchedule";
import {
  fetchTimerSnapshot,
  subscribeTimerChanges,
  TIMER_SNAPSHOT_KEY,
} from "@/app/(tools)/timer/utils/timerClient";
import type { ReceivedTimerSnapshot } from "@/app/(tools)/timer/utils/timerClient";
import { createTimerController } from "@/app/(tools)/timer/utils/timerController";
import type { TimerController } from "@/app/(tools)/timer/utils/timerController";

function useTimerRuntime(controller: TimerController) {
  const polling = useTimerPolling();
  const { mutations } = controller;
  const state = useSyncExternalStore(
    mutations.subscribe,
    mutations.getSnapshot,
    mutations.getSnapshot
  );
  const { data, error: loadError } = useSWR<ReceivedTimerSnapshot, Error>(
    TIMER_SNAPSHOT_KEY,
    fetchTimerSnapshot,
    {
      refreshInterval: (snapshot) => {
        const latest = mutations.getSnapshot().confirmed ?? snapshot;
        if (!polling || latest?.mode === "demo") {
          return 0;
        }
        return latest?.day.tasks.some((task) => task.startedAt !== null) ===
          true
          ? 30_000
          : 120_000;
      },
      refreshWhenHidden: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
      errorRetryInterval: 5000,
    }
  );
  useEffect(() => {
    if (data !== undefined) {
      mutations.receive(data);
    }
  }, [data, mutations]);
  useEffect(() => {
    if (loadError !== undefined) {
      mutations.loadFailed(loadError);
    }
  }, [loadError, mutations]);
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
