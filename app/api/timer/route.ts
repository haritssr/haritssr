import { NextResponse } from "next/server";
import { ZodError } from "zod";

import {
  isTimerOwner,
  timerSameOrigin,
} from "@/app/(tools)/timer/server/timerAuth";
import {
  changeTimer,
  changeTimerPreferences,
  exportTimer,
  getTimerHistory,
  getTimerSnapshot,
  importTimer,
  TimerStoreError,
} from "@/app/(tools)/timer/store";
import {
  createSampleTimerDay,
  shiftTimerDate,
  taskSpent,
  timerDate,
  validTimerDate,
} from "@/app/(tools)/timer/utils/timer";
import {
  TIMER_REQUEST_STARTED_HEADER,
  TIMER_RESPONSE_TIME_HEADER,
} from "@/app/(tools)/timer/utils/timerClock";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store", Vary: "Cookie" };
function timedHeaders(started: number) {
  return { ...headers, [TIMER_REQUEST_STARTED_HEADER]: String(started) };
}
function failure(error: unknown) {
  if (error instanceof TimerStoreError || error instanceof ZodError) {
    return NextResponse.json(
      {
        error:
          error instanceof TimerStoreError
            ? error.message
            : "Use valid Timer data.",
      },
      { status: error instanceof TimerStoreError ? error.status : 400, headers }
    );
  }
  console.error("Timer storage operation failed.");
  return NextResponse.json(
    {
      error:
        "Timer data could not be saved or loaded. Check server configuration or try again.",
    },
    { status: 500, headers }
  );
}

function preview(date: string | null) {
  const now = Date.now();
  const today = timerDate(now);
  if (date === null) {
    return {
      day: createSampleTimerDay(today),
      today,
      now: new Date(now).toISOString(),
      mode: "demo",
      notifications: [],
    };
  }
  if (!validTimerDate(date) || date > today) {
    throw new TimerStoreError("Choose today or an earlier valid date.");
  }
  return {
    day: createSampleTimerDay(date),
    today,
    mode: "demo",
    totals: Array.from({ length: 30 }, (_, index) => {
      const key = shiftTimerDate(date, index - 29);
      return {
        date: key,
        spent: createSampleTimerDay(key).tasks.reduce(
          (sum, task) => sum + taskSpent(task, key, now),
          0
        ),
      };
    }),
  };
}

export async function GET(request: Request) {
  const started = Date.now();
  try {
    const query = new URL(request.url).searchParams;
    const owner = await isTimerOwner();
    if (query.has("backup")) {
      if (!owner) {
        return NextResponse.json(
          { error: "Sign in to export personal history." },
          { status: 401, headers }
        );
      }
      return NextResponse.json(await exportTimer(), { headers });
    }
    const date = query.get("date");
    if (!owner) {
      return NextResponse.json(preview(date), {
        headers: timedHeaders(started),
      });
    }
    if (date !== null) {
      return NextResponse.json(await getTimerHistory(date), {
        headers: timedHeaders(started),
      });
    }
    const result = await getTimerSnapshot(request.headers.get("If-None-Match"));
    const snapshotHeaders = {
      ...timedHeaders(started),
      ETag: result.version,
      [TIMER_RESPONSE_TIME_HEADER]: result.now,
    };
    return result.snapshot === null
      ? new NextResponse(null, { status: 304, headers: snapshotHeaders })
      : NextResponse.json(result.snapshot, { headers: snapshotHeaders });
  } catch (error) {
    return failure(error);
  }
}

async function write(request: Request, preferences: boolean) {
  const started = Date.now();
  if (!timerSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  }
  if (!(await isTimerOwner())) {
    return NextResponse.json(
      { error: "Sign in to change personal Timer data." },
      { status: 401, headers }
    );
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  ) {
    return NextResponse.json(
      { error: "Use application/json." },
      { status: 415, headers }
    );
  }
  const backup =
    !preferences && new URL(request.url).searchParams.has("backup");
  const ordinaryLimit = preferences ? 2 * 1024 * 1024 : 8192;
  const limit = backup ? 10 * 1024 * 1024 : ordinaryLimit;
  if (Number(request.headers.get("content-length")) > limit) {
    return NextResponse.json(
      { error: "Request is too large." },
      { status: 413, headers }
    );
  }
  // Stream the request with a hard limit even when Content-Length is absent.
  const reader = request.body?.getReader();
  if (reader === undefined) {
    return NextResponse.json(
      { error: "Use valid JSON." },
      { status: 400, headers }
    );
  }
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      // oxlint-disable-next-line no-await-in-loop -- Request stream chunks arrive in order.
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      size += value.byteLength;
      if (size > limit) {
        // oxlint-disable-next-line no-await-in-loop -- Stop reading an oversized request immediately.
        await reader.cancel();
        return NextResponse.json(
          { error: "Request is too large." },
          { status: 413, headers }
        );
      }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks).toString("utf-8");
    if (backup) {
      return NextResponse.json(await importTimer(body), { headers });
    }
    let payload: unknown;
    try {
      payload = JSON.parse(body) as unknown;
    } catch {
      return NextResponse.json(
        { error: "Use valid JSON." },
        { status: 400, headers }
      );
    }
    const { version, ...result } = preferences
      ? await changeTimerPreferences(payload)
      : await changeTimer(payload);
    return NextResponse.json(result, {
      headers: { ...timedHeaders(started), ETag: version },
    });
  } catch (error) {
    return failure(error);
  } finally {
    reader.releaseLock();
  }
}
export async function POST(request: Request) {
  return await write(request, false);
}
export async function PATCH(request: Request) {
  return await write(request, true);
}
