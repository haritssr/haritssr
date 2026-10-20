"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import useSWR from "swr";

import { taskSpent, timerMidnight } from "@/utils/timer";
import type { TimerAction, TimerNotice, TimerSnapshot } from "@/utils/timer";
import {
  playClockTick,
  playTaskSound,
  prepareTaskSound,
} from "@/utils/timerSound";

interface TimerContextValue {
  snapshot: TimerSnapshot | undefined;
  error: string | null;
  busy: boolean;
  clockOffset: number;
  autoplay: boolean;
  setAutoplay: (enabled: boolean) => void;
  tickingEnabled: boolean;
  setTickingEnabled: (enabled: boolean) => void;
  multitask: boolean;
  setMultitask: (enabled: boolean) => Promise<boolean>;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  act: (action: TimerAction) => Promise<boolean>;
  refresh: () => Promise<unknown>;
}

interface ReceivedSnapshot extends TimerSnapshot {
  clockOffset: number;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export async function fetchTimer(
  url: string,
  options?: RequestInit
): Promise<unknown> {
  const response = await fetch(url, { ...options, cache: "no-store" });
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

function received(snapshot: TimerSnapshot): ReceivedSnapshot {
  return { ...snapshot, clockOffset: Date.parse(snapshot.now) - Date.now() };
}

async function fetchSnapshot(url: string) {
  const { snapshotSchema } = await import("@/utils/timerValidation");
  return received(snapshotSchema.parse(await fetchTimer(url)));
}

async function sendAction(
  action: TimerAction
): Promise<{ snapshot: ReceivedSnapshot; notification: TimerNotice | null }> {
  const { changeSchema } = await import("@/utils/timerValidation");
  const result = changeSchema.parse(
    await fetchTimer("/api/timer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    })
  );
  return { ...result, snapshot: received(result.snapshot) };
}

async function showCompletion(notice: TimerNotice) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  const options = {
    body: `${notice.activity} is done.`,
    tag: `timer-${notice.date}-${notice.taskId}`,
    icon: "/favicon-32x32.png",
    data: { url: "/timer" },
  };
  try {
    // Registration is opt-in for the local timer; the site's normal registration stays unchanged.
    if ("serviceWorker" in navigator) {
      const registration =
        (await navigator.serviceWorker.getRegistration("/")) ??
        (await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        }));
      if (registration.active === null) {
        await navigator.serviceWorker.ready;
      }
      await registration.showNotification("Duration reached", options);
      return;
    }
    const notification = new Notification("Duration reached", options);
    notification.addEventListener("click", () => {
      window.focus();
      window.location.assign("/timer");
    });
  } catch {
    // The visible completion message is always available when system notifications fail.
  }
}

export default function TimerProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  if (!enabled && (pathname === "/timer" || pathname.startsWith("/timer/"))) {
    setEnabled(true);
  }
  const [busy, setBusy] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [ticking, setTicking] = useState(false);
  const tickingAudio = useRef<AudioContext | null>(null);
  const [multitaskEnabled, setMultitaskEnabled] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [completion, setCompletion] = useState<string | null>(null);
  const actionPending = useRef(false);
  const claiming = useRef(new Set<string>());
  const {
    data,
    error: loadError,
    mutate,
  } = useSWR<ReceivedSnapshot, Error>(
    enabled ? "/api/timer" : null,
    fetchSnapshot,
    {
      refreshInterval: 15_000,
      refreshWhenHidden: true,
      shouldRetryOnError: false,
    }
  );

  const clockOffset = data?.clockOffset ?? 0;
  const setTickingEnabled = useCallback((next: boolean) => {
    if (next) {
      tickingAudio.current = prepareTaskSound();
    }
    setTicking(next);
  }, []);
  const hasRunningTask =
    data?.mode === "local" &&
    data.day.tasks.some((task) => task.startedAt !== null);
  const tick = useEffectEvent((alternate: boolean) => {
    if (data?.mode !== "local") {
      return 1000;
    }
    const now = Date.now() + clockOffset;
    let remaining = Infinity;
    if (now < timerMidnight(data.today)) {
      for (const task of data.day.tasks) {
        if (task.startedAt === null || task.reachedAt !== null) {
          continue;
        }
        const seconds =
          (task.duration - taskSpent(task, data.today, now)) /
          (task.speed ?? 1);
        if (seconds > 0) {
          remaining = Math.min(remaining, seconds);
        }
      }
    }
    const urgent = remaining <= 10;
    if (urgent || (ticking && remaining < Infinity)) {
      const context = tickingAudio.current ?? prepareTaskSound();
      tickingAudio.current = context;
      playClockTick(context, alternate, urgent);
    }
    if (remaining <= 3) {
      return 250;
    }
    return remaining <= 6 ? 500 : 1000;
  });
  useEffect(() => {
    if (!hasRunningTask) {
      return () => {
        /* No ticking interval while idle. */
      };
    }
    let alternate = false;
    let timeout: number;
    const scheduleTick = () => {
      const delay = tick(alternate);
      alternate = !alternate;
      timeout = window.setTimeout(scheduleTick, delay);
    };
    scheduleTick();
    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasRunningTask]);
  const refresh = useCallback(async () => await mutate(), [mutate]);
  const publish = useCallback(
    async (next: ReceivedSnapshot) => {
      await mutate(
        (current) => {
          if (
            current !== undefined &&
            (current.today > next.today ||
              (current.today === next.today &&
                current.day.revision > next.day.revision))
          ) {
            return current;
          }
          return next;
        },
        { revalidate: false }
      );
    },
    [mutate]
  );

  const act = useCallback(
    async (action: TimerAction) => {
      if (actionPending.current) {
        return false;
      }
      actionPending.current = true;
      setBusy(true);
      setActionError(null);
      let saved = false;
      try {
        let command = action;
        if (action.action === "start") {
          command = { ...action, multitask: multitaskEnabled };
        } else if (action.action === "done") {
          command = { ...action, autoplay };
        }
        const result = await sendAction(command);
        await publish(result.snapshot);
        saved = true;
      } catch (error) {
        setActionError(
          error instanceof Error
            ? error.message
            : "The activity could not be saved."
        );
        void refresh();
      }
      actionPending.current = false;
      setBusy(false);
      return saved;
    },
    [publish, refresh, autoplay, multitaskEnabled]
  );

  const setMultitask = useCallback(
    async (next: boolean) => {
      if (actionPending.current || data?.mode !== "local") {
        return false;
      }
      const running = data.day.tasks.filter((task) => task.startedAt !== null);
      if (!next && running.length > 1) {
        const saved = await act({ action: "single-task", date: data.today });
        if (!saved) {
          return false;
        }
      }
      setMultitaskEnabled(next);
      return true;
    },
    [act, data]
  );

  useEffect(() => {
    if (data === undefined || data.mode === "demo") {
      return () => {
        /* No scheduled work in the read-only preview. */
      };
    }
    const midnight = timerMidnight(data.today);
    let finish = midnight;
    for (const task of data.day.tasks) {
      if (task.startedAt === null) {
        continue;
      }
      finish = Math.min(
        finish,
        Date.parse(task.startedAt) +
          ((task.duration - task.spent) / (task.speed ?? 1)) * 1000
      );
    }
    const timeout = window.setTimeout(
      () => {
        void refresh();
      },
      Math.max(100, finish - Date.now() - clockOffset + 50)
    );
    return () => {
      window.clearTimeout(timeout);
    };
  }, [data, clockOffset, refresh]);

  useEffect(() => {
    if (data?.mode !== "local") {
      return;
    }
    for (const notice of data.notifications) {
      const key = `${notice.date}/${notice.taskId}`;
      if (claiming.current.has(key)) {
        continue;
      }
      claiming.current.add(key);
      void sendAction({
        action: "acknowledge",
        autoplay,
        date: notice.date,
        taskId: notice.taskId,
      })
        .then(async (result) => {
          await publish(result.snapshot);
          if (result.notification !== null) {
            setCompletion(result.notification.activity);
            playTaskSound(prepareTaskSound(), "reached");
            if (notificationsEnabled) {
              await showCompletion(result.notification);
            }
          }
        })
        .catch(() => {
          /* The next refresh will retry an unclaimed completion. */
        })
        .finally(() => {
          claiming.current.delete(key);
        });
    }
  }, [data, publish, notificationsEnabled, autoplay]);

  const value = useMemo(
    () => ({
      snapshot: data,
      busy,
      clockOffset,
      notificationsEnabled,
      setNotificationsEnabled,
      autoplay,
      setAutoplay,
      tickingEnabled: ticking,
      setTickingEnabled,
      multitask: multitaskEnabled,
      setMultitask,
      act,
      refresh,
      error:
        actionError ?? (loadError instanceof Error ? loadError.message : null),
    }),
    [
      data,
      busy,
      clockOffset,
      notificationsEnabled,
      autoplay,
      ticking,
      setTickingEnabled,
      multitaskEnabled,
      setMultitask,
      act,
      refresh,
      actionError,
      loadError,
    ]
  );

  return (
    <TimerContext value={value}>
      {children}
      {completion === null ? null : (
        <div className="border-border bg-background shadow-floating fixed right-4 bottom-20 left-4 z-50 flex items-center justify-between gap-2 rounded-xl border py-2 pr-2.5 pl-5 sm:bottom-6 sm:left-auto sm:max-w-sm">
          <output>
            <strong className="font-semibold">{completion}</strong> is done
          </output>
          <button
            aria-label="Dismiss completion message"
            className="bg-foreground/5 text-muted hover:bg-foreground/15 hover:text-foreground focus-visible:outline-action inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            onClick={() => {
              setCompletion(null);
            }}
            type="button"
          >
            <XMarkIcon aria-hidden="true" className="size-5 stroke-3" />
          </button>
        </div>
      )}
    </TimerContext>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === null) {
    throw new Error("Timer controls require TimerProvider.");
  }
  return context;
}
