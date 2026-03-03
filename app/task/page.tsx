"use client";

import { NumberField } from "@base-ui/react/number-field";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import InternalLink from "@/components/InternalLink";
import { PageTitle } from "@/components/PageTitle";
import { NEW_TASK_DURATION_PRESETS, sanitizeTasks } from "./data";
import Section from "./Section";
import TaskItem from "./TaskItem";
import type { Task } from "./type";
import { parseTasks } from "./utils";

export default function TaskPage() {
  // Tracks how many extra "Now" tasks were demoted during sanitization.
  const [droppedNowCount, setDroppedNowCount] = useState(0);
  // Prevents saves until initial server state is loaded.
  const [isHydratedFromDb, setIsHydratedFromDb] = useState(false);
  // Main in-memory task list for this page.
  const [tasks, setTasks] = useState<Task[]>([]);
  // Signals which resumed task should auto-start when moved into Now.
  const [autoStartTitle, setAutoStartTitle] = useState<string | null>(null);
  // Controlled input state for new task title.
  const [newOtherTaskTitle, setNewOtherTaskTitle] = useState("");
  // Controlled input state for new task duration.
  const [newOtherTaskDuration, setNewOtherTaskDuration] = useState("15");

  // Ref for duration input focus/UX updates.
  const durationInputRef = useRef<HTMLInputElement>(null);
  // Ref for the pending debounce timer id.
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Active Now-section tasks only.
  const nowTasks = tasks.filter((task) => task.type === "Now" && task.status !== "Done");
  // Active Other-section tasks sorted by progress desc.
  const otherTasks = tasks.filter((task) => task.type === "Other" && task.status !== "Done").sort((firstTask, secondTask) => secondTask.progress - firstTask.progress);
  // Completed tasks for Done section.
  const doneTasks = tasks.filter((task) => task.status === "Done");
  // Title value trimmed for validation and save.
  const normalizedNewOtherTaskTitle = newOtherTaskTitle.trim();
  // Duration parsed as number for validation and persistence.
  const parsedNewOtherTaskDuration = Number(newOtherTaskDuration);
  // Duplicate title guard to keep title unique.
  const newOtherTaskTitleExists = tasks.some((task) => task.title.toLowerCase() === normalizedNewOtherTaskTitle.toLowerCase());
  // Enables Add button only when title/duration/uniqueness are valid.
  const canAddNewOtherTask = normalizedNewOtherTaskTitle.length > 0 && Number.isFinite(parsedNewOtherTaskDuration) && parsedNewOtherTaskDuration > 0 && !newOtherTaskTitleExists;

  // Immediate save for critical actions (skip debounce)
  const saveImmediately = useCallback(
    (tasksToSave: Task[]) => {
      if (!isHydratedFromDb) {
        return;
      }
      // Cancel any pending debounced save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      // Use sendBeacon for synchronous save that survives page reload
      // Payload sent to the API as JSON body via beacon.
      const blob = new Blob([JSON.stringify({ tasks: tasksToSave })], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/task", blob);
    },
    [isHydratedFromDb],
  );

  const handleProgressChange = useCallback((title: string, progress: number) => {
    // Keep progress bounded for all updates.
    const normalizedProgress = Math.max(0, Math.min(100, progress));
    setTasks((prev) =>
      prev.map((task) =>
        task.title === title
          ? {
              ...task,
              progress: normalizedProgress,
              status: normalizedProgress >= 100 ? "Done" : task.status,
            }
          : task,
      ),
    );
  }, []);

  const handleMarkDone = useCallback(
    (title: string) => {
      // Mark targeted task as Done in a single immutable update.
      const nextTasks = tasks.map((task) => (task.title === title ? { ...task, status: "Done" as const } : task));
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately],
  );

  const handleDeleteTask = useCallback(
    (title: string) => {
      // Remove targeted task from the local list.
      const nextTasks = tasks.filter((task) => task.title !== title);
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately],
  );

  const handleDoNow = useCallback(
    (title: string) => {
      // Task being promoted into the Now section.
      const targetTask = tasks.find((task) => task.title === title);
      if (!targetTask || targetTask.status === "Done") {
        return;
      }

      // Remaining tasks after extracting promoted task.
      const remainingTasks = tasks.filter((task) => task.title !== title);
      // Demote any existing active Now task back to Other.
      const nextTasks: Task[] = remainingTasks.map((task) => (task.type === "Now" && task.status !== "Done" ? { ...task, type: "Other" as const } : task));
      nextTasks.push({ ...targetTask, type: "Now" });

      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately],
  );

  const handleMoveTask = useCallback(
    (title: string, nextType: Extract<Task["type"], "Other">) => {
      // Task being moved out of Now into Other.
      const targetTask = tasks.find((task) => task.title === title);
      if (!targetTask || targetTask.status === "Done") {
        return;
      }

      // List without moved task.
      const remainingTasks = tasks.filter((task) => task.title !== title);
      // List with moved task appended at the end.
      const nextTasks = [...remainingTasks, { ...targetTask, type: nextType }];
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately],
  );

  const handleAddOtherTask = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canAddNewOtherTask) {
        return;
      }

      // New task record initialized for Other section.
      const newTask: Task = {
        title: normalizedNewOtherTaskTitle,
        duration: parsedNewOtherTaskDuration,
        progress: 0,
        status: "Todo",
        type: "Other",
      };
      // Next list with appended new task.
      const nextTasks = [...tasks, newTask];
      setTasks(nextTasks);
      setNewOtherTaskTitle("");
      setNewOtherTaskDuration("15");
      // Save immediately to prevent data loss on page reload
      saveImmediately(nextTasks);
    },
    [canAddNewOtherTask, normalizedNewOtherTaskTitle, parsedNewOtherTaskDuration, tasks, saveImmediately],
  );

  const handleResumeNow = useCallback(
    (title: string) => {
      // Marks which task should auto-start once promoted into Now.
      setAutoStartTitle(title);
      handleDoNow(title);
    },
    [handleDoNow],
  );

  // Hydrates initial tasks from API once on mount.
  useEffect(() => {
    // Cancellation flag to avoid state updates after unmount.
    let isCancelled = false;

    // Fetches and normalizes persisted tasks from server.
    const hydrateTasksFromDb = async () => {
      try {
        // Fresh read without cache for current day state.
        const response = await fetch("/api/task", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        // Raw JSON payload from API.
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object") {
          return;
        }

        // Runtime shape used by parser/guards.
        const body = payload as { droppedNowCount?: unknown; tasks?: unknown };
        if (isCancelled) {
          return;
        }

        // Parsed and validated task list from payload.
        const parsedTasks = parseTasks(body.tasks);
        if (!parsedTasks) {
          return;
        }

        // Enforces single-Now invariant and captures demotion count.
        const { demotedNowCount, sanitizedTasks: serverTasks } = sanitizeTasks(parsedTasks);
        setDroppedNowCount(typeof body.droppedNowCount === "number" ? body.droppedNowCount : demotedNowCount);
        setTasks(serverTasks.map((task) => ({ ...task })));
      } finally {
        if (!isCancelled) {
          setIsHydratedFromDb(true);
        }
      }
    };

    hydrateTasksFromDb().catch(() => undefined);

    return () => {
      isCancelled = true;
    };
  }, []);

  // Debounced autosave for non-critical task changes.
  useEffect(() => {
    if (!isHydratedFromDb) {
      return;
    }

    // Clear existing timeout to debounce saves
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce save by 500ms to batch rapid updates (e.g., timer ticks)
    saveTimeoutRef.current = setTimeout(() => {
      // Writes current task list via PUT.
      const persistTasksToDb = async () => {
        try {
          // API request that persists latest task snapshot.
          const response = await fetch("/api/task", {
            body: JSON.stringify({ tasks }),
            headers: { "Content-Type": "application/json" },
            method: "PUT",
          });
          if (!response.ok) {
            // Best-effort parsed API error response.
            const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
            console.error("Failed to save tasks:", errorData);
          }
        } catch (err) {
          console.error("Network error saving tasks:", err);
        }
      };

      persistTasksToDb().catch(() => undefined);
    }, 500);

    // Cleanup: flush pending save on unmount (e.g., page navigation)
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
        // Use sendBeacon for reliable save during unload
        // Beacon payload used during unmount flush.
        const blob = new Blob([JSON.stringify({ tasks })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/task", blob);
      }
    };
  }, [isHydratedFromDb, tasks]);

  // Save when user switches tabs or navigates away
  useEffect(() => {
    if (!isHydratedFromDb) {
      return;
    }

    // Flushes pending state when tab becomes hidden.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Cancel pending debounced save
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
          saveTimeoutRef.current = null;
        }
        // Send immediate save using sendBeacon for reliability
        // Beacon payload for visibility change event.
        const blob = new Blob([JSON.stringify({ tasks })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/task", blob);
      }
    };

    // Flushes pending state during hard navigation/close.
    const handleBeforeUnload = () => {
      // Flush any pending save before page unload
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
        // Beacon payload for beforeunload event.
        const blob = new Blob([JSON.stringify({ tasks })], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/task", blob);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isHydratedFromDb, tasks]);

  return (
    <>
      <PageTitle description="Realistic Daily Time Budget." title="Task" />
      <section className="mt-2 flex items-center space-x-5">
        <InternalLink href="/task/history">History</InternalLink>
        <InternalLink href="/task/statistics">Statistics</InternalLink>
        <InternalLink href="/task/architecture">Architecture</InternalLink>
      </section>

      <form className="mt-10 flex flex-wrap items-center gap-2" onSubmit={handleAddOtherTask}>
        <input
          className="rounded-lg corner-squircle border border-zinc-300 h-8 px-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-700 focus:outline-none w-full sm:w-fit"
          onChange={(event) => setNewOtherTaskTitle(event.currentTarget.value)}
          placeholder="Add new task here"
          type="text"
          value={newOtherTaskTitle}
        />

        <NumberField.Root
          className="flex items-center"
          min={1}
          onValueChange={(value) => setNewOtherTaskDuration(String(value ?? ""))}
          step={1}
          value={newOtherTaskDuration ? Number(newOtherTaskDuration) : null}
        >
          <NumberField.Decrement className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-sm border-l border-t border-b border-zinc-300 text-zinc-700 hover:bg-zinc-100">
            −
          </NumberField.Decrement>
          <NumberField.Input
            className="h-8 w-10 border border-zinc-300 px-2 py-1 text-center text-sm text-zinc-700 focus:text-blue-500 focus:border-blue-500 focus:outline-none"
            ref={durationInputRef}
          />
          <NumberField.Increment className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-sm border-r border-t border-b border-zinc-300 text-zinc-700 hover:bg-zinc-100">
            +
          </NumberField.Increment>
        </NumberField.Root>
        <div className="flex items-center gap-1">
          {NEW_TASK_DURATION_PRESETS.map((preset) => {
            // Highlights the selected quick-duration preset.
            const isSelected = parsedNewOtherTaskDuration === preset.minutes;
            // Computes visual variant for selected/unselected preset buttons.
            const presetClassName = isSelected ? "border-zinc-700 text-zinc-700" : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100";

            return (
              <button
                className={`cursor-pointer inline-flex items-center justify-center rounded-lg corner-squircle border w-8 h-8 text-sm ${presetClassName}`}
                key={preset.minutes}
                onClick={() => {
                  setNewOtherTaskDuration(String(preset.minutes));
                  durationInputRef.current?.focus();
                }}
                type="button"
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <button
          className="h-8 text-sm bg-zinc-700 px-3 corner-squircle rounded-lg text-white hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={!canAddNewOtherTask}
          type="submit"
        >
          Add Task
        </button>
      </form>

      <Section title="Now">
        {droppedNowCount > 0 ? (
          <div className="mb-2 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-sm text-amber-700">
            Only one Now task is allowed. {droppedNowCount} extra Now task(s) were moved to Other.
          </div>
        ) : null}

        {nowTasks.length === 0 && <div className="text-sm text-zinc-400">Empty</div>}

        {nowTasks.map((task) => (
          <TaskItem
            autoStart={autoStartTitle === task.title}
            key={task.title}
            onAutoStartConsumed={(title) => setAutoStartTitle((prev) => (prev === title ? null : prev))}
            onDelete={handleDeleteTask}
            onMarkDone={handleMarkDone}
            onMoveTask={handleMoveTask}
            onProgressChange={handleProgressChange}
            showZeroProgressBar
            {...task}
          />
        ))}
      </Section>

      <Section title="Other">
        {otherTasks.length === 0 && <div className="text-sm text-zinc-400">Empty</div>}
        {otherTasks.map((task) => (
          <TaskItem key={task.title} onDelete={handleDeleteTask} onDoNow={handleDoNow} onMarkDone={handleMarkDone} onProgressChange={handleProgressChange} onResumeNow={handleResumeNow} {...task} />
        ))}
      </Section>

      {normalizedNewOtherTaskTitle.length > 0 && newOtherTaskTitleExists && <div className="mb-3 text-xs text-rose-500">Task title already exists.</div>}

      <Section title="Done">
        {doneTasks.length === 0 && <div className="text-sm text-zinc-500">Nothing is done today.</div>}
        {doneTasks.map((task) => (
          <TaskItem forceDonutProgress key={task.title} onDelete={handleDeleteTask} onMarkDone={handleMarkDone} onProgressChange={handleProgressChange} visualVariant="doneSection" {...task} />
        ))}
      </Section>

      <h2 className="mt-20 text-xl font-semibold text-zinc-800">Task Logic</h2>
      <div className="mt-2 space-y-4 text-zinc-500">
        <div>
          <div className="font-medium text-zinc-600">Now</div>
          <ul className="list-disc pl-7">
            <li>Shows tasks with type Now and status not Done.</li>
            <li>Only one Now task is allowed at a time.</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-zinc-600">Other</div>
          <ul className="list-disc pl-7">
            <li>Shows tasks with type Other and status not Done.</li>
            <li>Sorted by highest progress first.</li>
            <li>Do Now moves Other to Now and demotes any existing Now to Other.</li>
            <li>Resume appears when progress is bigger than 0.</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-zinc-600">Done</div>
          <ul className="list-disc pl-7">
            <li>Shows tasks with status Done.</li>
            <li>Tasks become Done when progress reaches 100 or when manually marked done.</li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-zinc-600">Task schema</div>
          <ul className="list-disc pl-7">
            <li>title is a string.</li>
            <li>duration is a finite number.</li>
            <li>progress is a finite number.</li>
            <li>status is Todo or Done.</li>
            <li>type is Now or Other.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
