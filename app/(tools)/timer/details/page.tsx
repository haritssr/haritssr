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
              Add a task with a name, description, and duration, or fill it from
              a saved preset.
            </li>
            <li>
              On mobile, add tasks with the floating Add Task button above the
              bottom controls. Desktop keeps Add Task in the toolbar.
            </li>
            <li>
              Press Shift+N on Timer to open a blank task form when no field or
              dialog is active.
            </li>
            <li>Start, pause, resume, edit, or finish tasks early.</li>
            <li>
              The slim floating player shows remaining time, Done, and
              Play/Pause. Switch tasks when multiple timers are available.
            </li>
            <li>
              On mobile, scrolling down docks each player’s title and Play/Pause
              between minimized navigation and Search. Scroll up or expand
              navigation to restore full controls. Pages without bottom
              navigation keep full controls.
            </li>
            <li>
              Press Space on Timer to pause the most recently started task or
              resume it when no floating control takes priority.
            </li>
            <li>
              Space activates the topmost notification, retry, floating Music,
              or floating Timer, in that order.
            </li>
            <li>Every task advances by one second per real second.</li>
            <li>
              While a task runs, the Timer page’s browser tab shows its name and
              remaining time. With multiple tasks, it shows the one finishing
              soonest.
            </li>
            <li>
              Windowed tasks warn ten minutes before the latest safe start,
              using their remaining duration. A pulsing warning icon appears
              before Edit, turning red when there is not enough time to finish,
              with one reminder toast per task each day across devices. The red
              reminder stays visible until dismissed or the warning clears,
              showing the full task name and deadline guidance.
            </li>
            <li>
              Use Multitask to run tasks together or Autoplay to start the next
              unfinished task.
            </li>
            <li>Save your own duration and task presets.</li>
            <li>
              Task cards show controls beside the title and description. Mobile
              uses a progress ring beside stacked elapsed and remaining times;
              larger screens use a linear progress bar.
            </li>
            <li id="time-and-notifications">
              Keep timers visible across the site and enable ticking sounds or
              completion notifications.
            </li>
            <li id="statistics">
              Review daily history and 30-day totals in{" "}
              <InternalLink href="/timer/statistics" variant="inline">
                Statistics
              </InternalLink>
              .
            </li>
            <li>Export your task history as a backup.</li>
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
              Deadline warnings clear while a running task can finish on time,
              when it finishes, or when its window closes. If too little time
              remains, the message becomes “Not enough time.” The icon stays
              still with reduced motion. Reminders are silent, require an open,
              visible page, and appear on reopening if already due; they do not
              use system notifications or a background service.
            </li>
            <li>
              New Jakarta days start with your saved Daily Tasks, paused with
              fresh progress. Existing dates are preserved, and running tasks
              stop at midnight.
            </li>
            <li>
              Task names allow 25 characters and descriptions allow 36 when
              adding or editing. Durations range from one second to 24 hours.
            </li>
            <li>
              Settings → Daily Tasks lets you add, remove, reorder, and schedule
              up to 10 tasks in your routine. Save applies to future days;
              Cancel discards the draft. Daily descriptions allow up to 38
              characters.
            </li>
            <li>
              Daily tasks require a manual start. Editing a card changes only
              today’s task; its schedule and future-day definition stay the
              same. Daily cards cannot be deleted. Finished daily tasks move to
              History; early Done tasks can be restored while their window is
              open.
            </li>
            <li>
              Open History beside Settings to review today’s finished and missed
              tasks.
            </li>
            <li>
              Upcoming tasks start collapsed below available tasks. The Upcoming
              toggle displays their count and lets you expand or hide the cards.
              Tasks appear automatically when their window opens. Upcoming tasks
              collapse again when you reopen Timer or a new Jakarta day begins.
            </li>
            <li>
              When you open the page, running tasks come first, followed by
              available tasks with progress, unstarted tasks, and upcoming
              tasks. Higher percentages come first within each group; ties
              retain their saved order. Running tasks move to the top and stay
              ordered by percentage during your visit. Other cards keep their
              relative positions within the available or upcoming group, and new
              or restored available tasks appear before upcoming tasks. The
              order resets when you reopen the page or a new Jakarta day begins.
            </li>
            <li>
              Availability follows Jakarta time. Before its window, a card is
              muted and its start control locks. At closing, unfinished tasks
              move to History as Missed, preserving time spent without marking
              them complete. A running task pauses at closing.
            </li>
            <li>
              Starting a task pauses the others unless Multitask is on; turning
              it off keeps the most recently started task running.
            </li>
            <li>
              Done saves the time actually spent, while Met means the full
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
              If sync drops, loaded tasks remain visible while Timer reconnects
              automatically. Repeated failures show a Retry control. Failed
              saves keep your drafts and are never resent automatically.
            </li>
            <li>
              After a refresh, your browser may require a click, tap, or key
              press before ticking sounds resume. The countdown continues
              independently of sound.
            </li>
            <li>
              Saving needs a connection; failed saves restore confirmed data and
              keep form drafts available for retry.
            </li>
            <li>
              Backups contain task history as paused tasks. The command-line
              migration tool can restore them and rejects conflicting dates.
            </li>
          </ExplanationList>
        </Section>
        <Section
          id="task-colors"
          title="Task states"
          description="Red marks running tasks; other tasks use neutral colors."
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
                      duration, progress, timestamps, and an optional JSON
                      availability window. A separate deadline-reminder claim
                      timestamp prevents duplicate reminder toasts across
                      devices.
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
