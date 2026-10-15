import { connection } from "next/server";

import LabPageHeader from "@/components/LabPageHeader";
import PageDescription from "@/components/PageDescription";
import { createPageMetadata } from "@/utils/pageMetadata";

import { getTaskHistory } from "../db";
import Section from "../Section";
import TaskItem from "../TaskItem";

export const metadata = createPageMetadata({
  title: "Task History",
  description: "A record of daily tasks and completed work.",
  path: "/labs/user-interface/task/history",
});

export default async function TaskHistoryPage() {
  await connection();
  const history = getTaskHistory();

  return (
    <div className="pb-8">
      <LabPageHeader
        back={{ href: "/labs/user-interface/task", name: "Task" }}
        title="History"
      >
        <PageDescription>Record of daily tasks.</PageDescription>
      </LabPageHeader>

      {history.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500">
          No task history yet.
        </div>
      ) : (
        <div className="space-y-16">
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
