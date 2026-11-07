import { TimerReadError } from "@/app/(tools)/timer/utils/timerClient";

type TimerConnection = "loading" | "ready" | "reconnecting" | "failed";

/**
 * Where the Timer's connection to the server stands. A first load that has not
 * finished is loading; a few retryable read failures after a good load are
 * reconnecting; any other read failure is failed.
 */
export function timerConnection(state: {
  error: string | null;
  confirmed: object | undefined;
  loadFailure: Error | null;
  loadFailures: number;
}): TimerConnection {
  const { loadFailure } = state;
  if (loadFailure === null) {
    return state.confirmed === undefined ? "loading" : "ready";
  }
  return state.error === null &&
    state.confirmed !== undefined &&
    loadFailure instanceof TimerReadError &&
    state.loadFailures < 3 &&
    loadFailure.retryable
    ? "reconnecting"
    : "failed";
}
