import { NextResponse } from "next/server";

import {
  getTasksForDate,
  getTodayTaskDate,
  replaceTasksForDate,
} from "@/app/experiments/ui-explorations/task/db";
import { isValidTaskDate } from "@/app/experiments/ui-explorations/task/utils";
import { DATABASE_EXPERIMENTS_ENABLED } from "@/utils/databaseExperiments";

import { parseTaskPayload } from "./validation";

export const runtime = "nodejs";

function notAvailableResponse() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

function invalidPayloadResponse() {
  return NextResponse.json(
    { error: "Use a valid date, save version, and up to 100 valid tasks." },
    { status: 400 }
  );
}

async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function GET(request: Request) {
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    return notAvailableResponse();
  }

  const { searchParams } = new URL(request.url);
  const taskDate = searchParams.get("date") ?? getTodayTaskDate();

  if (!isValidTaskDate(taskDate)) {
    return invalidPayloadResponse();
  }

  return NextResponse.json({ ...getTasksForDate(taskDate), taskDate });
}

async function saveTasks(request: Request) {
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    return notAvailableResponse();
  }

  const origin = request.headers.get("origin");
  if (
    (origin !== null && origin !== new URL(request.url).origin) ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Use application/json." },
      { status: 415 }
    );
  }

  const parsedPayload = parseTaskPayload(
    await readJson(request),
    getTodayTaskDate()
  );

  if (!parsedPayload) {
    return invalidPayloadResponse();
  }

  const { taskDate, tasks: requestedTasks, version } = parsedPayload;
  const result = replaceTasksForDate(taskDate, requestedTasks, version);
  if (!result) {
    return NextResponse.json(
      { error: "Tasks changed since this save. Reload before saving again." },
      { status: 409 }
    );
  }
  return NextResponse.json({ ...result, taskDate });
}

export async function POST(request: Request) {
  return await saveTasks(request);
}

export async function PUT(request: Request) {
  return await saveTasks(request);
}
