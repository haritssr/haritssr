export interface Task {
  title: string;
  duration: number;
  progress: number;
  status: "Todo" | "Done";
  type: "Now" | "Other";
}

export type TaskLike = Omit<Task, "type"> & { type: Task["type"] | "Queue" };

type NowCounter = 0 | 1 | 2;

export type CountNowTasks<T extends readonly Task[], Count extends NowCounter = 0> = T extends readonly [infer Head, ...infer Tail]
  ? Head extends Task
    ? Head["type"] extends "Now"
      ? Count extends 0
        ? CountNowTasks<Extract<Tail, readonly Task[]>, 1>
        : CountNowTasks<Extract<Tail, readonly Task[]>, 2>
      : CountNowTasks<Extract<Tail, readonly Task[]>, Count>
    : Count
  : Count;

export type EnsureSingleNow<T extends readonly Task[]> = CountNowTasks<T> extends 2 ? never : T;

export type PersistedTask = Pick<Task, "title" | "progress" | "status">;

export interface TaskItemProps extends Task {
  forceDonutProgress?: boolean;
  visualVariant?: "default" | "doneSection";
  readOnly?: boolean;
  onDoNow?: (title: string) => void;
  onResumeNow?: (title: string) => void;
  onDelete?: (title: string) => void;
  onMarkDone?: (title: string) => void;
  onMoveTask?: (title: string, nextType: Extract<Task["type"], "Other">) => void;
  onProgressChange?: (title: string, progress: number) => void;
  showZeroProgressBar?: boolean;
  autoStart?: boolean;
  onAutoStartConsumed?: (title: string) => void;
}

export interface NowPrimaryAction {
  action?: () => void;
  className: string;
  label: string;
}

export interface TaskActionsProps {
  canDoNow: boolean;
  canDeleteTask: boolean;
  canMarkNowTaskDone: boolean;
  canMoveNowTask: boolean;
  canResumeOtherTask: boolean;
  canResetNowTask: boolean;
  isNowTask: boolean;
  onDelete: () => void;
  onDoNow: () => void;
  onResume: () => void;
  onMarkDone: () => void;
  onMoveToOther: () => void;
  onReset: () => void;
  primaryNowAction: NowPrimaryAction;
}
