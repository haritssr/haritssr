import type { TimerDay } from "./timer";
import { isTimerPlanningAction } from "./timer";
import {
  fetchTimerCalendar,
  sendTimerPlanAction,
  timerPlanSnapshot,
} from "./timerClient";
import type { ReceivedTimerSnapshot } from "./timerClient";
import { TimerMutations } from "./timerMutations";

// A separate ordered writer retains drafts and uncertain-write recovery, without
// ever publishing a future day to the live runtime or its automatic scheduler.
export function createTimerPlanner(day: TimerDay, live: ReceivedTimerSnapshot) {
  let allowed = true;
  const mutations = new TimerMutations({
    action: async (action) => {
      if (
        !allowed ||
        action.date !== day.date ||
        !isTimerPlanningAction(action)
      ) {
        throw new Error("Planning is unavailable for this task date.");
      }
      return await sendTimerPlanAction(action);
    },
    preferences: () => {
      throw new Error("Use Settings to change daily definitions.");
    },
    refresh: async () => {
      const calendar = await fetchTimerCalendar(day.date.slice(0, 7));
      const selected = calendar.days.find((entry) => entry.date === day.date);
      if (!allowed || calendar.mode !== "turso" || selected === undefined) {
        throw new Error("Sign in to refresh this task plan.");
      }
      return timerPlanSnapshot(selected, {
        ...live,
        today: calendar.today,
        now: new Date(Date.now() + live.clockOffset).toISOString(),
      });
    },
  });
  mutations.receive(timerPlanSnapshot(day, live));
  return {
    mutations,
    disable() {
      allowed = false;
      const current = mutations.getSnapshot().confirmed;
      if (current) {
        mutations.receive({ ...current, mode: "demo" });
      }
    },
  };
}
