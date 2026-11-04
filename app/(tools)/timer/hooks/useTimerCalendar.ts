import { useEffect, useRef } from "react";
import useSWR from "swr";

import { useTimerSession } from "@/utils/timerSession";

import { useTimer } from "../_components/TimerProvider";
import type { TimerCalendar } from "../utils/timerCalendar";
import {
  fetchTimerCalendar,
  subscribeTimerChanges,
} from "../utils/timerClient";

export default function useTimerCalendar(month: string, active: boolean) {
  const { snapshot } = useTimer("snapshot");
  const account = useCalendarAccount(snapshot?.mode);
  const { identity, mode } = account;
  const ready = active && account.ready;
  const { data, error, mutate } = useSWR<TimerCalendar, Error>(
    ready ? ["timer-calendar", month, identity, mode] : null,
    async () => await fetchTimerCalendar(month),
    {
      refreshInterval: 60_000,
      shouldRetryOnError: false,
      keepPreviousData: false,
    }
  );
  const revision = JSON.stringify([
    month,
    identity,
    mode,
    snapshot?.today,
    snapshot?.day.revision,
    snapshot?.preferences?.revision,
  ]);
  const previous = useRef(revision);
  useEffect(() => {
    const changed = previous.current !== revision;
    previous.current = revision;
    if (ready && changed) {
      void mutate();
    }
  }, [mutate, ready, revision]);
  useEffect(() => {
    if (!ready) {
      return () => {
        /* No calendar subscription while inactive. */
      };
    }
    try {
      return subscribeTimerChanges(() => {
        void mutate();
      });
    } catch {
      return () => {
        /* Focus revalidation and polling remain available. */
      };
    }
  }, [mutate, ready]);
  const calendar =
    ready && data?.month === month && data.mode === mode ? data : undefined;
  return {
    calendar,
    error: account.error ?? error ?? calendarModeError(ready, data, mode),
    retry: () => {
      account.retry();
      void mutate();
    },
  };
}

function calendarModeError(
  ready: boolean,
  data: TimerCalendar | undefined,
  mode: TimerCalendar["mode"]
) {
  return ready && data !== undefined && data.mode !== mode
    ? new Error("Account changed. Reload the calendar.")
    : undefined;
}

function useCalendarAccount(snapshotMode: TimerCalendar["mode"] | undefined) {
  const session = useTimerSession();
  const identity = session.data?.account?.email ?? "demo";
  const mode: TimerCalendar["mode"] = session.data?.account ? "turso" : "demo";
  return {
    identity,
    mode,
    ready:
      session.data !== undefined &&
      session.error === undefined &&
      snapshotMode === mode,
    error: session.error instanceof Error ? session.error : undefined,
    retry: () => {
      void session.mutate();
    },
  };
}
