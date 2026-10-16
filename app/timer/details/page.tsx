import InternalLink from "@/components/InternalLink";
import PageDescription from "@/components/PageDescription";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import Section from "@/components/Section";
import Table from "@/components/Table";
import { createPageMetadata } from "@/utils/pageMetadata";

export const metadata = createPageMetadata({
  title: "Details",
  description: "How Timer works, its daily storage, and source file locations.",
  path: "/timer/details",
});

const implementationFiles = [
  ["app/timer/page.tsx", "Timer page header, introduction, and navigation."],
  [
    "app/timer/TimerClient.tsx",
    "Activity cards, progress, controls, and the add-task dialog.",
  ],
  [
    "app/timer/store.ts",
    "Daily JSON storage, task operations, midnight rollover, and history.",
  ],
  ["app/timer/statistic/page.tsx", "Statistics page header and metadata."],
  [
    "app/timer/statistic/Statistics.tsx",
    "Date selection, the 30-day chart, and activity history.",
  ],
  ["app/timer/details/page.tsx", "This explanation and file inventory."],
  [
    "app/api/timer/route.ts",
    "GET and POST handlers for Timer data and actions.",
  ],
  [
    "components/TimerProvider.tsx",
    "Shared state, server synchronization, and completion notifications.",
  ],
  [
    "utils/timer.ts",
    "Types, time calculations, recurring defaults, and sample data generation.",
  ],
  [
    "utils/timerValidation.ts",
    "Validation schemas for stored records and API messages.",
  ],
  [
    "scripts/seed-timer.ts",
    "Creates sample history for the previous 30 completed days.",
  ],
] as const;

const integrationFiles = [
  [
    "app/layout.tsx",
    "Mounts TimerProvider so a running activity survives page navigation.",
  ],
  ["app/page.tsx", "Links to Timer from the Home Tools section."],
  ["app/api/page.tsx", "Documents the Timer API."],
  ["app/sitemap.ts", "Includes the public Timer pages in the sitemap."],
  ["data/routes.ts", "Makes Timer pages available in site search."],
  [
    "public/sw.js",
    "Opens or focuses Timer when a completion notification is clicked.",
  ],
  [
    "next.config.ts",
    "Excludes personal Timer records from deployment tracing.",
  ],
  ["package.json", "Defines the seed:timer command."],
  ["knip.jsonc", "Registers the seed script as an operational entry point."],
  [
    ".gitignore",
    "Excludes daily JSON records and temporary storage files from Git.",
  ],
  ["README.md", "Documents Timer behavior, storage, and notification support."],
] as const;

const storageFiles = [
  [
    "data/timer/YYYY-MM-DD.json",
    "One record per Jakarta calendar day, containing the date, revision, and activities.",
  ],
  [
    "data/timer/*.tmp",
    "Temporary files used during atomic writes, removed after saving.",
  ],
] as const;

function FileTable({
  caption,
  files,
}: {
  caption: string;
  files: readonly (readonly [string, string])[];
}) {
  return (
    <Table>
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="bg-foreground/5">
          <th className="px-3 text-left font-medium" scope="col">
            File location
          </th>
          <th className="px-3 text-left font-medium" scope="col">
            Purpose
          </th>
        </tr>
      </thead>
      <tbody className="divide-border divide-y">
        {files.map(([path, purpose]) => (
          <tr key={path}>
            <th
              className="px-3 py-3 text-left align-top font-normal"
              scope="row"
            >
              <code className="wrap-anywhere">{path}</code>
            </th>
            <td className="px-3 py-3 align-top">{purpose}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

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
              time. Only one activity runs at once; starting another pauses the
              current one. At its duration, the activity stops and is marked
              Reached.
            </p>
            <p>
              X and House keeping appear every day with a one-hour budget each.
              X is for bookmarks and scrolling; House keeping covers sweeping,
              mopping, watering plants, washing dishes, and cooking rice.
              Activities you add belong to that day only.
            </p>
          </div>
        </Section>
        <Section id="time-and-notifications" title="Time and notifications">
          <div className="max-w-3xl space-y-5">
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
