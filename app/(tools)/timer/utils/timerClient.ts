import type {
  TimerAction,
  TimerPreferences,
  TimerSnapshot,
} from "@/app/(tools)/timer/utils/timer";
import {
  TIMER_REQUEST_STARTED_HEADER,
  TIMER_RESPONSE_TIME_HEADER,
  timerClockOffset,
} from "@/app/(tools)/timer/utils/timerClock";
import type { TimerResponseTiming } from "@/app/(tools)/timer/utils/timerClock";

export const TIMER_SNAPSHOT_KEY = "/api/timer";
export function timerHistoryKey(date: string) {
  return `/api/timer?date=${date}`;
}

export interface ReceivedTimerSnapshot extends TimerSnapshot {
  clockOffset: number;
}

async function fetchTimer(
  url: string,
  options?: RequestInit,
  previous?: TimerSnapshot
) {
  const started = performance.now();
  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    signal: options?.signal ?? AbortSignal.timeout(15_000),
  });
  let result: unknown;
  if (response.status === 304 && previous !== undefined) {
    const now = response.headers.get(TIMER_RESPONSE_TIME_HEADER);
    if (now === null) {
      throw new Error("Couldn't sync. Try again.");
    }
    result = { ...previous, now };
  } else {
    result = await response.json();
  }
  // Schema loading and validation can finish later than the network response.
  const timing: TimerResponseTiming = {
    receivedAt: Date.now(),
    elapsed: performance.now() - started,
    serverReceivedAt: null,
  };
  const serverReceivedAt = response.headers.get(TIMER_REQUEST_STARTED_HEADER);
  if (serverReceivedAt !== null && serverReceivedAt.trim() !== "") {
    timing.serverReceivedAt = Number(serverReceivedAt);
  }
  if (!response.ok && response.status !== 304) {
    const message =
      typeof result === "object" &&
      result !== null &&
      "error" in result &&
      typeof result.error === "string"
        ? result.error
        : "Timer data could not be loaded.";
    throw new Error(message);
  }
  return { data: result, timing, version: response.headers.get("ETag") };
}

async function loadTimer<T>(
  load: (signal: AbortSignal) => Promise<T>
): Promise<T> {
  const controller = new AbortController();
  const deadline = Promise.withResolvers<never>();
  const timeout = setTimeout(() => {
    deadline.reject(new Error("Timer took too long. Try again."));
    controller.abort();
  }, 10_000);
  try {
    return await Promise.race([load(controller.signal), deadline.promise]);
  } finally {
    clearTimeout(timeout);
  }
}

function received(
  snapshot: TimerSnapshot,
  timing: TimerResponseTiming
): ReceivedTimerSnapshot {
  return {
    ...snapshot,
    clockOffset: timerClockOffset(snapshot.now, timing),
  };
}

let snapshotRequest: Promise<ReceivedTimerSnapshot> | undefined;
let snapshotCache: { version: string; snapshot: TimerSnapshot } | undefined;

function rememberSnapshot(snapshot: TimerSnapshot, version: string | null) {
  snapshotCache = version === null ? undefined : { version, snapshot };
}

export async function fetchTimerSnapshot() {
  snapshotRequest ??= loadTimer(async (signal) => {
    const previous = snapshotCache;
    const [{ snapshotSchema }, result] = await Promise.all([
      import("@/app/(tools)/timer/utils/timerValidation"),
      fetchTimer(
        "/api/timer",
        {
          signal,
          headers:
            previous === undefined
              ? undefined
              : { "If-None-Match": previous.version },
        },
        previous?.snapshot
      ),
    ]);
    const snapshot = received(snapshotSchema.parse(result.data), result.timing);
    rememberSnapshot(snapshot, result.version);
    notifyTimerChanges(snapshot, result.version);
    return snapshot;
  });
  const request = snapshotRequest;
  try {
    return await request;
  } catch (error) {
    snapshotCache = undefined;
    throw error;
  } finally {
    if (snapshotRequest === request) {
      snapshotRequest = undefined;
    }
  }
}

export async function fetchTimerHistory(date: string) {
  return await loadTimer(async (signal) => {
    const [{ historySchema }, result] = await Promise.all([
      import("@/app/(tools)/timer/utils/timerValidation"),
      fetchTimer(`/api/timer?date=${date}`, { signal }),
    ]);
    return historySchema.parse(result.data);
  });
}

export async function sendTimerAction(action: TimerAction) {
  const { changeSchema } =
    await import("@/app/(tools)/timer/utils/timerValidation");
  const response = await fetchTimer("/api/timer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  });
  const result = changeSchema.parse(response.data);
  const snapshot = received(result.snapshot, response.timing);
  rememberSnapshot(snapshot, response.version);
  notifyTimerChanges(snapshot, response.version);
  return { ...result, snapshot };
}

export async function saveTimerPreferences(
  patch: Partial<Omit<TimerPreferences, "revision">>
) {
  const { snapshotSchema } =
    await import("@/app/(tools)/timer/utils/timerValidation");
  const response = await fetchTimer("/api/timer", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });
  const result = received(snapshotSchema.parse(response.data), response.timing);
  rememberSnapshot(result, response.version);
  notifyTimerChanges(result, response.version);
  return result;
}

let changeSource: string | undefined;
function timerChangeSource() {
  changeSource ??= crypto.randomUUID();
  return changeSource;
}

function notifyTimerChanges(
  snapshot: ReceivedTimerSnapshot,
  version: string | null
) {
  try {
    if (!("BroadcastChannel" in window)) {
      return;
    }
    const channel = new BroadcastChannel("haritssr-timer");
    const sentAt = Date.now();
    const { clockOffset, ...state } = snapshot;
    // The broadcast timestamp and sentAt must describe the same instant, even
    // when validation or a hidden receiving tab delays delivery.
    const message = {
      source: timerChangeSource(),
      snapshot: {
        ...state,
        now: new Date(sentAt + clockOffset).toISOString(),
      },
      sentAt,
      version,
    };
    // oxlint-disable-next-line unicorn/require-post-message-target-origin -- BroadcastChannel has no targetOrigin parameter.
    channel.postMessage(message);
    channel.close();
  } catch {
    // A blocked messaging API must not turn a committed save into an error.
  }
}

export function subscribeTimerChanges(
  listener: (snapshot?: ReceivedTimerSnapshot) => void
) {
  if (!("BroadcastChannel" in window)) {
    return () => {
      /* Focus and polling remain available. */
    };
  }
  const channel = new BroadcastChannel("haritssr-timer");
  let disposed = false;
  async function receive(data: unknown) {
    if (
      typeof data !== "object" ||
      data === null ||
      !("source" in data) ||
      data.source === timerChangeSource()
    ) {
      return;
    }
    try {
      const { snapshotSchema } =
        await import("@/app/(tools)/timer/utils/timerValidation");
      const result = snapshotSchema.safeParse(
        "snapshot" in data ? data.snapshot : undefined
      );
      // Background tabs may receive a message much later. Preserve the sender's
      // clock calibration instead of treating the delayed snapshot as current.
      const receivedAt =
        "sentAt" in data &&
        typeof data.sentAt === "number" &&
        Number.isFinite(data.sentAt)
          ? data.sentAt
          : Date.now();
      if (!disposed) {
        if (result.success) {
          rememberSnapshot(
            result.data,
            "version" in data && typeof data.version === "string"
              ? data.version
              : null
          );
        }
        listener(
          result.success
            ? received(result.data, {
                receivedAt,
                elapsed: 0,
                serverReceivedAt: null,
              })
            : undefined
        );
      }
    } catch {
      if (!disposed) {
        listener();
      }
    }
  }
  channel.addEventListener("message", (event: MessageEvent<unknown>) => {
    void receive(event.data);
  });
  return () => {
    disposed = true;
    channel.close();
  };
}
