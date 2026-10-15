import type { Task, TaskSavePayload } from "./type";

// Keep one writer per loaded snapshot, with an increasing order for every save.
export function createTaskSaveSession(date: string, revision: number) {
  const writerId = crypto.randomUUID();
  let sequence = 0;

  return {
    createPayload(tasks: readonly Task[]): TaskSavePayload {
      sequence += 1;
      return {
        date,
        tasks,
        version: { revision, writerId, sequence },
      };
    },
    isLatest(saveSequence: number): boolean {
      return sequence === saveSequence;
    },
  };
}
