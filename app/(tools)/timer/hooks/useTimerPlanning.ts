import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { useTimerSession } from "@/utils/timerSession";

import type { TaskEditingState } from "../_components/TaskEditing";
import { useTimer } from "../_components/TimerProvider";
import type { TimerDay } from "../utils/timer";
import { timerPlanSnapshot } from "../utils/timerClient";
import { createTimerPlanner } from "../utils/timerPlanning";

const empty = () => null;
const subscribeEmpty = () => () => {
  /* No planner while browsing today or history. */
};

export default function useTimerPlanning(
  day: TimerDay | undefined,
  enabled: boolean
): TaskEditingState | null {
  const { snapshot } = useTimer("snapshot");
  const session = useTimerSession();
  const owner = session.data?.account?.email;
  // oxlint-disable-next-line react/hook-use-state -- One stable in-memory registry retains drafts across selected dates.
  const [planners] = useState(
    () => new Map<string, ReturnType<typeof createTimerPlanner>>()
  );
  const planner = useMemo(() => {
    if (
      !enabled ||
      day === undefined ||
      snapshot?.mode !== "turso" ||
      owner === undefined ||
      owner.length === 0 ||
      session.error !== undefined
    ) {
      return null;
    }
    const key = `${owner}:${day.date}`;
    let selected = planners.get(key);
    if (selected === undefined) {
      selected = createTimerPlanner(day, snapshot);
      planners.set(key, selected);
    }
    return selected;
  }, [day, enabled, owner, planners, session.error, snapshot]);
  useEffect(() => {
    for (const [key, store] of planners) {
      if (
        owner === undefined ||
        !key.startsWith(`${owner}:`) ||
        snapshot?.mode !== "turso"
      ) {
        store.disable();
        planners.delete(key);
      }
    }
  }, [owner, planners, snapshot?.mode]);
  useEffect(() => {
    if (planner && day && snapshot?.mode === "turso") {
      planner.mutations.receive(timerPlanSnapshot(day, snapshot));
    }
  }, [day, planner, snapshot]);
  const state = useSyncExternalStore(
    planner?.mutations.subscribe ?? subscribeEmpty,
    planner?.mutations.getSnapshot ?? empty,
    planner?.mutations.getSnapshot ?? empty
  );
  if (planner === null || state === null) {
    return null;
  }
  return {
    snapshot: state.snapshot,
    drafts: state.drafts,
    clockOffset: state.snapshot?.clockOffset ?? 0,
    error: state.error ?? state.loadError,
    act: planner.mutations.act,
  };
}
