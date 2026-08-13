import {
  getTasksForDate,
  getTodayTaskDate,
  replaceTasksForDate,
} from "app/task/db";
import type { Task } from "app/task/type";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isTask(candidate: unknown): candidate is Task {
  if (!candidate || typeof candidate !== "object") {
    return false;
  }

  const task = candidate as {
    duration?: unknown;
    progress?: unknown;
    title?: unknown;
    type?: unknown;
  };

  return (
    typeof task.title === "string" &&
    typeof task.duration === "number" &&
    Number.isFinite(task.duration) &&
    typeof task.progress === "number" &&
    Number.isFinite(task.progress) &&
    (task.type === "Now" || task.type === "Other" || task.type === "Done")
  );
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
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const body = payload as {
    date?: unknown;
    tasks?: unknown;
  };
  const taskDate =
    typeof body.date === "string" && body.date.length > 0
      ? body.date
      : getTodayTaskDate();

  if (!Array.isArray(body.tasks)) {
    return NextResponse.json(
      { error: "Tasks must be an array" },
      { status: 400 }
    );
  }

  const invalidTask = body.tasks.find((task) => !isTask(task));
  if (invalidTask) {
    return NextResponse.json({ error: "Invalid task item" }, { status: 400 });
  }

  const { droppedNowCount, tasks } = replaceTasksForDate(taskDate, body.tasks);
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}

export async function PUT(request: Request) {
  const payload: unknown = await request.json();
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const body = payload as {
    date?: unknown;
    tasks?: unknown;
  };
  const taskDate =
    typeof body.date === "string" && body.date.length > 0
      ? body.date
      : getTodayTaskDate();

  if (!Array.isArray(body.tasks)) {
    return NextResponse.json(
      { error: "Tasks must be an array" },
      { status: 400 }
    );
  }

  const invalidTask = body.tasks.find((task) => !isTask(task));
  if (invalidTask) {
    return NextResponse.json({ error: "Invalid task item" }, { status: 400 });
  }

  const { droppedNowCount, tasks } = replaceTasksForDate(taskDate, body.tasks);
  return NextResponse.json({ droppedNowCount, taskDate, tasks });
}
