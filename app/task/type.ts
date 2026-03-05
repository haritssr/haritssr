export interface Task {
  title: string;
  duration: number;
  progress: number;
  type: "Now" | "Other" | "Done";
}

export type TaskLike = Omit<Task, "type"> & { type: Task["type"] | "Queue" };

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
