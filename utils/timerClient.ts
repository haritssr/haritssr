import type {
  TimerAction,
  TimerPreferences,
  TimerSnapshot,
} from "@/utils/timer";

export const TIMER_SNAPSHOT_KEY = "/api/timer";
export function timerHistoryKey(date: string) {
  return `/api/timer?date=${date}`;
}

export interface ReceivedTimerSnapshot extends TimerSnapshot {
  clockOffset: number;
}

async function fetchTimer(
  url: string,
  options?: RequestInit
): Promise<unknown> {
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    signal: options?.signal ?? AbortSignal.timeout(15_000),
  });
  const result: unknown = await response.json();
  if (!response.ok) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error
        : "Timer data could not be loaded.";
    throw new Error(message);
  }
  return result;
}

async function loadTimer<T>(
  load: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const deadline = Promise.withResolvers<never>();
  const timeout = setTimeout(() => {
    deadline.reject(new Error("Timer is taking too long to load. Try again."));
    controller.abort();
  }, 10_000);
  try {
    return await Promise.race([load(controller.signal), deadline.promise]);
  } finally {
    clearTimeout(timeout);
  }
}

function received(snapshot: TimerSnapshot): ReceivedTimerSnapshot {
  return {
    ...snapshot,
    clockOffset: Date.parse(snapshot.now) - Date.now(),
  };
}

export async function fetchTimerSnapshot() {
  return await loadTimer(async (signal) => {
    const [{ snapshotSchema }, result] = await Promise.all([
      import("@/utils/timerValidation"),
      fetchTimer("/api/timer", { signal }),
    ]);
    return received(snapshotSchema.parse(result));
  });
}

export async function fetchTimerHistory(date: string) {
  return await loadTimer(async (signal) => {
    const [{ historySchema }, result] = await Promise.all([
      import("@/utils/timerValidation"),
      fetchTimer(`/api/timer?date=${date}`, { signal }),
    ]);
    return historySchema.parse(result);
  });
}

export async function sendTimerAction(action: TimerAction) {
  const { changeSchema } = await import("@/utils/timerValidation");
  const result = changeSchema.parse(
    await fetchTimer("/api/timer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    })
  );
  notifyTimerChanges();
  return { ...result, snapshot: received(result.snapshot) };
}

export async function saveTimerPreferences(
  patch: Partial<Omit<TimerPreferences, "revision">>
) {
  const { snapshotSchema } = await import("@/utils/timerValidation");
  const result = received(
    snapshotSchema.parse(
      await fetchTimer("/api/timer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      })
    )
  );
  notifyTimerChanges();
  return result;
}

let changeSource: string | undefined;
function timerChangeSource() {
  changeSource ??= crypto.randomUUID();
  return changeSource;
}

function notifyTimerChanges() {
  try {
    if (!("BroadcastChannel" in window)) {
      return;
    }
    const channel = new BroadcastChannel("haritssr-timer");
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- BroadcastChannel has no targetOrigin parameter.
    channel.postMessage({ source: timerChangeSource() });
    channel.close();
  } catch {
    // A blocked messaging API must not turn a committed save into an error.
  }
}

export function subscribeTimerChanges(listener: () => void) {
  if (!("BroadcastChannel" in window)) {
    return () => {
      /* Focus and polling remain available. */
    };
  }
  const channel = new BroadcastChannel("haritssr-timer");
  channel.addEventListener("message", (event: MessageEvent<unknown>) => {
    const { data } = event;
    if (
      typeof data !== "object" ||
      data === null ||
      !("source" in data) ||
      data.source !== timerChangeSource()
    ) {
      listener();
    }
  });
  return () => {
    channel.close();
  };
}
