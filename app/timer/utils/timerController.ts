import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
} from "@/app/timer/utils/timer";
import type { TimerTaskPreset } from "@/app/timer/utils/timer";
import {
  fetchTimerSnapshot,
  saveTimerPreferences,
  sendTimerAction,
} from "@/app/timer/utils/timerClient";
import { TimerMutations } from "@/app/timer/utils/timerMutations";

// Created only by the deferred runtime. Context shares this identity, not updates.
export function createTimerController() {
  const mutations = new TimerMutations({
    action: async (action) => {
      const result = await sendTimerAction(action);
      return result.snapshot;
    },
    preferences: saveTimerPreferences,
    refresh: fetchTimerSnapshot,
  });
  const actions = {
    act: mutations.act,
    refresh: mutations.refresh,
    setDurationPresets: async (durationPresets: number[]) =>
      await mutations.preferences({ durationPresets }),
    setTaskPresets: async (taskPresets: TimerTaskPreset[]) =>
      await mutations.preferences({ taskPresets }),
    setAutoplay: async (autoplay: boolean) =>
      await mutations.preferences({ autoplay }),
    setMultitask: async (multitask: boolean) =>
      await mutations.preferences({ multitask }),
    setNotificationsEnabled: async (notificationsEnabled: boolean) =>
      await mutations.preferences({ notificationsEnabled }),
  };
  function read() {
    const state = mutations.getSnapshot();
    const { snapshot } = state;
    return {
      snapshot,
      pendingCount: state.pendingCount,
      drafts: state.drafts,
      clockOffset: snapshot?.clockOffset ?? 0,
      autoplay: snapshot?.preferences?.autoplay ?? false,
      multitask: snapshot?.preferences?.multitask ?? false,
      notificationsEnabled: snapshot?.preferences?.notificationsEnabled ?? true,
      durationPresets:
        snapshot?.preferences?.durationPresets ?? DEFAULT_DURATION_PRESETS,
      taskPresets: snapshot?.preferences?.taskPresets ?? DEFAULT_TASK_PRESETS,
      error: state.error ?? state.loadError,
      ...actions,
    };
  }
  type State = ReturnType<typeof read>;
  function select<K extends keyof State>(keys: K[]) {
    let selected: Pick<State, K> | undefined;
    return () => {
      const next = read();
      if (
        selected === undefined ||
        keys.some((key) => !Object.is(selected?.[key], next[key]))
      ) {
        selected = next;
      }
      return selected;
    };
  }
  return { mutations, subscribe: mutations.subscribe, select };
}

export type TimerController = ReturnType<typeof createTimerController>;
export type TimerState = ReturnType<ReturnType<TimerController["select"]>>;
