"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import useSWR from "swr";

import { DEFAULT_DURATION_PRESETS, DEFAULT_TASK_PRESETS } from "@/utils/timer";
import type { TimerTaskPreset } from "@/utils/timer";
import {
  fetchTimerSnapshot,
  saveTimerPreferences,
  sendTimerAction,
  subscribeTimerChanges,
  TIMER_SNAPSHOT_KEY,
} from "@/utils/timerClient";
import type { ReceivedTimerSnapshot } from "@/utils/timerClient";
import { TimerMutations } from "@/utils/timerMutations";

import FloatingTimerDock from "./FloatingTimerDock";
import { TimerContext } from "./TimerProvider";
import useTimerNotifications from "./useTimerNotifications";
import useTimerSchedule from "./useTimerSchedule";

function useTimerState() {
  // oxlint-disable-next-line react/hook-use-state -- One stable external store per provider; no setter is needed.
  const [mutations] = useState(
    () =>
      new TimerMutations({
        action: async (action) => {
          const result = await sendTimerAction(action);
          return result.snapshot;
        },
        preferences: saveTimerPreferences,
        refresh: fetchTimerSnapshot,
      })
  );
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
        if (snapshot?.mode === "demo") {
          return 0;
        }
        return snapshot?.day.tasks.some((task) => task.startedAt !== null) ===
          true
          ? 15_000
          : 60_000;
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
      return subscribeTimerChanges(() => {
        void mutations.refresh();
      });
    } catch {
      return () => {
        // Polling and focus remain available.
      };
    }
  }, [mutations]);
  const { snapshot, confirmed, pendingCount, drafts } = state;
  const autoplay = snapshot?.preferences?.autoplay ?? false;
  const multitask = snapshot?.preferences?.multitask ?? false;
  const notificationsEnabled =
    snapshot?.preferences?.notificationsEnabled ?? true;
  const clockOffset = snapshot?.clockOffset ?? 0;
  const { tickingEnabled, setTickingEnabled } = useTimerSchedule(
    snapshot,
    clockOffset,
    mutations.refresh
  );
  const { completion, setCompletion } = useTimerNotifications({
    snapshot: confirmed,
    publish: mutations.receive,
    autoplay: confirmed?.preferences?.autoplay ?? false,
    notificationsEnabled: confirmed?.preferences?.notificationsEnabled ?? true,
  });
  return useMemo(
    () => ({
      completion,
      dismissCompletion: () => {
        setCompletion(null);
      },
      snapshot,
      pendingCount,
      drafts,
      clockOffset,
      autoplay,
      multitask,
      notificationsEnabled,
      durationPresets:
        snapshot?.preferences?.durationPresets ?? DEFAULT_DURATION_PRESETS,
      taskPresets: snapshot?.preferences?.taskPresets ?? DEFAULT_TASK_PRESETS,
      setDurationPresets: async (durationPresets: number[]) =>
        await mutations.preferences({ durationPresets }),
      setTaskPresets: async (taskPresets: TimerTaskPreset[]) =>
        await mutations.preferences({ taskPresets }),
      setAutoplay: async (enabled: boolean) =>
        await mutations.preferences({ autoplay: enabled }),
      setMultitask: async (enabled: boolean) =>
        await mutations.preferences({ multitask: enabled }),
      setNotificationsEnabled: async (enabled: boolean) =>
        await mutations.preferences({ notificationsEnabled: enabled }),
      tickingEnabled,
      setTickingEnabled,
      act: mutations.act,
      refresh: mutations.refresh,
      error: state.error ?? state.loadError,
    }),
    [
      completion,
      setCompletion,
      snapshot,
      pendingCount,
      drafts,
      clockOffset,
      autoplay,
      multitask,
      notificationsEnabled,
      tickingEnabled,
      setTickingEnabled,
      mutations,
      state.error,
      state.loadError,
    ]
  );
}

export type TimerState = ReturnType<typeof useTimerState>;

export default function TimerRuntime({
  onStateChange,
}: {
  onStateChange: (state: TimerState) => void;
}) {
  const value = useTimerState();
  useEffect(() => {
    onStateChange(value);
  }, [onStateChange, value]);
  return (
    <TimerContext value={value}>
      <FloatingTimerDock />
    </TimerContext>
  );
}
