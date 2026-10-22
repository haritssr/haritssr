"use client";

import useSWR from "swr";

interface TimerSession {
  account: { email: string; picture: string | null } | null;
}

async function fetchSession(url: string): Promise<TimerSession> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Account status is unavailable.");
  }
  const payload: unknown = await response.json();
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("account" in payload)
  ) {
    throw new Error("Account status is invalid.");
  }
  const { account } = payload;
  if (account === null) {
    return { account: null };
  }
  if (
    typeof account !== "object" ||
    !("email" in account) ||
    typeof account.email !== "string" ||
    !("picture" in account) ||
    (account.picture !== null && typeof account.picture !== "string")
  ) {
    throw new Error("Account status is invalid.");
  }
  return { account: { email: account.email, picture: account.picture } };
}

export function useTimerSession() {
  return useSWR("/api/timer/auth/session", fetchSession, {
    shouldRetryOnError: false,
  });
}
