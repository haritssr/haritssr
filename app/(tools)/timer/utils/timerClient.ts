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

type ReadFailure = "network" | "timeout" | "http" | "invalid-response";

export class TimerReadError extends Error {
  readonly retryAt: number;
  readonly category: ReadFailure;
  readonly status: number | undefined;

  constructor(
    message: string,
    category: ReadFailure,
    status?: number,
    retryDelay = 0
  ) {
    super(message);
    this.name = "TimerReadError";
    this.category = category;
    this.status = status;
    this.retryAt = Date.now() + retryDelay;
  }

  get retryable() {
    return (
      this.category === "network" ||
      this.category === "timeout" ||
      (this.category === "http" &&
        (this.status === 408 ||
          this.status === 429 ||
          (this.status ?? 0) >= 500))
    );
  }
}

function timerRetryDelay(error: Error, failures: number) {
  if (!(error instanceof TimerReadError) || !error.retryable) {
    return null;
  }
  return Math.max(
    Math.min(30_000, 5000 * 2 ** Math.min(3, Math.max(0, failures - 1))),
    Math.max(0, error.retryAt - Date.now())
  );
}

// Read recovery is shared by SWR, manual refreshes, and scheduled refreshes.
export function subscribeTimerRecovery(
  failure: Error | null,
  failures: number,
  polling: boolean,
  refresh: () => Promise<unknown>
) {
  const delay = failure === null ? null : timerRetryDelay(failure, failures);
  const retryAt = failure instanceof TimerReadError ? failure.retryAt : 0;
  let timeout = 0;
  function retry() {
    window.clearTimeout(timeout);
    if (
      document.hidden ||
      !navigator.onLine ||
      (failure !== null && delay === null)
    ) {
      return;
    }
    const remaining = retryAt - Date.now();
    if (remaining > 0) {
      timeout = window.setTimeout(retry, remaining);
    } else {
      void refresh();
    }
  }
  function resume() {
    if (document.hidden || !navigator.onLine) {
      window.clearTimeout(timeout);
    } else {
      retry();
    }
  }
  // Only the elected tab retries in the background. Any tab may refresh on return.
  if (delay !== null && polling && !document.hidden && navigator.onLine) {
    timeout = window.setTimeout(retry, delay);
  }
  window.addEventListener("online", resume);
  window.addEventListener("offline", resume);
  window.addEventListener("focus", resume);
  document.addEventListener("visibilitychange", resume);
  return () => {
    window.clearTimeout(timeout);
    window.removeEventListener("online", resume);
    window.removeEventListener("offline", resume);
    window.removeEventListener("focus", resume);
    document.removeEventListener("visibilitychange", resume);
  };
}

function retryAfter(response: Response) {
  const value = response.headers.get("Retry-After");
  if (value === null) {
    return 0;
  }
  const seconds = Number(value);
  const delay = Number.isFinite(seconds)
    ? seconds * 1000
    : Date.parse(value) - Date.now();
  return Number.isFinite(delay) ? Math.max(0, delay) : 0;
}

async function fetchTimer(
  url: string,
  options?: RequestInit,
  previous?: TimerSnapshot
): Promise<{
  data: unknown;
  cachedSnapshot: TimerSnapshot | undefined;
  timing: TimerResponseTiming;
  version: string | null;
}> {
  const started = performance.now();
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      cache: "no-store",
      signal: options?.signal ?? AbortSignal.timeout(15_000),
    });
  } catch (error) {
    if (options?.method !== undefined) {
      throw error;
    }
    throw new TimerReadError("Couldn't sync. Try again.", "network");
  }
  let result: unknown;
  let cachedSnapshot: TimerSnapshot | undefined;
  if (response.status === 304) {
    const now = response.headers.get(TIMER_RESPONSE_TIME_HEADER);
    if (
      previous === undefined ||
      now === null ||
      !Number.isFinite(Date.parse(now))
    ) {
      console.warn("Timer read: invalid 304 response.", {
        status: 304,
        duration: Math.round(performance.now() - started),
      });
      if (previous !== undefined) {
        snapshotCache = undefined;
        // A single full read shares the original deadline and abort signal.
        return await fetchTimer(url, { ...options, headers: undefined });
      }
      throw new TimerReadError(
        "Couldn't sync. Try again.",
        "invalid-response",
        304
      );
    }
    // The cache already passed schema validation; retain its nested identities.
    cachedSnapshot = { ...previous, now };
    result = cachedSnapshot;
  } else {
    // Classify HTTP failures even when a proxy returns HTML instead of JSON.
    result = await response.json().catch(() => {
      // HTTP status remains useful when an intermediary returns a non-JSON body.
    });
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
    throw new TimerReadError(
      message,
      "http",
      response.status,
      retryAfter(response)
    );
  }
  return {
    data: result,
    cachedSnapshot,
    timing,
    version: response.headers.get("ETag"),
  };
}

async function loadTimer<T>(
  load: (signal: AbortSignal) => Promise<T>,
  resource: "snapshot" | "history"
): Promise<T> {
  const started = performance.now();
  const controller = new AbortController();
  const deadline = Promise.withResolvers<never>();
  const timeout = setTimeout(() => {
    deadline.reject(
      new TimerReadError("Timer took too long. Try again.", "timeout")
    );
    controller.abort();
  }, 10_000);
  try {
    const result = await Promise.race([
      load(controller.signal),
      deadline.promise,
    ]);
    const duration = Math.round(performance.now() - started);
    if (duration >= 5000) {
      console.warn("Timer read: slow response.", { resource, duration });
    }
    return result;
  } catch (error) {
    const failure =
      error instanceof TimerReadError
        ? error
        : new TimerReadError(
            "Timer returned invalid data. Try again.",
            "invalid-response"
          );
    console.warn("Timer read failed.", {
      resource,
      category: failure.category,
      status: failure.status,
      duration: Math.round(performance.now() - started),
    });
    throw failure;
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
    if (result.cachedSnapshot !== undefined) {
      // Only the new clock header needs validation on an unchanged response.
      snapshotSchema.shape.now.parse(result.cachedSnapshot.now);
    }
    const snapshot = received(
      result.cachedSnapshot ?? snapshotSchema.parse(result.data),
      result.timing
    );
    rememberSnapshot(snapshot, result.version);
    notifyTimerChanges(snapshot, result.version);
    return snapshot;
  }, "snapshot");
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
  }, "history");
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
