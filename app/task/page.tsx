"use client";

// link to /experiments/ui-explorations/task redirected to /task, see next.config.ts redirect()

import { NumberField } from "@base-ui/react/number-field";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ExperimentPageBadge from "@/components/ExperimentPageBadge";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
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
  const nowTasks = tasks.filter((task) => task.type === "Now");
  // Active Other-section tasks sorted by progress desc.
  const otherTasks = tasks
    .filter((task) => task.type === "Other")
    .sort((firstTask, secondTask) => secondTask.progress - firstTask.progress);
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
    Number.isFinite(parsedNewOtherTaskDuration) &&
    parsedNewOtherTaskDuration > 0 &&
    !newOtherTaskTitleExists;

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
    [isHydratedFromDb]
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
        const { demotedNowCount, sanitizedTasks: serverTasks } =
          sanitizeTasks(parsedTasks);
        setDroppedNowCount(
          typeof body.droppedNowCount === "number"
            ? body.droppedNowCount
            : demotedNowCount
        );
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
            const errorData = await response
              .json()
              .catch(() => ({ error: "Unknown error" }));
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
      <PageTitle title="Task" />
      <PageDescription description="Realistic Daily Time Budget." />
      <ExperimentPageBadge />
      <section className="mt-2 flex items-center space-x-5">
        <InternalLink href="/task/history">History</InternalLink>
        <InternalLink href="/task/statistics">Statistics</InternalLink>
        <InternalLink href="/task/architecture">Architecture</InternalLink>
      </section>

      <form
        className="mt-10 flex flex-wrap items-center gap-2"
        onSubmit={handleAddOtherTask}
      >
        <input
          className="corner-squircle h-8 w-full rounded-lg border border-zinc-300 px-2 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-zinc-700 focus:outline-none sm:w-fit"
          onChange={(event) => setNewOtherTaskTitle(event.currentTarget.value)}
          placeholder="Add new task here"
          type="text"
          value={newOtherTaskTitle}
        />

        <NumberField.Root
          className="flex items-center"
          min={1}
          onValueChange={(value) =>
            setNewOtherTaskDuration(String(value ?? ""))
          }
          step={1}
          value={newOtherTaskDuration ? Number(newOtherTaskDuration) : null}
        >
          <NumberField.Decrement className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-sm border-zinc-300 border-t border-b border-l text-zinc-700 hover:bg-zinc-100">
            −
          </NumberField.Decrement>
          <NumberField.Input
            className="h-8 w-10 border border-zinc-300 px-2 py-1 text-center text-sm text-zinc-700 focus:border-blue-500 focus:text-blue-500 focus:outline-none"
            ref={durationInputRef}
          />
          <NumberField.Increment className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-sm border-zinc-300 border-t border-r border-b text-zinc-700 hover:bg-zinc-100">
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
          className="corner-squircle h-8 rounded-lg bg-zinc-700 px-3 text-sm text-white hover:bg-zinc-600 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={!canAddNewOtherTask}
          type="submit"
        >
          Add Task
        </button>
      </form>

      <Section title="Now">
        {droppedNowCount > 0 ? (
          <div className="mb-2 rounded-lg border border-amber-300 bg-amber-50 px-2 py-1 text-amber-700 text-sm">
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
            onAutoStartConsumed={(title) =>
              setAutoStartTitle((prev) => (prev === title ? null : prev))
            }
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
        <div className="mb-3 text-rose-500 text-xs">
          Task title already exists.
        </div>
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
    </>
  );
}
