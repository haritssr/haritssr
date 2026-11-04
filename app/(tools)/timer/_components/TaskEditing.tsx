import { createContext, useContext } from "react";

import type { TimerState } from "../utils/timerController";
import { useTimer } from "./TimerProvider";

export type TaskEditingState = Pick<
  TimerState,
  "act" | "snapshot" | "drafts" | "clockOffset" | "error"
>;

// Only editing controls read this scope. Playback and runtime scheduling always
// use the page-independent live TimerProvider.
export const TaskEditingContext = createContext<TaskEditingState | null>(null);

export function useTaskEditing(): TaskEditingState {
  const live = useTimer("act", "snapshot", "drafts", "clockOffset", "error");
  return useContext(TaskEditingContext) ?? live;
}
