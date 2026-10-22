import ExplanationList from "@/components/ExplanationList";
import FlowDiagram from "@/components/FlowDiagram";
import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/pageMetadata";

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
    TEXT task_presets "Nullable JSON array; 1 to 6 task templates"
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
          A daily activity timer for focusing, batching everyday tasks, and
          guarding your time. Learn how it works and where its code and data
          live.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="about-timer"
          title="About Timer"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Timer helps you set limits on activities such as social media
              scrolling, so they do not take more time than you intended.
            </li>
            <li>
              Timer is a daily activity tracker for focused work, learning,
              breaks, and everyday chores.
            </li>
            <li>
              Give each activity a time budget and see how much of it you have
              spent. Pause, resume, or finish early as your day changes.
            </li>
            <li>
              Focus on one activity at a time, or enable Multitask to track
              several together. Autoplay can start the next unfinished activity.
            </li>
            <li>
              Sound cues and completion messages help you notice when an
              activity is nearing or has reached its time budget.
            </li>
            <li>
              Activities are grouped by Jakarta calendar day. Daily history and
              a 30-day chart help you review where your time went.
            </li>
            <li>
              Sign in to use your personal Timer. Your activities and history
              are saved in your personal Turso database and shared across
              signed-in devices.
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
              groups activities by Asia/Jakarta day. Added tasks belong to that
              day only; each day starts empty.
            </li>
            <li>
              Add Task accepts a name up to 20 characters, an optional
              description up to 35, and a duration from one second to 24 hours,
              entered as hours, minutes, and seconds. Presets offer 5, 15, 30,
              and 60 minutes.
            </li>
            <li>
              The form prefills a random name and matching description, with
              focus in Name. Shift+N opens it on Timer when you are not typing
              or using another dialog.
            </li>
            <li>
              On mobile, Add and Edit open as bottom sheets at 90% of the screen
              height, with scrolling for longer content. From the small
              breakpoint upward, they use a centered, content-sized dialog.
              Field labels show character counts. Each Clear button has a hover
              hint, empties its field, and returns focus to it.
            </li>
            <li>
              Tasks use a card grid: one column on mobile, two from the small
              breakpoint, and three on desktop. Cards compare time spent with
              the duration. Start begins, Pause stops, and Continue resumes
              saved progress. Starting another task pauses the current one
              unless Multitask is enabled.
            </li>
            <li>
              Multitask runs tasks independently. Turning it off while several
              run asks for confirmation and keeps only the most recently started
              task running.
            </li>
            <li>
              Reaching the duration stops a task and marks it Reached. Done
              finishes early and preserves actual time spent.
            </li>
            <li>
              The adjustments icon beside the title opens Edit; the information
              icon shows the description on hover or click. Only unfinished
              tasks can be edited, and their new duration must exceed time
              spent. Older descriptions over 35 characters remain readable but
              must be shortened when saving an edit.
            </li>
            <li>
              Autoplay starts the next unfinished task after Done or Reached
              when none remain running, prioritizing paused tasks. It works
              while the site is open and stops when all tasks are complete.
            </li>
            <li>
              Turso remembers Multitask, Autoplay, and notification preferences
              across devices and reloads; Ticking remembers its setting in this
              browser across reloads and tabs.
            </li>
            <li>
              The speed control beside elapsed time cycles through 1x, 1.5x, 2x,
              2.5x, and 3x. Each task remembers its speed across pauses and
              reloads. At 2x, one real second counts as two; changing speed
              preserves progress, and statistics include accelerated time.
            </li>
            <li>
              Legacy JSON records may include X Traversal and House keeping,
              each with a one-hour budget. X Traversal covers bookmarks and
              scrolling; House keeping covers sweeping, mopping, watering
              plants, washing dishes, and cooking rice.
            </li>
          </ExplanationList>
        </Section>
        <Section id="task-colors" title="Task colors">
          <div className="max-w-3xl">
            <ExplanationList>
              <li>
                Danger means running, attention means paused, and success means
                not started. The timer and progress bar share the state color;
                completed tasks use muted colors.
              </li>
              <li>
                History sits below the active task grid and contains completed
                tasks. It starts collapsed; View opens the table and Hide closes
                it.
              </li>
              <li>
                The table shows descriptions, time spent, duration, percentage,
                and Reached or Done status. Sort by completion time, percentage,
                status, or time spent.
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
              Ticking plays one Quartz clock mechanical tick per second while
              any task runs, repeating at a single pitch. Tasks share the tick
              regardless of speed. It defaults off and remembers your choice
              across reloads in this browser.
            </li>
            <li>
              The same Quartz ticks play during the final 10 real seconds even
              with Ticking off, speeding up at 6 and 3 seconds remaining. They
              account for task speed and stop on pause or completion.
            </li>
            <li>
              Saved timestamps recover progress after navigation, reload, or
              closing the browser. Time spent never exceeds the task’s duration.
              At Jakarta midnight, the previous day stops counting; the new day
              starts with an empty task list.
            </li>
            <li>
              Shared timer state loads on every page, keeping ticking,
              completion alerts, and Autoplay active as you navigate.
            </li>
            <li>
              Outside Timer, a compact floating bar shows the task’s title,
              speed, elapsed time, and progress, with circular pause, continue,
              and finish controls. Click the title to return to Timer.
            </li>
            <li>
              With several running tasks, the task-count button cycles through
              them, starting with the most recently started. Pausing from the
              floating bar keeps that task available to resume for the session.
            </li>
            <li>
              The bar sits above mobile bottom navigation when present, or at
              the bottom right within the desktop page width. It matches the
              bottom navigation’s height and floats over content without
              reserving footer space.
            </li>
            <li>
              Completion shows an on-screen message; outside Timer, its Timer
              link returns to the page. Optional browser notifications also open
              or focus Timer when clicked.
            </li>
            <li>
              Alerts may arrive late when the browser is closed or suspended.
              There is no background scheduler or push service.
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
              to choose a date and review every activity’s description,
              duration, time spent, and status. The chart shows total time spent
              each day across 30 dates ending on the selected date. Dates
              without records contribute zero time.
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
              Timer stores personal tasks and history in Turso. Your signed-in
              devices share one database; browser storage and local JSON files
              are no longer runtime backends.
            </li>
            <li>
              The protected Next.js API verifies access before reading or
              changing personal records. Database credentials stay on the
              server.
            </li>
            <li>
              Atomic write transactions save task actions, preferences,
              completion claims, and Autoplay transitions. Reads are batched;
              normal actions save changed task rows instead of replacing the
              entire day. Only the winning completion claim produces feedback.
            </li>
            <li>
              Elapsed time is calculated from timestamps and speed, without
              saving every tick. Tasks stop counting at Jakarta midnight. New
              days start empty.
            </li>
            <li>
              Autoplay, Multitask, notification preferences, and presets sync
              across devices. Ticking, notification permission, and audio
              ownership stay local.
            </li>
            <li>
              Open pages refresh every 15 seconds and on focus. Changes from
              another device can take until the next refresh to appear.
            </li>
            <li>
              Export downloads a versioned JSON history backup without pausing
              live timers. Import restores paused copies, suppresses old alerts,
              adds missing or empty dates, and skips identical records. Any
              conflicting occupied date aborts the whole import. Backups are
              limited to 10 MB.
            </li>
            <li>
              Run <code>bun run migrate:timer</code> to initialize the schema.
              Add a backup file path to import it, or <code>--local-json</code>{" "}
              to import existing <code>data/timer/</code> records. Source files
              are preserved.
            </li>
            <li>
              Actions and settings update immediately while ordered requests
              save to Turso. Add and Edit close after validation; failed saves
              restore the confirmed state and keep form entries for reopening.
              An error offers Retry to refresh saved data, without automatically
              resending an uncertain write. Pending changes exist only in
              memory; saving requires connectivity. There is no offline writable
              database, push scheduler, or Autoplay execution while all pages
              are closed.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="proposed-turso-schema"
          title="Turso schema"
          description="Entity tables, column types, keys, and the day-to-task relationship."
        >
          <FlowDiagram
            definition={tursoSchemaDiagram}
            title="Personal Turso schema"
          />
          <div className="max-w-3xl">
            <ExplanationList>
              <li>
                The ERD shows primary keys (PK), foreign keys (FK), and unique
                keys (UK). Multiple marked columns form the composite keys
                described below. Each day has zero or more tasks; preferences
                are independent. Three tables serve one owner, with no user IDs
                or account table. A protected Next.js API verifies the
                configured Google owner; Turso credentials stay on the server.
              </li>
              <li>
                <code>timer_days</code>: <code>date</code> is the primary key,
                using Jakarta dates in <code>YYYY-MM-DD</code> format.
                <code> revision</code> tracks changes for concurrency control.
              </li>
              <li>
                <code>timer_tasks</code>: <code>id</code> preserves each task’s
                ID; the primary key is <code>(date, id)</code> because legacy
                recurring tasks reuse IDs on different dates. <code>date</code>{" "}
                references its day. An index on
                <code> (date, position)</code> supports daily lists and history;
                <code> position</code> preserves display and Autoplay order.
              </li>
              <li>
                Task content uses <code>activity</code>,{" "}
                <code>description</code>, and <code>duration_seconds</code>.
                Empty descriptions use an empty string; durations are whole
                seconds from 1 to 86,400. Existing longer descriptions remain
                importable, with current length limits applied to new edits.
              </li>
              <li>
                <code>spent_seconds</code> stores fractional progress before the
                current running interval; <code>speed</code> stores 1, 1.5, 2,
                2.5, or 3. Percentage, remaining time, status, and daily totals
                are calculated rather than saved on every tick.
              </li>
              <li>
                Nullable UTC timestamps record <code>started_at</code> for the
                current run, <code>last_started_at</code> for task selection,
                <code> completed_at</code> for Done or Reached, and
                <code> notification_claimed_at</code> for claiming completion
                alerts. The existing <code>reachedAt</code> field maps to
                <code> completed_at</code>.
              </li>
              <li>
                <code>timer_preferences</code> has one row, constrained to
                <code> id = 1</code>, with <code>revision</code>,
                <code> autoplay</code>, <code>multitask</code>, and
                <code> notifications_enabled</code>, plus nullable JSON columns
                <code> duration_presets</code> and <code>task_presets</code>.
                Duration preset lists contain 1–5 entries and task lists 1–6;
                missing values use defaults. Settings saves each list
                separately. Ticking, browser notification permission, and audio
                ownership stay device-local.
              </li>
              <li>
                Task changes, day revisions, and Autoplay transitions save in
                one transaction, with conditional completion claims to avoid
                duplicate handling across devices. A partial index on running
                tasks helps find timers spanning midnight.
              </li>
              <li>
                Existing browser backups and local JSON records can be imported
                using the migration command or Import. Turso is the
                authoritative store; there is no independently writable offline
                copy.
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
                One <code>timer_days</code> row contains zero or more{" "}
                <code>timer_tasks</code> rows. The task’s <code>date</code> is a
                foreign key; deleting a day also deletes its tasks.
              </li>
              <li>
                The composite task key <code>(date, id)</code> allows a
                recurring ID on different dates. Unique{" "}
                <code>(date, position)</code> preserves one task per position
                within each day.
              </li>
              <li>
                <code>timer_preferences</code> is independent and has one row
                with <code>id = 1</code>. Boolean settings use integers: 0 for
                off, 1 for on. Preset columns store JSON arrays and are added
                idempotently by <code>bun run migrate:timer</code> before
                deployment. Task presets fill New Task without creating a task
                until Done; changing presets never edits existing tasks.
                Nullable timestamp columns use ISO date-time text.
              </li>
              <li>
                Each imported daily JSON file becomes one day row, and each task
                becomes one task row. Array order becomes zero-based{" "}
                <code>position</code>; missing speed defaults to 1. Import does
                not replace preferences.
              </li>
              <li>
                JSON fields <code>duration</code> and <code>spent</code> map to
                seconds columns. <code>reachedAt</code> maps to{" "}
                <code>completed_at</code>, and <code>notifiedAt</code> maps to{" "}
                <code>notification_claimed_at</code>. Imported tasks are paused
                and old completion alerts are suppressed.
              </li>
            </ExplanationList>
          </div>
          <pre className="border-border bg-foreground/5 scrollbar-subtle overflow-x-auto rounded-md border p-4 text-sm">
            <code>{timerDatabaseStructure}</code>
          </pre>
        </Section>
        <Section
          id="code-relationships"
          title="Code relationships"
          description="How Timer’s files and functions work together, rendered with Pele. Each diagram has zoom controls, drag-to-pan, and a Full width view."
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
            Legacy files such as <code>data/timer/2026-10-16.json</code> can be
            imported once. They are preserved as migration sources; live records
            are stored in Turso.
          </p>
        </Section>
      </div>
    </>
  );
}
