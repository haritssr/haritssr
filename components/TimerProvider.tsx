"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import useSWR from "swr";

import { timerMidnight } from "@/utils/timer";
import type { TimerAction, TimerNotice, TimerSnapshot } from "@/utils/timer";
import { playTaskSound, prepareTaskSound } from "@/utils/timerSound";

interface TimerContextValue {
  snapshot: TimerSnapshot | undefined;
  error: string | null;
  busy: boolean;
  clockOffset: number;
  autoplay: boolean;
  setAutoplay: (enabled: boolean) => void;
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
        const result = await sendAction(
          action.action === "done" ? { ...action, autoplay } : action
        );
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
    [publish, refresh, autoplay]
  );

  useEffect(() => {
    if (data === undefined || data.mode === "demo") {
      return () => {
        /* No scheduled work in the read-only preview. */
      };
    }
    const running = data.day.tasks.find((task) => task.startedAt !== null);
    const midnight = timerMidnight(data.today);
    const finish =
      running?.startedAt === null || running?.startedAt === undefined
        ? midnight
        : Math.min(
            midnight,
            Date.parse(running.startedAt) +
              (running.duration - running.spent) * 1000
          );
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
            setCompletion(`${result.notification.activity} is done.`);
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
        <div className="border-border bg-background shadow-floating fixed right-4 bottom-20 left-4 z-50 flex items-center justify-between gap-4 rounded-xl border py-2 pr-2 pl-4 sm:bottom-6 sm:left-auto sm:max-w-sm">
          <output>{completion}</output>
          <button
            aria-label="Dismiss completion message"
            className="text-muted hover:text-foreground inline-flex size-10 cursor-pointer items-center justify-center"
            onClick={() => {
              setCompletion(null);
            }}
            type="button"
          >
            <XMarkIcon aria-hidden="true" className="size-5" />
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
