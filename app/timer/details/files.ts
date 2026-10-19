export const implementationFiles = [
  ["app/timer/page.tsx", "Timer page header, introduction, and navigation."],
  [
    "app/timer/TimerClient.tsx",
    "Page composition: Today, toolbar, feedback, and task collection.",
  ],
  [
    "app/timer/components/TimerToolbar.tsx",
    "Notification and Autoplay switches, Cards/List selection, and New Task.",
  ],
  [
    "app/timer/components/TaskList.tsx",
    "Task sorting and the responsive card/list collection.",
  ],
  [
    "app/timer/components/TaskCard.tsx",
    "Card composition, title, description, progress, and completion message.",
  ],
  [
    "app/timer/components/TaskProgress.tsx",
    "Current time, duration, percentage, and progress bar.",
  ],
  [
    "app/timer/components/TaskActions.tsx",
    "Start, Continue, Pause, and Done buttons and their sounds.",
  ],
  [
    "app/timer/components/TaskDescription.tsx",
    "Description hover target, popover, and empty message.",
  ],
  [
    "app/timer/components/TaskDialog.tsx",
    "Add/Edit triggers, form submission, and validation.",
  ],
  [
    "app/timer/components/TaskFormDialog.tsx",
    "Shared Add/Edit modal, name and description fields, Cancel, and Save.",
  ],
  [
    "app/timer/components/DurationFields.tsx",
    "Duration number fields and the preset grid.",
  ],
  [
    "app/timer/components/taskPresentation.ts",
    "Card/list layout, spacing, borders, shadows, and state colors.",
  ],
  [
    "app/timer/components/useTaskState.ts",
    "The ticking clock and derived running, paused, and completed state.",
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

export const integrationFiles = [
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

export const storageFiles = [
  [
    "data/timer/YYYY-MM-DD.json",
    "One record per Jakarta calendar day, containing the date, revision, and activities.",
  ],
  [
    "data/timer/*.tmp",
    "Temporary files used during atomic writes, removed after saving.",
  ],
] as const;
