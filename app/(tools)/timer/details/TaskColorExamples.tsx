import { taskAppearance } from "../_components/taskPresentation";
import TaskProgress from "../_components/TaskProgress";
import { allDayPeriod } from "../utils/timer";

const examples = [
  {
    label: "Running",
    running: true,
    paused: false,
    spent: 450,
    description: "Time is counting toward the duration.",
  },
  {
    label: "Paused",
    running: false,
    paused: true,
    spent: 300,
    description: "Time is saved. Continue when you are ready.",
  },
  {
    label: "Not started",
    running: false,
    paused: false,
    spent: 0,
    description: "The activity is ready to start.",
  },
] as const;

export default function TaskColorExamples() {
  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Example task colors"
    >
      {examples.map((example) => {
        const appearance = taskAppearance(
          example.running,
          example.paused,
          false
        );
        const task = {
          id: example.label,
          activity: example.label,
          description: example.description,
          duration: 900,
          period: allDayPeriod(),
          spent: example.spent,
          startedAt: null,
          reachedAt: null,
          notifiedAt: null,
        };
        return (
          <li
            key={example.label}
            className="corner-squircle border-border bg-background flex min-w-0 flex-col gap-5 rounded-xl border p-4 supports-[corner-shape:squircle]:rounded-2xl"
          >
            <div className="space-y-1.5">
              <p className="text-foreground font-medium">{example.label}</p>
              <p className="text-muted text-sm">{example.description}</p>
            </div>
            <div className="bg-interface-hover mt-auto rounded-lg p-3">
              <TaskProgress
                task={task}
                spent={example.spent}
                running={false}
                appearance={appearance}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
