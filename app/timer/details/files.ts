export const implementationFiles = [
  ["app/timer/page.tsx", "Timer page header, introduction, and navigation."],
  [
    "app/timer/TimerClient.tsx",
    "Page composition: Today, toolbar, feedback, and task collection.",
  ],
  [
    "app/timer/components/TimerDataControls.tsx",
    "Icon-only toolbar Export/Import actions, authentication, and backup errors.",
  ],
  [
    "app/timer/components/TimerToolbar.tsx",
    "Notification, Autoplay, Multitask, and Ticking switches, backup icons, and Add Task.",
  ],
  [
    "app/timer/components/TaskList.tsx",
    "Shared task clock, state calculation, and active/completed collections.",
  ],
  [
    "app/timer/components/CompletedTasksTable.tsx",
    "Collapsed History table, View/Hide controls, sorting, and completion status.",
  ],
  [
    "app/timer/components/TaskCard.tsx",
    "Three-column desktop cards, header icons, progress/speed, and icon actions.",
  ],
  [
    "app/timer/components/TaskProgress.tsx",
    "Current time, duration, percentage, and progress bar.",
  ],
  [
    "app/timer/components/TaskSpeedControl.tsx",
    "Shared text-only speed cycle, with an optional clock icon.",
  ],
  [
    "app/timer/components/TaskActions.tsx",
    "Start, Continue, Pause, and Done controls, text/icon presentations, and sounds.",
  ],
  [
    "app/timer/components/TaskDescription.tsx",
    "Description hover target, popover, and empty message.",
  ],
  [
    "app/timer/components/TaskDialog.tsx",
    "Add/Edit triggers, Shift+N shortcut, random suggestions, and form validation.",
  ],
  [
    "app/timer/components/TaskFormDialog.tsx",
    "90%-height mobile Add/Edit sheets, desktop dialogs, focus, counters, and form actions.",
  ],
  [
    "app/timer/components/DurationFields.tsx",
    "Duration number fields and the preset grid.",
  ],
  [
    "app/timer/components/PresetSettings.tsx",
    "Duration and task preset editors, five-duration/six-task limits, and section Save/Cancel drafts.",
  ],
  [
    "app/timer/components/durationValue.ts",
    "Controlled duration units, seconds conversion, and preset labels.",
  ],
  [
    "app/timer/components/taskPresentation.ts",
    "Grid card layout, spacing, borders, shadows, and state colors.",
  ],
  [
    "app/timer/components/taskState.ts",
    "Task ordering, completion partition, elapsed time, and control state.",
  ],
  [
    "app/timer/components/floatingTaskState.ts",
    "Running and retained paused task selection, start ordering, and midnight cutoff.",
  ],
  [
    "app/timer/store.ts",
    "Transactional Turso task operations, midnight rollover, preferences, history, and backups.",
  ],
  [
    "utils/timerAuth.ts",
    "Owner-only Google OpenID Connect, signed session cookies, and request origin checks.",
  ],
  [
    "app/api/timer/auth/[action]/route.ts",
    "Account session, Google login, callback, and sign-out endpoints.",
  ],
  ["app/timer/statistic/page.tsx", "Statistics page header and metadata."],
  [
    "app/timer/statistic/Statistics.tsx",
    "Date selection, the 30-day chart, and activity history.",
  ],
  ["app/timer/details/page.tsx", "This explanation and file inventory."],
  [
    "app/timer/details/relationships.ts",
    "Pele diagram definitions and explanations of Timer’s file and function relationships.",
  ],
  [
    "app/api/timer/route.ts",
    "Protected GET, POST, and PATCH handlers for Timer data and actions.",
  ],
  [
    "components/TimerProvider.tsx",
    "Site-wide snapshot loading, optimistic Timer state, preferences, and shared scheduling.",
  ],
  [
    "components/FloatingTimerDock.tsx",
    "Compact floating task bar, task switcher, retained pause, and completion feedback.",
  ],
  [
    "components/useTimerClock.ts",
    "Display-local clock shared by the task list and floating task UI.",
  ],
  [
    "components/useTimerDockPosition.ts",
    "Measured mobile navigation gap, desktop positioning, and floating layout clearance.",
  ],
  [
    "components/useTimerSchedule.ts",
    "Ticking, countdown warnings, completion refreshes, and midnight rollover.",
  ],
  [
    "utils/timerTicking.ts",
    "Browser-persisted Ticking preference, hydration-safe reads, and tab synchronization.",
  ],
  [
    "components/useTimerNotifications.ts",
    "Completion claims, browser notifications, sound, and visible feedback.",
  ],
  [
    "utils/timerClient.ts",
    "API transport, cache keys, validation, and tab change subscriptions.",
  ],
  [
    "utils/timerMutations.ts",
    "In-memory optimistic projection, ordered saves, revision reconciliation, rollback, and failed form drafts.",
  ],
  [
    "utils/timerEngine.ts",
    "Shared settlement, actions, completion claims, Multitask, and Autoplay rules.",
  ],
  [
    "utils/timerDatabase.ts",
    "Turso schema, batched reads, changed-row persistence, and reusable-client transactions.",
  ],
  [
    "utils/timerBackup.ts",
    "Versioned backup validation, paused export copies, and conflict-safe imports.",
  ],
  [
    "components/useTimerAudioOwner.ts",
    "Single-owner ticking and warning audio, with a focused-tab fallback.",
  ],
  [
    "utils/timerSound.ts",
    "Action sounds, Quartz clock ticking, and countdown warnings.",
  ],
  [
    "utils/timer.ts",
    "Types, time calculations, empty personal days, and sample data generation.",
  ],
  [
    "utils/timerValidation.ts",
    "Validation schemas for stored records and API messages.",
  ],
  [
    "scripts/migrate-timer.ts",
    "Initializes Turso and imports backup or legacy JSON history.",
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
  ["app/page.tsx", "Home page content and tool navigation."],
  [
    "components/TopBar.tsx",
    "Desktop Timer navigation and shared top bar account controls.",
  ],
  ["app/api/page.tsx", "Documents the Timer API."],
  ["app/sitemap.ts", "Includes the public Timer pages in the sitemap."],
  ["data/routes.ts", "Makes Timer pages available in site search."],
  [
    "components/Button.tsx",
    "Shared buttons, including circular timer actions and small field-clear controls.",
  ],
  [
    "components/TabBarButtom.tsx",
    "Mobile navigation surface measured for floating Timer placement.",
  ],
  [
    "components/ArticleBackToTop.tsx",
    "Keeps the reading control above the Timer dock when visible.",
  ],
  [
    "components/FlowDiagram.tsx",
    "Shared Pele flowchart/ERD viewer with zoom, pan, keyboard scrolling, and a full-width dialog.",
  ],
  [
    "public/sw.js",
    "Opens or focuses Timer when a completion notification is clicked.",
  ],
  [
    "next.config.ts",
    "Excludes personal Timer records from deployment tracing.",
  ],
  ["package.json", "Defines the migration and sample generation commands."],
  [
    "knip.jsonc",
    "Registers the migration and seed scripts as an operational entry point.",
  ],
  [
    ".gitignore",
    "Excludes daily JSON records and temporary storage files from Git.",
  ],
  ["README.md", "Documents Timer behavior, storage, and notification support."],
] as const;

export const storageFiles = [
  [
    "data/timer/YYYY-MM-DD.json",
    "Legacy migration source; no longer used for runtime persistence.",
  ],
  ["data/timer/*.tmp", "Legacy temporary files; no longer written by Timer."],
] as const;
