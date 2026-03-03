import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PageTitle } from "@/components/PageTitle";
import { getTaskHistory } from "../db";
import Section from "../Section";
import TaskItem from "../TaskItem";

export const dynamic = "force-dynamic";

export default function TaskHistoryPage() {
  const history = getTaskHistory();

  return (
    <div className="pb-8">
      <Link className="w-fit flex items-center text-blue-500 hover:text-blue-400 -mb-10 mt-10" href="/task">
        <ChevronLeftIcon className="stroke-2 h-5 w-5" />
        Task
      </Link>
      <PageTitle description="Record of daily tasks." title="History" />

      {history.length === 0 ? (
        <div className="rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-500">No task history yet.</div>
      ) : (
        <div className="space-y-4">
          {history.map((day) => (
            <Section key={day.date} title={day.date} titleMeta={`${day.doneCount}/${day.totalCount} done`}>
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
