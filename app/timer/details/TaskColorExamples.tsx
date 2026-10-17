import {
  TASK_VIEW_LAYOUT,
  taskAppearance,
} from "../components/taskPresentation";
import TaskProgress from "../components/TaskProgress";

const examples = [
  {
    label: "Running",
    running: true,
    paused: false,
    spent: 450,
    meaning: "danger",
    description: "Time is counting toward the duration.",
  },
  {
    label: "Paused",
    running: false,
    paused: true,
    spent: 300,
    meaning: "attention",
    description: "Time is saved. Continue when you are ready.",
  },
  {
    label: "Not started",
    running: false,
    paused: false,
    spent: 0,
    meaning: "success",
    description: "The activity is ready to start.",
  },
] as const;

export default function TaskColorExamples() {
  return (
    <ul
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="Example task colors"
    >
      {examples.map((example) => {
        const appearance = taskAppearance(
          "cards",
          example.running,
          example.paused,
          false
        );
        const task = {
          id: example.label,
          activity: example.label,
          description: example.description,
          duration: 900,
          spent: example.spent,
          startedAt: null,
          reachedAt: null,
          notifiedAt: null,
        };
        return (
          <li
            key={example.label}
            className={`flex min-w-0 flex-col gap-5 ${TASK_VIEW_LAYOUT.cards.surface} ${appearance.surface}`}
          >
            <div className="space-y-1.5">
              <p className="font-medium">{example.label}</p>
              <p className={`text-sm font-medium ${appearance.elapsed}`}>
                {example.meaning}
              </p>
              <p className="text-muted text-sm">{example.description}</p>
            </div>
            <div className="mt-auto">
              <TaskProgress
                task={task}
                spent={example.spent}
                running={false}
                view="cards"
                appearance={appearance}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
