import { NextResponse } from "next/server";

import {
  changeTimer,
  getTimerHistory,
  getTimerSnapshot,
  TimerStoreError,
} from "@/app/timer/store";

export const runtime = "nodejs";

function failure(error: unknown) {
  if (error instanceof TimerStoreError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
  console.error("Timer storage failed:", error);
  return NextResponse.json(
    { error: "Timer data could not be saved or loaded. Please try again." },
    { status: 500 }
  );
}

export async function GET(request: Request) {
  try {
    const date = new URL(request.url).searchParams.get("date");
    const result =
      date === null ? await getTimerSnapshot() : await getTimerHistory(date);
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return failure(error);
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const origin = request.headers.get("origin");
  if (
    (origin !== null && origin !== new URL(request.url).origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  ) {
    return NextResponse.json(
      { error: "Use application/json." },
      { status: 415 }
    );
  }
  const body = await request.text();
  if (body.length > 8192) {
    return NextResponse.json(
      { error: "Activity details are too long." },
      { status: 413 }
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Use valid JSON." }, { status: 400 });
  }
  try {
    return NextResponse.json(await changeTimer(payload), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return failure(error);
  }
}
