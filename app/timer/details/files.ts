export const implementationFiles = [
  [
    "app/timer/page.tsx",
    "Timer page header, introduction, and navigation.",
  ],
  [
    "app/timer/clock/page.tsx",
    "Full-page Jakarta clock and Sound control.",
  ],
  [
    "app/timer/clock/ClockSound.tsx",
    "Clock-only Sound checkbox and visible-page, second-aligned quartz ticking.",
  ],
  [
    "app/timer/TimerClient.tsx",
    "Page composition: Today, toolbar, feedback, and task collection.",
  ],
  [
    "app/timer/_components/TimerDataControls.tsx",
    "Icon-only toolbar Export/Import actions, authentication, and backup errors.",
  ],
  [
    "app/timer/_components/TimerToolbar.tsx",
    "Notification, Autoplay, Multitask, and Ticking switches, backup icons, and Add Task.",
  ],
  [
    "app/timer/_components/TaskList.tsx",
    "Shared task clock, state calculation, and active/completed collections.",
  ],
  [
    "app/timer/_components/CompletedTasksTable.tsx",
    "Collapsed History table, View/Hide controls, sorting, and completion status.",
  ],
  [
    "app/timer/_components/TaskCard.tsx",
    "Three-column desktop cards, header icons, progress/speed, and icon actions.",
  ],
  [
    "app/timer/_components/TaskProgress.tsx",
    "Current time, duration, percentage, and progress bar.",
  ],
  [
    "app/timer/_components/TaskSpeedControl.tsx",
    "Shared text-only speed cycle, with an optional clock icon.",
  ],
  [
    "app/timer/_components/TaskActions.tsx",
    "Start, Continue, Pause, and Done controls, text/icon presentations, and sounds.",
  ],
  [
    "app/timer/_components/TaskDescription.tsx",
    "Description hover target, popover, and empty message.",
  ],
  [
    "app/timer/_components/TaskDialog.tsx",
    "Add/Edit triggers, Shift+N shortcut, random suggestions, and form validation.",
  ],
  [
    "app/timer/_components/TaskFormDialog.tsx",
    "90%-height mobile Add/Edit sheets, desktop dialogs, focus, counters, and form actions.",
  ],
  [
    "app/timer/_components/DurationFields.tsx",
    "Duration number fields and the preset grid.",
  ],
  [
    "app/timer/_components/PresetSettings.tsx",
    "Duration and task preset editors, five-duration/ten-task limits, and section Save/Cancel drafts.",
  ],
  [
    "app/timer/_components/durationValue.ts",
    "Controlled duration units, seconds conversion, and preset labels.",
  ],
  [
    "app/timer/_components/taskPresentation.ts",
    "Grid card layout, spacing, borders, shadows, and state colors.",
  ],
  [
    "app/timer/_components/taskState.ts",
    "Task ordering, completion partition, elapsed time, and control state.",
  ],
  [
    "app/timer/_components/floatingTaskState.ts",
    "Running and retained paused task selection, start ordering, and midnight cutoff.",
  ],
  [
    "app/timer/store.ts",
    "Transactional Turso task operations, midnight rollover, preferences, history, and backups.",
  ],
  [
    "app/timer/server/timerAuth.ts",
    "Owner-only Google OpenID Connect, signed session cookies, and request origin checks.",
  ],
  [
    "app/api/timer/auth/[action]/route.ts",
    "Account session, Google login, callback, and sign-out endpoints.",
  ],
  [
    "app/timer/statistic/page.tsx",
    "Statistics page header and metadata.",
  ],
  [
    "app/timer/statistic/Statistics.tsx",
    "Date selection, the 30-day chart, and activity history.",
  ],
  [
    "app/timer/details/page.tsx",
    "This explanation and file inventory.",
  ],
  [
    "app/timer/details/relationships.ts",
    "Pele diagram definitions and explanations of Timer’s file and function relationships.",
  ],
  [
    "app/api/timer/route.ts",
    "Protected GET, POST, and PATCH handlers for Timer data and actions.",
  ],
  [
    "app/timer/_components/TimerProvider.tsx",
    "Lightweight session-aware activation, shared context, and loading boundaries.",
  ],
  [
    "app/timer/_components/TimerRuntime.tsx",
    "Deferred controller creation, snapshot loading, scheduling, and confirmed-only completion effects.",
  ],
  [
    "utils/timerSession.ts",
    "Shared account session request with lightweight response validation.",
  ],
  [
    "app/timer/_components/FloatingTimerDock.tsx",
    "Compact floating task bar, task switcher, retained pause, and completion feedback.",
  ],
  [
    "app/timer/hooks/useTimerClock.ts",
    "Display-local clock shared by the task list and floating task UI.",
  ],
  [
    "components/floating/useFloatingDockPosition.ts",
    "Shared Music and Timer navigation gap, desktop positioning, and combined floating layout clearance.",
  ],
  [
    "app/timer/hooks/useTimerSchedule.ts",
    "Completion and midnight refresh deadlines and timeout cleanup.",
  ],
  [
    "app/timer/hooks/useTimerAudio.ts",
    "Audio activation, ticking, countdown warnings, and audio ownership.",
  ],
  [
    "app/timer/hooks/useTimerTicking.ts",
    "Settings subscription to local ticking and audio unlock on user interaction.",
  ],
  [
    "app/timer/utils/timerController.ts",
    "Stable actions and cached field selections over the mutation controller.",
  ],
  [
    "app/timer/utils/timerInput.ts",
    "Shared task-input limits and form parsing; legacy stored limits remain separate.",
  ],
  [
    "app/timer/utils/timerTicking.ts",
    "Browser-persisted Ticking preference, hydration-safe reads, and tab synchronization.",
  ],
  [
    "app/timer/hooks/useTimerNotifications.tsx",
    "Completion claims, browser notifications, sound, and visible feedback.",
  ],
  [
    "app/timer/utils/timerClient.ts",
    "API transport, cache keys, validation, and tab change subscriptions.",
  ],
  [
    "app/timer/utils/timerMutations.ts",
    "In-memory optimistic projection, ordered saves, revision reconciliation, rollback, and failed form drafts.",
  ],
  [
    "app/timer/utils/timerEngine.ts",
    "Shared settlement, actions, completion claims, Multitask, and Autoplay rules.",
  ],
  [
    "app/timer/server/timerDatabase.ts",
    "Turso schema, indexed reads, historical totals, task/preference writes, and transactions.",
  ],
  [
    "app/timer/utils/timerBackup.ts",
    "Versioned backup validation, paused export copies, and conflict-safe imports.",
  ],
  [
    "app/timer/hooks/useTimerAudioOwner.ts",
    "Single-owner ticking and warning audio, with a focused-tab fallback.",
  ],
  [
    "app/timer/hooks/useTimerPolling.ts",
    "One visible polling tab through Web Locks, with independent polling as a fallback.",
  ],
  [
    "app/timer/utils/timerSound.ts",
    "Action sounds, Quartz clock ticking, and countdown warnings.",
  ],
  [
    "app/timer/utils/timer.ts",
    "Types, time calculations, empty personal days, and sample data generation.",
  ],
  [
    "app/timer/utils/timerValidation.ts",
    "Validation schemas for stored records and API messages.",
  ],
  [
    "app/timer/migrate-timer.ts",
    "Initializes Turso and imports backup or legacy JSON history.",
  ],
  [
    "app/timer/seed-timer.ts",
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
    "components/topbar/TopBar.tsx",
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
  ["AGENTS.md", "Developer setup, verification rules, and architecture notes."],
  [
    "app/timer/_components/README.md",
    "Timer component and runtime implementation guide.",
  ],
] as const;

export const storageFiles = [
  [
    "data/timer/YYYY-MM-DD.json",
    "Legacy migration source; no longer used for runtime persistence.",
  ],
  ["data/timer/*.tmp", "Legacy temporary files; no longer written by Timer."],
] as const;
