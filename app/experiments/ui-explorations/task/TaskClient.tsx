"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEvent, MouseEvent, SubmitEvent } from "react";

import BackButton from "@/components/BackButton";
import ExperimentPageBadge from "@/components/ExperimentPageBadge";
import InternalLink from "@/components/InternalLink";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";

import {
  MAX_TASK_DURATION_MINUTES,
  MAX_TASKS_PER_DAY,
  NEW_TASK_DURATION_PRESETS,
  sanitizeTasks,
} from "./data";
import { createTaskSaveSession } from "./persistence";
import Section from "./Section";
import TaskItem from "./TaskItem";
import type { Task } from "./type";
import { isValidTaskDate, parseTasks } from "./utils";

export default function TaskPage() {
  // Tracks how many extra "Now" tasks were demoted during sanitization.
  const [droppedNowCount, setDroppedNowCount] = useState(0);
  // Prevents saves until initial server state is loaded.
  const [isHydratedFromDb, setIsHydratedFromDb] = useState(false);
  const [loadRequest, setLoadRequest] = useState({ url: "/api/task" });
  const [taskDate, setTaskDate] = useState<string | null>(null);
  const taskDateRef = useRef<string | null>(null);
  const saveSessionRef = useRef<ReturnType<
    typeof createTaskSaveSession
  > | null>(null);
  // Main in-memory task list for this page.
  const [tasks, setTasks] = useState<Task[]>([]);
  // Signals which resumed task should auto-start when moved into Now.
  const [autoStartTitle, setAutoStartTitle] = useState<string | null>(null);
  // Controlled input state for new task title.
  const [newOtherTaskTitle, setNewOtherTaskTitle] = useState("");
  // Controlled input state for new task duration.
  const [newOtherTaskDuration, setNewOtherTaskDuration] = useState("15");
  const [persistenceError, setPersistenceError] = useState<string | null>(null);

  // Ref for duration input focus/UX updates.
  const durationInputRef = useRef<HTMLInputElement>(null);
  // Ref for the pending debounce timer id.
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tasksRef = useRef<Task[]>([]);
  const isHydratedFromDbRef = useRef(false);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    isHydratedFromDbRef.current = isHydratedFromDb;
  }, [isHydratedFromDb]);

  // Active Now-section tasks only.
  const nowTasks = tasks.filter((task) => task.type === "Now");
  // Active Other-section tasks sorted by progress desc.
  const otherTasks = tasks
    .filter((task) => task.type === "Other")
    .toSorted(
      (firstTask, secondTask) => secondTask.progress - firstTask.progress
    );
  // Completed tasks for Done section.
  const doneTasks = tasks.filter((task) => task.type === "Done");
  // Title value trimmed for validation and save.
  const normalizedNewOtherTaskTitle = newOtherTaskTitle.trim();
  // Duration parsed as number for validation and persistence.
  const parsedNewOtherTaskDuration = Number(newOtherTaskDuration);
  // Duplicate title guard to keep title unique.
  const newOtherTaskTitleExists = tasks.some(
    (task) =>
      task.title.toLowerCase() === normalizedNewOtherTaskTitle.toLowerCase()
  );
  // Enables Add button only when title/duration/uniqueness are valid.
  const canAddNewOtherTask =
    normalizedNewOtherTaskTitle.length > 0 &&
    Number.isSafeInteger(parsedNewOtherTaskDuration) &&
    parsedNewOtherTaskDuration > 0 &&
    parsedNewOtherTaskDuration <= MAX_TASK_DURATION_MINUTES &&
    tasks.length < MAX_TASKS_PER_DAY &&
    !newOtherTaskTitleExists;

  const handleNewOtherTaskTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewOtherTaskTitle(event.currentTarget.value);
    },
    []
  );

  const handleNewOtherTaskDurationChange = useCallback(
    (value: number | null) => {
      setNewOtherTaskDuration(String(value ?? ""));
    },
    []
  );

  const handlePresetDurationClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setNewOtherTaskDuration(event.currentTarget.dataset.minutes ?? "");
      durationInputRef.current?.focus();
    },
    []
  );

  const handleAutoStartConsumed = useCallback((title: string) => {
    setAutoStartTitle((prev) => (prev === title ? null : prev));
  }, []);

  // Immediate save for critical actions (skip debounce)
  const saveImmediately = useCallback(
    (tasksToSave: Task[]) => {
      if (
        !isHydratedFromDb ||
        taskDate === null ||
        saveSessionRef.current === null
      ) {
        return;
      }
      tasksRef.current = tasksToSave;
      // Cancel any pending debounced save
      if (saveTimeoutRef.current !== null) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
      // Include save ordering because beacon responses cannot update client state.
      const blob = new Blob(
        [JSON.stringify(saveSessionRef.current.createPayload(tasksToSave))],
        {
          type: "application/json",
        }
      );
      if (!navigator.sendBeacon("/api/task", blob)) {
        setPersistenceError("Tasks could not be saved. Try again.");
      }
    },
    [isHydratedFromDb, taskDate]
  );

  const handleProgressChange = useCallback(
    (title: string, progress: number) => {
      // Keep progress bounded for all updates.
      const normalizedProgress = Math.max(0, Math.min(100, progress));
      setTasks((prev) =>
        prev.map((task) =>
          task.title === title
            ? {
                ...task,
                progress: normalizedProgress,
                type: normalizedProgress >= 100 ? "Done" : task.type,
              }
            : task
        )
      );
    },
    []
  );

  const handleMarkDone = useCallback(
    (title: string) => {
      // Mark targeted task as Done in a single immutable update.
      const nextTasks = tasks.map((task) =>
        task.title === title ? { ...task, type: "Done" as const } : task
      );
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately]
  );

  const handleDeleteTask = useCallback(
    (title: string) => {
      // Remove targeted task from the local list.
      const nextTasks = tasks.filter((task) => task.title !== title);
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately]
  );

  const handleDoNow = useCallback(
    (title: string) => {
      // Task being promoted into the Now section.
      const targetTask = tasks.find((task) => task.title === title);
      if (!targetTask || targetTask.type === "Done") {
        return;
      }

      // Remaining tasks after extracting promoted task.
      const remainingTasks = tasks.filter((task) => task.title !== title);
      // Demote any existing active Now task back to Other.
      const nextTasks: Task[] = remainingTasks.map((task) =>
        task.type === "Now" ? { ...task, type: "Other" as const } : task
      );
      nextTasks.push({ ...targetTask, type: "Now" });

      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately]
  );

  const handleMoveTask = useCallback(
    (title: string, nextType: Extract<Task["type"], "Other">) => {
      // Task being moved out of Now into Other.
      const targetTask = tasks.find((task) => task.title === title);
      if (!targetTask || targetTask.type === "Done") {
        return;
      }

      // List without moved task.
      const remainingTasks = tasks.filter((task) => task.title !== title);
      // List with moved task appended at the end.
      const nextTasks = [...remainingTasks, { ...targetTask, type: nextType }];
      setTasks(nextTasks);
      saveImmediately(nextTasks);
    },
    [tasks, saveImmediately]
  );

  const handleAddOtherTask = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canAddNewOtherTask) {
        return;
      }

      // New task record initialized for Other section.
      const newTask: Task = {
        title: normalizedNewOtherTaskTitle,
        duration: parsedNewOtherTaskDuration,
        progress: 0,
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
    [
      canAddNewOtherTask,
      normalizedNewOtherTaskTitle,
      parsedNewOtherTaskDuration,
      tasks,
      saveImmediately,
    ]
  );

  const handleResumeNow = useCallback(
    (title: string) => {
      // Marks which task should auto-start once promoted into Now.
      setAutoStartTitle(title);
      handleDoNow(title);
    },
    [handleDoNow]
  );

  // Hydrates initial tasks from API once on mount.
  useEffect(() => {
    // Cancellation flag to avoid state updates after unmount.
    let isCancelled = false;

    // Fetches and normalizes persisted tasks from server.
    const hydrateTasksFromDb = async () => {
      try {
        // Fresh read without cache for current day state.
        const response = await fetch(loadRequest.url, { cache: "no-store" });
        if (isCancelled) {
          return;
        }
        if (!response.ok) {
          setPersistenceError(
            "Tasks could not be loaded. Refresh to try again."
          );
          return;
        }

        // Raw JSON payload from API.
        const payload: unknown = await response.json();
        if (isCancelled) {
          return;
        }
        if (payload === null || typeof payload !== "object") {
          setPersistenceError("Tasks could not be loaded. Try again.");
          return;
        }

        // Runtime shape used by parser/guards.
        const body = payload as {
          droppedNowCount?: unknown;
          tasks?: unknown;
          taskDate?: unknown;
          revision?: unknown;
        };
        // Parsed and validated task list from payload.
        const parsedTasks = parseTasks(body.tasks);
        if (
          parsedTasks === null ||
          typeof body.taskDate !== "string" ||
          !isValidTaskDate(body.taskDate) ||
          typeof body.revision !== "number" ||
          !Number.isSafeInteger(body.revision) ||
          body.revision < 0
        ) {
          setPersistenceError("Tasks could not be loaded. Try again.");
          return;
        }

        // Enforces single-Now invariant and captures demotion count.
        const { demotedNowCount, sanitizedTasks: serverTasks } =
          sanitizeTasks(parsedTasks);
        setDroppedNowCount(
          typeof body.droppedNowCount === "number"
            ? body.droppedNowCount
            : demotedNowCount
        );
        const initialTasks = serverTasks.map((task) => ({ ...task }));
        setTasks(initialTasks);
        tasksRef.current = initialTasks;
        setPersistenceError(null);
        setTaskDate(body.taskDate);
        taskDateRef.current = body.taskDate;
        saveSessionRef.current = createTaskSaveSession(
          body.taskDate,
          body.revision
        );
        setIsHydratedFromDb(true);
      } catch {
        if (!isCancelled) {
          setPersistenceError(
            "Tasks could not be loaded. Refresh to try again."
          );
        }
      }
    };

    void hydrateTasksFromDb();

    return () => {
      isCancelled = true;
    };
  }, [loadRequest]);

  // Debounced autosave for non-critical task changes.
  useEffect(() => {
    const session = saveSessionRef.current;
    if (isHydratedFromDb && taskDate !== null && session !== null) {
      // Clear existing timeout to debounce saves
      if (saveTimeoutRef.current !== null) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Debounce save by 500ms to batch rapid updates (e.g., timer ticks)
      saveTimeoutRef.current = setTimeout(() => {
        saveTimeoutRef.current = null;
        void persistTasksToDb(session, tasks, setPersistenceError);
      }, 500);
    }

    // Cleanup only cancels the superseded debounce. Lifecycle events flush the
    // latest committed task state separately.
    return () => {
      if (saveTimeoutRef.current !== null) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [isHydratedFromDb, taskDate, tasks]);

  // Save the latest committed state when the page lifecycle is ending.
  useEffect(() => {
    const flushPendingTasks = () => {
      if (
        !isHydratedFromDbRef.current ||
        taskDateRef.current === null ||
        saveSessionRef.current === null ||
        saveTimeoutRef.current === null
      ) {
        return;
      }

      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
      const blob = new Blob(
        [
          JSON.stringify(
            saveSessionRef.current.createPayload(tasksRef.current)
          ),
        ],
        {
          type: "application/json",
        }
      );
      navigator.sendBeacon("/api/task", blob);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushPendingTasks();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", flushPendingTasks);
    return () => {
      flushPendingTasks();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", flushPendingTasks);
    };
  }, []);

  return (
    <>
      <BackButton href="/experiments/ui-explorations" name="UI Explorations" />
      <PageTitle>Task</PageTitle>
      <SubTitle>Realistic Daily Time Budget.</SubTitle>
      <ExperimentPageBadge />
      <section className="mt-2 flex items-center space-x-5">
        <InternalLink href="/experiments/ui-explorations/task/history">
          History
        </InternalLink>
        <InternalLink href="/experiments/ui-explorations/task/statistics">
          Statistics
        </InternalLink>
        <InternalLink href="/experiments/ui-explorations/task/architecture">
          Architecture
        </InternalLink>
      </section>

      <div className="text-foreground/70 mt-6 text-sm" aria-live="polite">
        {taskDate === null && persistenceError === null ? (
          <p>Loading tasks…</p>
        ) : null}
        {taskDate === null && persistenceError !== null ? (
          <button
            className="text-action hover:underline"
            onClick={() => {
              setPersistenceError(null);
              setLoadRequest({ url: "/api/task" });
            }}
            type="button"
          >
            Retry loading tasks
          </button>
        ) : null}
        {taskDate === null ? null : (
          <p>
            Tasks for <time dateTime={taskDate}>{taskDate}</time>.{" "}
            <button
              className="text-action hover:underline"
              onClick={() => {
                window.location.reload();
              }}
              type="button"
            >
              Load today’s tasks
            </button>
          </p>
        )}
      </div>
      <fieldset disabled={!isHydratedFromDb}>
        <legend className="sr-only">Daily tasks</legend>
        <form
          className="mt-10 flex flex-wrap items-center gap-2"
          onSubmit={handleAddOtherTask}
        >
          <label className="sr-only" htmlFor="new-task-title">
            Task title
          </label>
          <input
            autoComplete="off"
            className="corner-squircle h-8 w-full rounded-lg border border-zinc-300 px-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-700 focus:outline-none sm:w-fit"
            id="new-task-title"
            maxLength={200}
            name="title"
            onChange={handleNewOtherTaskTitleChange}
            placeholder="Task title…"
            type="text"
            value={newOtherTaskTitle}
          />

          <NumberField.Root
            className="flex items-center"
            max={MAX_TASK_DURATION_MINUTES}
            min={1}
            onValueChange={handleNewOtherTaskDurationChange}
            step={1}
            value={newOtherTaskDuration ? Number(newOtherTaskDuration) : null}
          >
            <NumberField.Decrement
              aria-label="Decrease task duration"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-sm border-t border-b border-l border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            >
              −
            </NumberField.Decrement>
            <NumberField.Input
              aria-label="Task duration in minutes"
              autoComplete="off"
              className="h-8 w-10 border border-zinc-300 px-2 py-1 text-center text-sm text-zinc-700 focus:border-blue-500 focus:text-blue-500 focus:outline-none"
              inputMode="numeric"
              name="duration"
              ref={durationInputRef}
            />
            <NumberField.Increment
              aria-label="Increase task duration"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-sm border-t border-r border-b border-zinc-300 text-zinc-700 hover:bg-zinc-100"
            >
              +
            </NumberField.Increment>
          </NumberField.Root>
          <div className="flex items-center gap-1">
            {NEW_TASK_DURATION_PRESETS.map((preset) => {
              // Highlights the selected quick-duration preset.
              const isSelected = parsedNewOtherTaskDuration === preset.minutes;
              // Computes visual variant for selected/unselected preset buttons.
              const presetClassName = isSelected
                ? "border-zinc-700 text-zinc-700"
                : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100";

              return (
                <button
                  className={`corner-squircle inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border text-sm ${presetClassName}`}
                  data-minutes={preset.minutes}
                  key={preset.minutes}
                  onClick={handlePresetDurationClick}
                  type="button"
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          <button
            className="corner-squircle h-8 rounded-lg bg-zinc-700 px-3 text-sm text-white hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={!canAddNewOtherTask}
            type="submit"
          >
            Add Task
          </button>
        </form>

        <Section title="Now">
          {droppedNowCount > 0 ? (
            <div className="mb-2 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-sm text-amber-700">
              Only one Now task is allowed. {droppedNowCount} extra Now task(s)
              were moved to Other.
            </div>
          ) : null}

          {nowTasks.length === 0 && (
            <div className="text-sm text-zinc-400">Empty</div>
          )}

          {nowTasks.map((task) => (
            <TaskItem
              autoStart={autoStartTitle === task.title}
              key={task.title}
              onAutoStartConsumed={handleAutoStartConsumed}
              onDelete={handleDeleteTask}
              onMarkDone={handleMarkDone}
              onMoveTask={handleMoveTask}
              onProgressChange={handleProgressChange}
              showZeroProgressBar
              {...task}
            />
          ))}
        </Section>

        <Section title="Tasks">
          {otherTasks.length === 0 && (
            <div className="text-sm text-zinc-400">Empty</div>
          )}
          {otherTasks.map((task) => (
            <TaskItem
              key={task.title}
              onDelete={handleDeleteTask}
              onDoNow={handleDoNow}
              onMarkDone={handleMarkDone}
              onProgressChange={handleProgressChange}
              onResumeNow={handleResumeNow}
              {...task}
            />
          ))}
        </Section>

        {normalizedNewOtherTaskTitle.length > 0 && newOtherTaskTitleExists && (
          <output aria-live="polite" className="mb-3 text-xs text-rose-500">
            Task title already exists.
          </output>
        )}

        {persistenceError !== null && (
          <output aria-live="polite" className="mb-3 text-sm text-rose-600">
            {persistenceError}
          </output>
        )}

        <Section accordion={{ defaultOpen: false }} title="Done">
          {doneTasks.length === 0 && (
            <div className="text-sm text-zinc-500">Nothing is done today.</div>
          )}
          {doneTasks.map((task) => (
            <TaskItem
              forceDonutProgress
              key={task.title}
              onDelete={handleDeleteTask}
              onMarkDone={handleMarkDone}
              onProgressChange={handleProgressChange}
              readOnly
              visualVariant="doneSection"
              {...task}
            />
          ))}
        </Section>
      </fieldset>
    </>
  );
}

async function persistTasksToDb(
  session: ReturnType<typeof createTaskSaveSession>,
  tasks: readonly Task[],
  setPersistenceError: (error: string | null) => void
) {
  const payload = session.createPayload(tasks);
  try {
    const response = await fetch("/api/task", {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });
    if (!session.isLatest(payload.version.sequence)) {
      return;
    }
    if (response.ok) {
      setPersistenceError(null);
    } else if (response.status === 409) {
      setPersistenceError(
        "Tasks changed in another tab. Reload before saving again."
      );
    } else {
      const errorData: unknown = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));
      console.error("Failed to save tasks:", errorData);
      setPersistenceError("Tasks could not be saved. Try again.");
    }
  } catch (error) {
    if (!session.isLatest(payload.version.sequence)) {
      return;
    }
    console.error("Network error saving tasks:", error);
    setPersistenceError("Tasks could not be saved. Check your connection.");
  }
}
