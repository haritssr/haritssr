import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import { implementationFiles, integrationFiles, storageFiles } from "./files";
import FileTable from "./FileTable";
import { timerRelationships } from "./relationships";
import TaskColorExamples from "./TaskColorExamples";

const tursoSchemaDiagram = `erDiagram
  accTitle: Personal Timer Turso schema
  accDescr: Each timer day contains zero or more tasks, linked by date. Preferences are an independent singleton table. PK marks primary keys, FK marks foreign keys, and UK marks unique keys.
  timer_days ||--o{ timer_tasks : contains
  timer_days {
    TEXT date PK "Jakarta calendar date"
    INTEGER revision "NOT NULL; nonnegative"
  }
  timer_tasks {
    TEXT date PK,FK,UK "References timer_days.date; cascade delete"
    TEXT id PK "Composite primary key: date, id"
    INTEGER position UK "Unique pair: date, position"
    TEXT activity "NOT NULL"
    TEXT description "NOT NULL; empty string allowed"
    INTEGER duration_seconds "1 to 86400"
    REAL spent_seconds "0 to duration_seconds"
    REAL speed "1, 1.5, 2, 2.5, or 3"
    TEXT started_at "Nullable UTC timestamp"
    TEXT last_started_at "Nullable UTC timestamp"
    TEXT completed_at "Nullable UTC timestamp"
    TEXT notification_claimed_at "Nullable UTC timestamp"
  }
  timer_preferences {
    INTEGER id PK "Singleton: id = 1"
    INTEGER revision "NOT NULL; default 0"
    INTEGER autoplay "Boolean; default 0"
    INTEGER multitask "Boolean; default 0"
    INTEGER notifications_enabled "Boolean; default 1"
    TEXT duration_presets "Nullable JSON array; defaults to 5, 15, 30, 60 minutes"
    TEXT task_presets "Nullable JSON array; 1 to 10 task templates"
  }
`;

const timerDatabaseStructure = `CREATE TABLE timer_days (
  date TEXT PRIMARY KEY,
  revision INTEGER NOT NULL CHECK(revision >= 0)
);

CREATE TABLE timer_tasks (
  id TEXT NOT NULL,
  date TEXT NOT NULL REFERENCES timer_days(date) ON DELETE CASCADE,
  position INTEGER NOT NULL CHECK(position >= 0),
  activity TEXT NOT NULL,
  description TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL CHECK(duration_seconds BETWEEN 1 AND 86400),
  spent_seconds REAL NOT NULL CHECK(spent_seconds >= 0 AND spent_seconds <= duration_seconds),
  speed REAL NOT NULL DEFAULT 1 CHECK(speed IN (1, 1.5, 2, 2.5, 3)),
  started_at TEXT,
  last_started_at TEXT,
  completed_at TEXT,
  notification_claimed_at TEXT,
  PRIMARY KEY(date, id),
  UNIQUE(date, position)
);

CREATE INDEX timer_tasks_date_position ON timer_tasks(date, position);
CREATE INDEX timer_tasks_running ON timer_tasks(date)
  WHERE started_at IS NOT NULL;
CREATE INDEX timer_tasks_pending_notice ON timer_tasks(date)
  WHERE completed_at IS NOT NULL AND notification_claimed_at IS NULL;

CREATE TABLE timer_preferences (
  id INTEGER PRIMARY KEY CHECK(id = 1),
  revision INTEGER NOT NULL DEFAULT 0,
  autoplay INTEGER NOT NULL DEFAULT 0 CHECK(autoplay IN (0, 1)),
  multitask INTEGER NOT NULL DEFAULT 0 CHECK(multitask IN (0, 1)),
  notifications_enabled INTEGER NOT NULL DEFAULT 1 CHECK(notifications_enabled IN (0, 1)),
  duration_presets TEXT,
  task_presets TEXT
);`;

export const metadata = createPageMetadata({
  title: "Details",
  description:
    "How Timer works, its personal Turso storage, and source file locations.",
  path: "/timer/details",
});

export default function TimerDetailsPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/timer", name: "Timer" }}
        path="/timer/details"
      >
        <PageTitle>Details</PageTitle>
        <PageDescription>
          How Timer works, saves data, and connects to the site.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section id="principles" title="Logics" contentClassName="max-w-3xl">
          <ExplanationList>
            <li>Human activity fundamentally a task</li>
            <li>Without a task, human become death</li>
            <li>Task needs time</li>
            <li>Human time are limited</li>
            <li>
              Task management is scheduling problem, not performance problem
            </li>
            <li>
              Certain arranggement of task schedulling can consume different
              time and mental energy profile, eventhough those tasks have same
              definition and time requirement
            </li>
            <li>Certain task should only be doing at certain period of time</li>
            <li>
              Batching (interrupt coalescing) is the most optimal schedulling
              optimization method
            </li>
            <li>
              Certain tasks should be doing repeatedly every certain period
              because that&apos;s what maintain an identity
            </li>
            <li>Task is fundamentally computation</li>
            <li>
              Maintaining task is an act of traversing computational
              irreducibility
            </li>
            <li>
              Certain computational level need constant computation to maintain
              it&apos;s state
            </li>
            <li>Some task delegated to machine</li>
            <li>
              Human brain have limited cognitive loads capacity
              <ExplanationList>
                <li>
                  Batching is a way to optimize it (reduce), so we can quickly
                  back to rest state
                </li>
              </ExplanationList>
            </li>
            <li>
              When human can&apos;t have too much energy, time, and brain
              capacity, but want to live in certain computational level, they
              must be delegate, either to other human or computer/robots. To
              delegate to human, they need to pay money, no every human have
              money, but we can delegate certain task to computer/robots
            </li>
            <li>
              Schedulling is a way to minimize decision fatigue, jumping to
              certain computation level, so we don&apos;t spend to much time in
              low level computation
            </li>
            <li>
              Computation level correspondent with quality of living or
              capability
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="type-of-task"
          title="Type of Task"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Quick Task
              <ExplanationList>
                <li>Short break, Long break</li>
              </ExplanationList>
            </li>
            <li>
              Repeateted Task
              <ExplanationList>
                <li>
                  Daily
                  <ExplanationList>
                    <li>
                      Shower, water plants, housekeeping, cooking, meditation
                    </li>
                  </ExplanationList>
                </li>
                <li>
                  Weekly
                  <ExplanationList>
                    <li>Curate notes,</li>
                  </ExplanationList>
                </li>
                <li>
                  Monthly
                  <ExplanationList>
                    <li>Electricity bill, trash fee, internet</li>
                  </ExplanationList>
                </li>
              </ExplanationList>
            </li>
            <li>
              Long Task
              <ExplanationList>
                <li>Task that cannot be done in one session</li>
                <li>Reading books, reading articles,</li>
              </ExplanationList>
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="about-timer"
          title="About Timer"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>Set time limits for work, breaks, and everyday tasks.</li>
            <li>Track activities and review your daily time spent.</li>
            <li>Pause, resume, or finish an activity early.</li>
            <li>
              Use Multitask to run activities together, or Autoplay to start the
              next one.
            </li>
            <li>
              Sounds and messages warn you before time runs out and when it
              ends.
            </li>
            <li>
              Activities follow Jakarta calendar days. Statistics cover 30 days.
            </li>
            <li>
              Sign in to save activities in your personal Turso database and
              sync across devices.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="daily-activities"
          title="Daily activities"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              <InternalLink href="/timer" variant="inline">
                Timer
              </InternalLink>{" "}
              groups tasks by Jakarta date. Each day starts empty.
            </li>
            <li>
              Add a name (20 characters), optional description (35 characters),
              and duration (one second to 24 hours). Default presets are 5, 15,
              30, and 60 minutes.
            </li>
            <li>
              Add Task suggests a name and description. Press Shift+N on Timer
              to open it when no field or dialog is active.
            </li>
            <li>
              Add and Edit use bottom sheets on mobile and centered dialogs on
              larger screens. Fields show character counts and Clear controls.
            </li>
            <li>
              Start, Pause, and Continue control progress. Starting a task
              pauses the current one unless Multitask is on.
            </li>
            <li>
              Turning off Multitask asks for confirmation and keeps only the
              most recently started task running.
            </li>
            <li>
              Reached marks a task that used its full duration. Done finishes
              early and saves actual time spent.
            </li>
            <li>
              Use the adjustments icon to edit an unfinished task. Its duration
              must exceed time spent. Older descriptions must meet the current
              limit when edited.
            </li>
            <li>
              Autoplay starts the next unfinished task when none are running,
              prioritizing paused tasks. The site must stay open.
            </li>
            <li>
              Multitask, Autoplay, and notification settings sync across
              devices. Ticking stays in this browser.
            </li>
            <li>
              Speed cycles through 1x, 1.5x, 2x, 2.5x, and 3x. Changes preserve
              progress; statistics count accelerated time.
            </li>
            <li>
              Legacy backups may include the one-hour X Traversal and House
              keeping tasks.
            </li>
          </ExplanationList>
        </Section>
        <Section id="task-colors" title="Task colors">
          <div className="max-w-3xl">
            <ExplanationList>
              <li>
                Running tasks use green-600. Paused, not started, and completed
                tasks use dark zinc through the foreground token.
              </li>
              <li>
                History lists completed tasks below the grid. Use View or Hide
                to toggle it.
              </li>
              <li>
                History shows descriptions, time spent, duration, percentage,
                and completion status, with sortable columns.
              </li>
            </ExplanationList>
          </div>
          <TaskColorExamples />
        </Section>
        <Section
          id="time-and-notifications"
          title="Time and notifications"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Select the clock in the Timer header to open the full clock. Its
              Sound checkbox adds a quartz tick each second without a running
              task. It starts off, pauses while the page is hidden, and stops
              when you leave Clock.
            </li>
            <li>
              Ticking plays once per real second while tasks run. It defaults
              off and remembers your choice in this browser.
            </li>
            <li>
              Countdown ticks play during the final 10 real seconds, even with
              Ticking off, and speed up at 6 and 3 seconds remaining.
            </li>
            <li>
              Timestamps recover progress after navigation, reload, or closing
              the browser. Tasks stop counting at Jakarta midnight and never
              exceed their duration.
            </li>
            <li>
              Timers, sounds, alerts, and Autoplay continue as you navigate the
              site.
            </li>
            <li>
              Outside Timer, a floating bar shows progress and task controls.
              Click its title to return to Timer.
            </li>
            <li>
              The task-count control cycles through running tasks. A task paused
              from the bar stays available to resume during that session.
            </li>
            <li>
              The bar sits above mobile navigation or at the bottom right on
              desktop. It overlays page content.
            </li>
            <li>
              Completion shows an on-screen message. Optional browser
              notifications open or focus Timer when clicked.
            </li>
            <li>
              Alerts can be delayed when the browser is closed or suspended.
              There is no background push service.
            </li>
          </ExplanationList>
        </Section>
        <Section id="statistics" title="Statistics">
          <div className="max-w-3xl space-y-5">
            <p>
              Open{" "}
              <InternalLink href="/timer/statistic" variant="inline">
                Statistics
              </InternalLink>{" "}
              to review tasks by date and daily time spent across 30 days. Days
              without records count as zero.
            </p>
          </div>
        </Section>
        <Section
          id="storage"
          title="Database and storage"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Turso stores personal tasks and history across signed-in devices.
            </li>
            <li>
              The API checks access to personal records. Database credentials
              stay on the server.
            </li>
            <li>
              Transactions save actions, preferences, and Autoplay changes
              together. Completion claims prevent duplicate alerts.
            </li>
            <li>
              Progress comes from timestamps and speed, without saving every
              tick. Tasks stop at Jakarta midnight.
            </li>
            <li>
              Preferences and presets sync across devices. Ticking, notification
              permission, and audio ownership stay local.
            </li>
            <li>
              One visible owner tab polls every 30 seconds while running or two
              minutes while idle and shares snapshots with other tabs. Browsers
              without Web Locks or tab messaging poll independently. Pages
              refresh on focus; hidden tabs and anonymous previews do not poll.
              Completion and midnight checks keep their scheduled timing.
            </li>
            <li>
              Snapshot queries use indexes to read today and dates with running
              tasks or unclaimed notifications. Statistics adds only its 30-day
              window. Full-history reads are reserved for backups and imports.
            </li>
            <li>
              Export backs up history without pausing timers. Import restores
              paused copies, skips identical dates, and rejects the whole import
              if a date conflicts. Maximum file size: 10 MB.
            </li>
            <li>
              Run <code>bun run migrate:timer</code> to initialize storage. Add
              a backup path or <code>--local-json</code> to import legacy
              records; source files are preserved.
            </li>
            <li>
              Changes appear immediately while saving. Failed saves restore
              confirmed data and retain form drafts. Retry refreshes saved data.
              Saving needs connectivity; Autoplay needs an open page.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="proposed-turso-schema"
          title="Turso schema"
          description="Tables, keys, and relationships."
        >
          <FlowDiagram
            definition={tursoSchemaDiagram}
            title="Personal Turso schema"
          />
          <div className="max-w-3xl">
            <ExplanationList>
              <li>
                Each day has tasks; preferences are separate. PK, FK, and UK
                mark primary, foreign, and unique keys. The database serves one
                configured Google owner.
              </li>
              <li>
                <code>timer_days</code> uses a Jakarta date as its primary key
                and a revision for concurrency control.
              </li>
              <li>
                <code>timer_tasks</code> uses <code>(date, id)</code> as its
                primary key. Position sets display and Autoplay order.
              </li>
              <li>
                Tasks store a name, description, and duration of 1–86,400 whole
                seconds. Older descriptions remain importable.
              </li>
              <li>
                <code>spent_seconds</code> stores progress before the current
                run; <code>speed</code> stores the multiplier. Remaining time,
                status, and totals are calculated.
              </li>
              <li>
                Nullable UTC timestamps track the current run, last start,
                completion, and notification claim. Backup{" "}
                <code>reachedAt</code> maps to <code>completed_at</code>.
              </li>
              <li>
                <code>timer_preferences</code> has one row for settings and JSON
                presets: 1–5 durations and 1–10 tasks. Missing presets use
                defaults; each list saves separately.
              </li>
              <li>
                Task changes, revisions, and Autoplay save together. Atomic
                claims prevent duplicate completion handling.
              </li>
              <li>
                Import backups or legacy JSON through Import or the migration
                command. Turso is the authoritative store.
              </li>
            </ExplanationList>
          </div>
        </Section>
        <Section
          id="database-structure"
          title="Database structure"
          description="The three SQLite tables used by Timer in Turso."
        >
          <div className="max-w-3xl">
            <ExplanationList>
              <li>
                <code>timer_tasks.date</code> references{" "}
                <code>timer_days.date</code>. Deleting a day deletes its tasks.
              </li>
              <li>
                The primary key <code>(date, id)</code> allows recurring IDs
                across dates. <code>(date, position)</code> is unique within a
                day.
              </li>
              <li>
                <code>timer_preferences</code> has one row, with{" "}
                <code>id = 1</code>. Booleans use 0 or 1; presets use JSON;
                timestamps use ISO text. Migration adds preset columns safely.
                Presets fill the task form without changing existing tasks.
              </li>
              <li>
                Import maps each daily JSON file to a day and its tasks. Array
                order becomes position; missing speed defaults to 1. Preferences
                stay unchanged.
              </li>
              <li>
                Backup duration and spent fields map to seconds; reachedAt and
                notifiedAt map to completion and notification timestamps.
                Imported tasks are paused and old alerts suppressed.
              </li>
            </ExplanationList>
          </div>
          <pre className="border-border bg-foreground/5 scrollbar-subtle overflow-x-auto rounded-md border p-4 text-sm">
            <code>{timerDatabaseStructure}</code>
          </pre>
        </Section>
        <Section
          id="code-relationships"
          title="How this works"
          description="Shared rules connect optimistic changes to saved records. Controls subscribe to the state they use; separate hooks handle audio and refresh deadlines. Zoom, pan, or open a full-width view."
        >
          <div className="space-y-10">
            {timerRelationships.map((diagram) => (
              <Section
                key={diagram.id}
                id={diagram.id}
                title={diagram.title}
                headingAs="h3"
                description={diagram.description}
              >
                <FlowDiagram
                  definition={diagram.definition}
                  legend={
                    <ul className="ml-3 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                      <li className="before:bg-action flex items-center gap-2 before:size-2 before:shrink-0 before:rounded-full">
                        UI &amp; pages
                      </li>
                      <li className="before:bg-attention flex items-center gap-2 before:size-2 before:shrink-0 before:rounded-full">
                        Shared state &amp; time
                      </li>
                      <li className="before:bg-success flex items-center gap-2 before:size-2 before:shrink-0 before:rounded-full">
                        Server &amp; storage
                      </li>
                      <li className="before:bg-danger flex items-center gap-2 before:size-2 before:shrink-0 before:rounded-full">
                        Scheduling &amp; feedback
                      </li>
                    </ul>
                  }
                  title={diagram.title}
                />
                <div className="max-w-3xl">
                  <ExplanationList>
                    {diagram.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ExplanationList>
                </div>
              </Section>
            ))}
          </div>
        </Section>
        <Section
          id="implementation-files"
          title="Implementation files"
          description="Paths are relative to the project root."
        >
          <FileTable
            caption="Timer implementation file locations"
            files={implementationFiles}
          />
        </Section>
        <Section
          id="integration-files"
          title="Integration files"
          description="Shared files that connect Timer to the rest of the site."
        >
          <FileTable
            caption="Timer integration file locations"
            files={integrationFiles}
          />
        </Section>
        <Section
          id="daily-data-files"
          title="Legacy data files"
          description="Previous local JSON records remain available as migration sources."
        >
          <FileTable
            caption="Timer daily data file locations"
            files={storageFiles}
          />
          <p className="max-w-3xl">
            Import legacy JSON files once; live records are stored in Turso.
          </p>
        </Section>
      </div>
    </>
  );
}
