"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";

// Mermaid chart definitions
const dataFlowChart = `
flowchart TD
    subgraph Browser["🌐 Browser (React Client)"]
        B1["TaskPage state<br/>tasks + UI state"]
        B2["Hydration: fetch GET /api/task"]
        B3["parseTasks + sanitizeTasks"]
        B4["Debounced save: PUT /api/task"]
        B5["Immediate save: sendBeacon POST /api/task"]
    end

    subgraph API["⚙️ API Route (Next.js)"]
        A1["app/api/task/route.ts"]
        A2["Validates task schema"]
        A3["getTasksForDate() / replaceTasksForDate()"]
    end

    subgraph DB["🗄️ Database (better-sqlite3)"]
        D1["db.ts: normalizeTask + sanitizeTasks"]
        D2["Table: daily_tasks"]
        D3["/Users/haritssyah/developer/.data-haritssr/task.db (WAL)"]
        D4["Replace strategy: DELETE → INSERT"]
    end

    B2 --> A1
    A1 --> A3
    A3 --> D1
    D1 --> D3
    B3 --> B1
    B4 --> A1
    B5 --> A1
`;

const taskStateChart = `
flowchart LR
    Other["📋 Other<br/>Backlog tasks"] -->|Do Now / Resume| Now
    Now["▶️ Now<br/>Active task"] -->|Done button OR data >= 100| Done
    Now -->|Do Now another task demotes current| Other

    style Other fill:#dbeafe,stroke:#3b82f6
    style Now fill:#ffedd5,stroke:#f97316
    style Done fill:#dcfce7,stroke:#22c55e
`;

const saveStrategiesChart = `
flowchart TD
    subgraph Regular["Regular Save (Debounced)"]
        R1["User action → setTasks()"] --> R2["500ms debounce timer"]
        R2 --> R3["Batch multiple updates"]
        R3 --> R4["fetch() PUT /api/task"]
    end

    subgraph Critical["Critical Save (Immediate)"]
        C1["Add task / Mark done / Move"] --> C2["Compute nextTasks"]
        C2 --> C3["setTasks(nextTasks)"]
        C3 --> C4["sendBeacon() immediately"]
    end

    subgraph Emergency["Emergency Save (Unload)"]
        E1["beforeunload OR visibilitychange"] --> E2["Cancel pending debounce"]
        E2 --> E3["sendBeacon() flush"]
    end

    subgraph Load["Load (Hydration)"]
        L1["Client mounts []"] --> L2["useEffect fetch GET /api/task"]
        L2 --> L3["parseTasks(body.tasks)"]
        L3 --> L4["sanitizeTasks(parsedTasks)"]
        L4 --> L5["setDroppedNowCount + setTasks"]
        L5 --> L6["isHydratedFromDb = true"]
    end
`;

const entityChart = `
flowchart TB
    subgraph Core["Core State"]
        tasks["tasks: Task[]"]
        hydrated["isHydratedFromDb"]
        dropped["droppedNowCount"]
        auto["autoStartTitle"]
        newTitle["newOtherTaskTitle"]
        newDuration["newOtherTaskDuration"]
        timeout["saveTimeoutRef"]
    end

    subgraph Derived["Derived State"]
        now["nowTasks"]
        other["otherTasks"]
        done["doneTasks"]
        canAdd["canAddNewOtherTask"]
    end

    subgraph Actions["Actions"]
        add["handleAddOtherTask"]
        mark["handleMarkDone"]
        doNow["handleDoNow"]
        move["handleMoveTask"]
        progress["handleProgressChange"]
        resume["handleResumeNow"]
    end

    subgraph Effects["Effects"]
        hydrate["hydrateTasksFromDb"]
        autosave["debounced PUT save"]
        emergencysave["visibility/unload sendBeacon"]
    end

    subgraph Item["TaskItem (Local State)"]
        running["isRunning"]
        timer["setInterval progress timer"]
    end

    subgraph External["External"]
        api["API: /api/task"]
        db["SQLite: /Users/haritssyah/developer/.data-haritssr/task.db"]
    end

    tasks --> Derived
    Core --> Actions
    Core --> Effects
    Effects --> api
    api --> db
    hydrate --> Core
`;

const derivedStateChart = `
flowchart LR
    tasks["tasks: Task[]"] -->|filter| nowTasks["nowTasks<br/>type=Now"]
    tasks -->|filter + sort| otherTasks["otherTasks<br/>type=Other<br/>sorted by progress desc"]
    tasks -->|filter| doneTasks["doneTasks<br/>type=Done"]

    tasks -->|compute| canAdd["canAddNewOtherTask<br/>title valid + duration valid + unique title"]
`;

const sideEffectsChart = `
flowchart LR
    subgraph PageEffects["TaskPage useEffect Hooks"]
        direction TB
        E1["[mount]<br/>Hydration"]
        E2["[tasks + hydrated]<br/>Debounced Auto-Save"]
        E3["[visibilitychange + beforeunload]<br/>Emergency Save"]
        E4["[cleanup]<br/>Flush pending save on unmount"]
    end

    subgraph ItemEffects["TaskItem useEffect Hooks"]
        direction TB
        I1["[autoStart + type + progress]<br/>Start timer if needed"]
        I2["[isRunning + progress + duration]<br/>setInterval progress tick"]
        I3["[progress/type]<br/>Stop timer at completion"]
    end

    E1 -->|fetch| GET["GET /api/task"]
    E2 -->|500ms debounce| PUT["PUT /api/task"]
    E3 -->|sendBeacon| POST["POST /api/task"]
    E4 -->|sendBeacon| POST
    I2 -->|setInterval| update["onProgressChange()"]
`;

const doneFlowChart = `
flowchart LR
    A["User clicks Done"] --> B["handleMarkDone"]
    B --> C["nextTasks = tasks.map<br/>set type=Done"]
    C --> D["setTasks(nextTasks)"]
    D --> E["React re-render"]
    E --> F["Derived recalculate"]
    F --> G["saveImmediately"]
    G --> H["sendBeacon()"]
    H --> I["POST /api/task"]
    I --> J["DELETE → INSERT"]
    J --> K["SQLite"]

    style A fill:#dbeafe
    style K fill:#dcfce7
`;

const fileStructureChart = `
flowchart TB
        subgraph Task["app/experiments/ui-explorations/task/"]
        page["page.tsx<br/>Main UI"]
        type["type.ts<br/>Type definitions"]
        data["data.ts<br/>Utilities"]
        db["db.ts<br/>SQLite operations"]
        stats["statistics/page.tsx"]
        hist["history/page.tsx"]
        arch["architecture/page.tsx"]
    end

    subgraph Api["app/api/task/"]
        route["route.ts<br/>GET, POST, PUT"]
    end

    subgraph Data["/Users/haritssyah/developer/.data-haritssr/"]
        taskdb["task.db<br/>SQLite database"]
    end

    page --> route
    route --> db
    db --> taskdb
    page --> type
    page --> data
`;

const fileRelationshipsChart = `
flowchart TD
    subgraph Types["📄 Types"]
        type["type.ts<br/>Task, TaskItemProps, TaskLike..."]
    end

    subgraph Utils["🔧 Utils"]
        data["data.ts<br/>sanitizeTasks, presets, template"]
    end

    subgraph DBLayer["🗄️ Database Layer"]
        db["db.ts<br/>SQLite operations"]
    end

    subgraph API["⚙️ API Route"]
        route["app/api/task/route.ts<br/>GET, PUT, POST"]
    end

    subgraph Pages["📱 Pages"]
        page["page.tsx<br/>Main task UI"]
        stats["statistics/page.tsx"]
        hist["history/page.tsx"]
        arch["architecture/page.tsx"]
    end

    type --> page
    type --> stats
    type --> hist
    type --> route

    data --> page
    data --> db

    db --> route

    route -.->|fetch| page
    route -.->|fetch| hist

    page -->|InternalLink| stats
    page -->|InternalLink| hist
    page -->|InternalLink| arch
`;

const typeSchemaChart = `
classDiagram
    class Task {
        +string title
        +number duration
        +number progress
        +type "Now" | "Other" | "Done"
    }

    class TaskLike {
        +string title
        +number duration
        +number progress
        +type "Now" | "Other" | "Done" | "Queue"
    }

    class TaskItemProps {
        +Task fields
        +boolean forceDonutProgress?
        +visualVariant "default" | "doneSection"?
        +boolean readOnly?
        +function onDoNow?
        +function onResumeNow?
        +function onDelete?
        +function onMarkDone?
        +function onMoveTask?
        +function onProgressChange?
        +boolean showZeroProgressBar?
        +boolean autoStart?
        +function onAutoStartConsumed?
    }

    class NowPrimaryAction {
        +function action?
        +string className
        +string label
    }

    class TaskActionsProps {
        +boolean canDoNow
        +boolean canDeleteTask
        +boolean canMarkNowTaskDone
        +boolean canMoveNowTask
        +boolean canResumeOtherTask
        +boolean canResetNowTask
        +boolean isNowTask
        +function onDelete
        +function onDoNow
        +function onResume
        +function onMarkDone
        +function onMoveToOther
        +function onReset
        +NowPrimaryAction primaryNowAction
    }

    Task <|-- TaskItemProps
    Task --> TaskLike : Omit(type) + Queue
    TaskActionsProps --> NowPrimaryAction
`;

const charts = [
  { id: "dataflow", title: "Data Flow", definition: dataFlowChart },
  { id: "taskstate", title: "Task State Flow", definition: taskStateChart },
  {
    id: "savestrategies",
    title: "Save Strategies",
    definition: saveStrategiesChart,
  },
  { id: "entity", title: "Entity Relationship", definition: entityChart },
  { id: "derived", title: "Derived State", definition: derivedStateChart },
  { id: "effects", title: "Side Effects", definition: sideEffectsChart },
  {
    id: "doneflow",
    title: 'Example: "User Clicks Done"',
    definition: doneFlowChart,
  },
  { id: "files", title: "File Structure", definition: fileStructureChart },
  {
    id: "relationships",
    title: "File Relationships",
    definition: fileRelationshipsChart,
  },
  { id: "typeschema", title: "Task Type Schema", definition: typeSchemaChart },
];

function MermaidDiagram({
  definition,
  id,
}: {
  definition: string;
  id: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          definition
        );

        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram"
          );
        }
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [definition, id]);

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-red-600 text-sm">
        Failed to render diagram: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-32 items-center justify-center rounded border border-zinc-200 bg-zinc-50">
        <div className="text-sm text-zinc-500">Loading diagram...</div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center overflow-x-auto rounded border border-zinc-200 bg-white p-4"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Mermaid generates safe SVG
      dangerouslySetInnerHTML={{ __html: svg }}
      ref={containerRef}
    />
  );
}

export default function TaskArchitecturePage() {
  return (
    <div className="pb-8">
      <Link
        className="mt-10 -mb-10 flex w-fit items-center text-action hover:text-action-hover"
        href="/experiments/ui-explorations/task"
      >
        <ChevronLeftIcon className="h-5 w-5 stroke-2" />
        Task
      </Link>
      <PageTitle title="Architecture" />
      <PageDescription description="How the task app works under the hood." />

      {/* Overview */}
      <div className="mb-8 rounded-xl border border-zinc-200 p-4">
        <h2 className="mb-2 font-semibold text-zinc-800">Overview</h2>
        <p className="text-sm text-zinc-600">
          A React-based task manager with SQLite persistence. The UI enforces a
          single active Now task by sanitizing task lists, hydrates from
          <code className="px-1">GET /api/task</code>, and saves via a mixed
          strategy: debounced <code className="px-1">PUT /api/task</code> for
          regular updates plus immediate{" "}
          <code className="px-1">sendBeacon POST /api/task</code> for critical
          and unload-safe persistence.
        </p>
      </div>

      {/* Task Logic */}
      <div className="mb-8 rounded-xl border border-zinc-200 p-4">
        <h2 className="mb-2 font-semibold text-zinc-800">Task Logic</h2>
        <div className="space-y-4 text-sm text-zinc-600">
          <div>
            <div className="font-medium text-zinc-700">Now</div>
            <ul className="list-disc pl-5">
              <li>Shows tasks with type Now.</li>
              <li>Only one Now task is allowed at a time.</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-zinc-700">Other</div>
            <ul className="list-disc pl-5">
              <li>Shows tasks with type Other.</li>
              <li>Sorted by highest progress first.</li>
              <li>
                Do Now moves Other to Now and demotes any existing Now to Other.
              </li>
              <li>Resume appears when progress is greater than 0.</li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-zinc-700">Done</div>
            <ul className="list-disc pl-5">
              <li>Shows tasks with type Done.</li>
              <li>
                Tasks become Done when progress reaches 100 or when manually
                marked done.
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium text-zinc-700">Task Schema</div>
            <ul className="list-disc pl-5">
              <li>title is a string.</li>
              <li>duration is a finite number.</li>
              <li>progress is a finite number.</li>
              <li>type is Now, Other, or Done.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Production Readiness Notes */}
      <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h2 className="mb-2 font-semibold text-amber-900">
          Production Readiness Notes
        </h2>
        <p className="text-sm text-zinc-700">
          The current implementation is functional but not production-ready
          without hardening in these areas:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
          <li>
            No authentication or access control on{" "}
            <code className="px-1">/api/task</code>.
          </li>
          <li>
            SQLite DB lives in{" "}
            <code className="px-1">
              /Users/haritssyah/developer/.data-haritssr/
            </code>{" "}
            (or <code className="px-1">TASK_DB_DIR</code>) and is not committed;
            production needs managed storage + backups.
          </li>
          <li>No schema migrations or versioning for the DB.</li>
          <li>No tests covering task logic, sanitization, or API handlers.</li>
          <li>No rate limiting or CSRF protection for write endpoints.</li>
          <li>Minimal error handling and observability (logging/metrics).</li>
        </ul>
      </div>

      {/* Mermaid Diagrams */}
      <div className="space-y-8">
        {charts.map((chart) => (
          <div key={chart.id}>
            <h2 className="mb-3 font-semibold text-zinc-800">{chart.title}</h2>
            <MermaidDiagram definition={chart.definition} id={chart.id} />
          </div>
        ))}
      </div>

      {/* Source State Reference */}
      <h2 className="mt-8 mb-3 font-semibold text-zinc-800">State Reference</h2>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded border border-blue-200 bg-blue-50 p-3">
          <code className="font-mono font-semibold text-blue-800 text-sm">
            tasks: Task[]
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Main source of truth. Updated by hydration, add, move, mark done,
            and progress updates.
          </p>
        </div>

        <div className="rounded border border-amber-200 bg-amber-50 p-3">
          <code className="font-mono font-semibold text-amber-800 text-sm">
            isHydratedFromDb
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Save gate. Debounced and emergency saves are enabled only after
            initial hydration completes.
          </p>
        </div>

        <div className="rounded border border-emerald-200 bg-emerald-50 p-3">
          <code className="font-mono font-semibold text-emerald-800 text-sm">
            droppedNowCount
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Hydration feedback count when multiple Now tasks are sanitized and
            extras are demoted to Other.
          </p>
        </div>

        <div className="rounded border border-cyan-200 bg-cyan-50 p-3">
          <code className="font-mono font-semibold text-cyan-800 text-sm">
            autoStartTitle
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Coordinates Resume action from Other to Now so the promoted task
            timer starts automatically.
          </p>
        </div>

        <div className="rounded border border-violet-200 bg-violet-50 p-3">
          <code className="font-mono font-semibold text-sm text-violet-800">
            newOtherTaskTitle
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Controlled input value for new Other task title.
          </p>
        </div>

        <div className="rounded border border-orange-200 bg-orange-50 p-3">
          <code className="font-mono font-semibold text-orange-800 text-sm">
            newOtherTaskDuration
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Controlled input value for new task duration used with presets and
            number field.
          </p>
        </div>

        <div className="rounded border border-slate-200 bg-slate-50 p-3">
          <code className="font-mono font-semibold text-slate-800 text-sm">
            saveTimeoutRef
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Tracks the pending debounce timer so critical and unload flows can
            cancel and flush safely.
          </p>
        </div>

        <div className="rounded border border-rose-200 bg-rose-50 p-3">
          <code className="font-mono font-semibold text-rose-800 text-sm">
            isRunning
          </code>
          <p className="mt-1 text-xs text-zinc-600">
            Local state inside TaskItem. Controls per-task interval ticks and
            start/stop behavior for Now tasks.
          </p>
        </div>
      </div>
    </div>
  );
}
