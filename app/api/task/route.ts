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
    { error: "Use a valid date and up to 100 valid tasks." },
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

  const { droppedNowCount, tasks } = getTasksForDate(taskDate);
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}

async function saveTasks(request: Request) {
  if (!DATABASE_EXPERIMENTS_ENABLED) {
    return notAvailableResponse();
  }

  const parsedPayload = parseTaskPayload(
    await readJson(request),
    getTodayTaskDate()
  );

  if (!parsedPayload) {
    return invalidPayloadResponse();
  }

  const { taskDate, tasks: requestedTasks } = parsedPayload;
  const { droppedNowCount, tasks } = replaceTasksForDate(
    taskDate,
    requestedTasks
  );
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}

export async function POST(request: Request) {
  return await saveTasks(request);
}

export async function PUT(request: Request) {
  return await saveTasks(request);
}
