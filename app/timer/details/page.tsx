import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import { createPageMetadata } from "@/utils/pageMetadata";

import { implementationFiles, integrationFiles, storageFiles } from "./files";
import FileTable from "./FileTable";
import TaskColorExamples from "./TaskColorExamples";

export const metadata = createPageMetadata({
  title: "Details",
  description: "How Timer works, its daily storage, and source file locations.",
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
        <Section id="daily-activities" title="Daily activities">
          <div className="max-w-3xl space-y-5">
            <p>
              <InternalLink href="/timer" variant="inline">
                Timer
              </InternalLink>{" "}
              shows today’s activities in Asia/Jakarta time. Add an activity
              with a name, an optional description, and a duration in hours,
              minutes, and seconds. The duration must be between one second and
              24 hours.
            </p>
            <p>
              Each card shows time spent against its duration. Start begins an
              activity, Pause stops it, and Continue resumes from the saved
              time. By default, starting another activity pauses the current
              one. Enable Multitask to run several activities independently.
              Turning it off with multiple running activities asks for
              confirmation, then keeps only the most recently started activity
              running. Multitask and Autoplay reset on reload. At its duration,
              the activity stops and is marked Reached. With Autoplay enabled,
              Done or a duration completion starts the next unfinished activity
              when no activities remain running, prioritizing paused activities.
              Autoplay runs while the site is open and stops when all activities
              are complete.
            </p>
            <p>
              The underlined speed control beside Description cycles through 1x,
              1.5x, 2x, 2.5x, and 3x, then returns to 1x. Each activity saves
              its own speed across pauses and reloads. At 2x, every real second
              adds two seconds toward its duration. Changing speed preserves
              existing progress; statistics include accelerated task time.
            </p>
            <p>
              X and House keeping appear every day with a one-hour budget each.
              X is for bookmarks and scrolling; House keeping covers sweeping,
              mopping, watering plants, washing dishes, and cooking rice.
              Activities you add belong to that day only.
            </p>
          </div>
        </Section>
        <Section id="task-colors" title="Task colors">
          <div className="max-w-3xl space-y-5">
            <p>
              Task colors show each activity’s current state: danger means it is
              running, attention means it is paused, and success means it has
              not started. Completed activities use muted colors and appear in
              the completed tasks table. The progress bar uses the same state
              color as the timer.
            </p>
          </div>
          <TaskColorExamples />
        </Section>
        <Section id="time-and-notifications" title="Time and notifications">
          <div className="max-w-3xl space-y-5">
            <p>
              Enable Ticking in the toolbar for a clock tick each second while
              any task runs. It defaults off and resets on reload. Multiple
              tasks share one tick, and task speed does not change its cadence.
            </p>
            <p>
              Running time is calculated from saved timestamps, so it can
              recover after navigating away, reloading, or closing the browser.
              Time spent never exceeds the activity’s duration. At midnight in
              Jakarta, the previous day stops counting and a new day begins with
              the recurring activities.
            </p>
            <p>
              Completion appears as an on-screen message. You can also enable
              browser notifications. Alerts may arrive late while the browser is
              closed or suspended; there is no background scheduler or push
              service. Clicking a system notification opens or focuses Timer.
            </p>
          </div>
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
        <Section id="storage" title="Storage and sample data">
          <div className="max-w-3xl space-y-5">
            <p>
              In local development, one JSON file stores each day under{" "}
              <code>data/timer/</code>. Records include each activity’s
              duration, accumulated time, running timestamp, and completion
              information. Writes are serialized by one local server process and
              saved atomically. These personal files are ignored by Git.
            </p>
            <p>
              Run <code>bun run seed:timer</code> to create realistic sample
              history for the previous 30 completed days. Existing records are
              preserved. Sample history is generated data, rather than measured
              activity.
            </p>
            <p>
              The deployed app displays a read-only generated preview. It does
              not read personal JSON files or accept activity changes. Personal
              records are also excluded from deployment tracing.
            </p>
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
          title="Daily data files"
          description="File names follow the calendar date, so the inventory grows as you use Timer."
        >
          <FileTable
            caption="Timer daily data file locations"
            files={storageFiles}
          />
          <p className="max-w-3xl">
            For example, <code>data/timer/2026-10-16.json</code> stores
            activities for 16 October 2026 in Jakarta time. Each date uses the
            same naming pattern; personal records are not listed or loaded by
            this page.
          </p>
        </Section>
      </div>
    </>
  );
}
