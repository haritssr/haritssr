import ToolChangelog from "@/app/(tools)/_components/ToolChangelog";
import Accordion, { AccordionItem } from "@/components/Accordion";
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

const timerFlow = `flowchart TD
  accTitle: How Timer tracks and saves tasks
  accDescr: Timer and floating controls share one runtime that handles time, audio, and notifications. Changes go through the protected API to Turso, and saved state returns to the runtime. Statistics reads history through the same API.
  Timer["Timer and floating controls"] --> Runtime["Shared task state and clock"]
  Runtime --> Feedback["Progress, sounds, and notifications"]
  Runtime -->|save changes| API["Owner-only Timer API"]
  API --> Database[("Turso: tasks, history, and preferences")]
  Database -->|saved records| API
  API -->|saved state| Runtime
  Statistics["Statistics"] -->|read history| API
`;

export const metadata = createPageMetadata({
  title: "Timer Details",
  description:
    "Timer features, daily task rules, and how your progress is saved.",
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
          Track tasks, manage your time, and review your daily progress.
        </PageDescription>
      </PageHeader>
      <div className="space-y-16">
        <Section
          id="about-timer"
          title="What you can do"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li id="type-of-task">
              Set timers for focused work, breaks, and everyday tasks.
            </li>
            <li id="daily-activities">
              Add a task with a name, optional description, and duration, or
              fill it from a saved preset.
            </li>
            <li>
              Press Shift+N on Timer to open a blank task form when no field or
              dialog is active.
            </li>
            <li>Start, pause, resume, edit, or finish tasks early.</li>
            <li>
              Use Multitask to run tasks together or Autoplay to start the next
              unfinished task.
            </li>
            <li>
              Adjust timer speed from 1× to 3× and save your own duration and
              task presets.
            </li>
            <li id="time-and-notifications">
              Keep timers visible across the site and enable ticking sounds or
              completion notifications.
            </li>
            <li id="statistics">
              Review daily history and 30-day totals in{" "}
              <InternalLink href="/timer/statistic" variant="inline">
                Statistics
              </InternalLink>
              .
            </li>
            <li>
              Export your task history as a backup or import a previous backup.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="principles"
          title="What to know"
          contentClassName="max-w-3xl"
        >
          <ExplanationList>
            <li>
              Only the site owner can sign in to manage personal tasks; visitors
              can explore read-only examples.
            </li>
            <li>
              New Jakarta days start with your saved Daily Tasks, paused with
              fresh progress. Existing dates are preserved, and running tasks
              stop at midnight.
            </li>
            <li>
              Names allow 20 characters, descriptions allow 35, and durations
              range from one second to 24 hours.
            </li>
            <li>
              Settings → Daily Tasks lets you add, remove, reorder, and schedule
              your routine. Save applies to future days; Cancel discards the
              draft. Daily descriptions allow up to 2,000 characters.
            </li>
            <li>
              Daily tasks use real time at 1× and require a manual start. Their
              definitions cannot be changed or deleted from today’s cards.
              Finished daily cards stay visible; early Done tasks can be
              restored from History.
            </li>
            <li>
              Availability follows Jakarta time. Outside its window, a card is
              muted and its start control locks. A running task pauses at
              closing without changing its duration or reporting an unfinished
              task as complete.
            </li>
            <li>
              Starting a task pauses the others unless Multitask is on; turning
              it off keeps the most recently started task running.
            </li>
            <li>
              Done saves the time actually spent, while Reached means the full
              duration was used.
            </li>
            <li>
              Editing a task requires a duration longer than its time spent, and
              restoring a Done task keeps its progress paused.
            </li>
            <li>
              Autoplay prefers paused ordinary tasks, skips daily tasks, and
              needs an open page; completion alerts may be delayed if the
              browser closes or suspends.
            </li>
            <li id="storage">
              Tasks, presets, and preferences sync across signed-in devices when
              connected; ticking sounds stay local to each browser.
            </li>
            <li>
              Saving needs a connection; failed saves restore confirmed data and
              keep form drafts available for retry.
            </li>
            <li>
              Backups include task history up to 10 MB; imports restore paused
              tasks and reject conflicting dates.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="task-colors"
          title="Task states"
          description="Green means running, orange means paused, and neutral means ready to start."
        >
          <TaskColorExamples />
        </Section>
        <Section id="code-relationships" title="How it works">
          <p className="max-w-3xl">
            Timer and its floating controls share one task state across the
            site. Timestamps keep progress accurate without saving every second,
            while the server checks access and saves changes in Turso.
          </p>
          <FlowDiagram definition={timerFlow} title="Timer data flow" />
          <Accordion>
            <AccordionItem
              excludeFromContents
              title="Technical reference"
              value="technical-reference"
            >
              <div className="space-y-16">
                <Section
                  id="proposed-turso-schema"
                  title="Storage"
                  headingAs="h3"
                  contentClassName="max-w-3xl"
                >
                  <ExplanationList>
                    <li id="database-structure">
                      Days group tasks by Jakarta date; tasks store order,
                      duration, progress, speed, timestamps, and an optional
                      JSON availability window.
                    </li>
                    <li>
                      Preferences store Autoplay, Multitask, notifications,
                      presets, and JSON daily definitions, while database
                      triggers maintain daily totals. Migration leaves existing
                      task availability NULL; no new table is needed.
                    </li>
                    <li>
                      Revisions protect concurrent changes, and completion
                      claims prevent duplicate feedback across devices.
                    </li>
                    <li>
                      One visible tab coordinates polling and shares saved
                      updates; hidden tabs do not poll.
                    </li>
                    <li>
                      Unchanged polls check revisions and running deadlines,
                      then reuse confirmed tasks with fresh clock timing;
                      changes, completion, and midnight load a full snapshot.
                    </li>
                    <li>
                      Statistics reads the selected day, 30 daily totals, and
                      running tasks in that window in a read-only transaction.
                    </li>
                    <li>
                      Ticking and browser permissions stay local, and there is
                      no writable offline fallback.
                    </li>
                    <li>
                      Devices estimate server time from request timing,
                      excluding server processing; visible displays update on
                      the same second boundaries and refresh when a tab reopens.
                    </li>
                  </ExplanationList>
                </Section>
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
                      title={diagram.title}
                    />
                  </Section>
                ))}
                <Section
                  id="implementation-files"
                  title="Implementation files"
                  headingAs="h3"
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
                  headingAs="h3"
                >
                  <FileTable
                    caption="Timer integration file locations"
                    files={integrationFiles}
                  />
                </Section>
                <Section
                  id="daily-data-files"
                  title="Legacy data files"
                  headingAs="h3"
                  description="Previous local JSON records are migration sources; live tasks use Turso."
                >
                  <FileTable
                    caption="Timer daily data file locations"
                    files={storageFiles}
                  />
                </Section>
              </div>
            </AccordionItem>
          </Accordion>
        </Section>
        <ToolChangelog tool="timer" />
      </div>
    </>
  );
}
