import {
  DEFAULT_DURATION_PRESETS,
  DEFAULT_TASK_PRESETS,
} from "@/app/(tools)/timer/utils/timer";
import type { TimerTaskPreset } from "@/app/(tools)/timer/utils/timer";
import {
  fetchTimerSnapshot,
  saveTimerPreferences,
  sendTimerAction,
} from "@/app/(tools)/timer/utils/timerClient";
import { TimerMutations } from "@/app/(tools)/timer/utils/timerMutations";

import { DEFAULT_DAILY_TASKS } from "./dailyTasks";
import type { DailyTaskDefinition } from "./dailyTasks";

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
    setDailyTasks: async (dailyTasks: DailyTaskDefinition[]) =>
      await mutations.preferences({ dailyTasks }),
    setAutoplay: async (autoplay: boolean) =>
      await mutations.preferences({ autoplay }),
    setMultitask: async (multitask: boolean) =>
      await mutations.preferences({ multitask }),
    setNotificationsEnabled: async (notificationsEnabled: boolean) =>
      await mutations.preferences({ notificationsEnabled }),
  };
  const defaultPreferences = {
    autoplay: false,
    multitask: false,
    notificationsEnabled: true,
    durationPresets: DEFAULT_DURATION_PRESETS,
    taskPresets: DEFAULT_TASK_PRESETS,
    dailyTasks: DEFAULT_DAILY_TASKS,
  };
  function read() {
    const state = mutations.getSnapshot();
    const { snapshot } = state;
    const preferences = snapshot?.preferences ?? defaultPreferences;
    return {
      snapshot,
      pendingCount: state.pendingCount,
      drafts: state.drafts,
      clockOffset: snapshot?.clockOffset ?? 0,
      autoplay: preferences.autoplay,
      multitask: preferences.multitask,
      notificationsEnabled: preferences.notificationsEnabled,
      durationPresets: preferences.durationPresets,
      taskPresets: preferences.taskPresets,
      dailyTasks: preferences.dailyTasks,
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
