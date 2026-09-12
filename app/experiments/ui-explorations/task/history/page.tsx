import { connection } from "next/server";

import BackButton from "@/components/BackButton";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";

import { getTaskHistory } from "../db";
import Section from "../Section";
import TaskItem from "../TaskItem";

export default async function TaskHistoryPage() {
  await connection();
  const history = getTaskHistory();

  return (
    <div className="pb-8">
      <BackButton href="/experiments/ui-explorations/task" name="Task" />
      <PageTitle>History</PageTitle>
      <PageDescription>Record of daily tasks.</PageDescription>

      {history.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500">
          No task history yet.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((day) => (
            <Section
              key={day.date}
              title={day.date}
              titleMeta={`${day.doneCount}/${day.totalCount} done`}
            >
              <div className="space-y-1.5">
                {day.tasks.map((task) => (
                  <TaskItem
                    key={`${day.date}-${task.title}`}
                    readOnly
                    {...task}
                  />
                ))}
              </div>
            </Section>
          ))}
        </div>
      )}
    </div>
  );
}
