import {
  getTasksForDate,
  getTodayTaskDate,
  replaceTasksForDate,
} from "app/experiments/ui-explorations/task/db";
import type { Task } from "app/experiments/ui-explorations/task/type";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTask(candidate: unknown): candidate is Task {
  if (!isRecord(candidate)) {
    return false;
  }

  return (
    typeof candidate.title === "string" &&
    typeof candidate.duration === "number" &&
    Number.isFinite(candidate.duration) &&
    typeof candidate.progress === "number" &&
    Number.isFinite(candidate.progress) &&
    (candidate.type === "Now" ||
      candidate.type === "Other" ||
      candidate.type === "Done")
  );
}

function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const taskDate = searchParams.get("date") ?? getTodayTaskDate();
  const { droppedNowCount, tasks } = getTasksForDate(taskDate);

  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}

export async function POST(request: Request) {
  // POST handler for navigator.sendBeacon (used when page is hidden/closed)
  const payload: unknown = await request.json();
  if (!isRecord(payload)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const taskDate =
    typeof payload.date === "string" && payload.date.length > 0
      ? payload.date
      : getTodayTaskDate();

  if (!isTaskArray(payload.tasks)) {
    return NextResponse.json(
      { error: "Tasks must be an array" },
      { status: 400 }
    );
  }

  const { droppedNowCount, tasks } = replaceTasksForDate(
    taskDate,
    payload.tasks
  );
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}

export async function PUT(request: Request) {
  const payload: unknown = await request.json();
  if (!isRecord(payload)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const taskDate =
    typeof payload.date === "string" && payload.date.length > 0
      ? payload.date
      : getTodayTaskDate();

  if (!isTaskArray(payload.tasks)) {
    return NextResponse.json(
      { error: "Tasks must be an array" },
      { status: 400 }
    );
  }

  const { droppedNowCount, tasks } = replaceTasksForDate(
    taskDate,
    payload.tasks
  );
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}
