export const implementationFiles = [
  [
    "app/(tools)/timer/utils/timerDeadline.ts",
    "Shared window-warning eligibility, latest start, next boundary, and Jakarta time labels.",
  ],
  [
    "app/(tools)/timer/_components/TaskDeadlineWarning.tsx",
    "Danger warning before Edit, reduced-motion pulse, and accessible tooltip.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerDeadlineReminders.ts",
    "Visible-page reminder scheduling, atomic claims, and silent deadline toasts.",
  ],
  [
    "app/(tools)/timer/page.tsx",
    "Timer page header, introduction, and navigation.",
  ],
  [
    "app/(tools)/timer/clock/page.tsx",
    "Full-page Jakarta clock and Sound control.",
  ],
  [
    "app/(tools)/timer/clock/ClockSound.tsx",
    "Clock-only Sound checkbox and visible-page, second-aligned quartz ticking.",
  ],
  [
    "app/(tools)/timer/TimerClient.tsx",
    "Page composition: Today, toolbar, feedback, and task collection.",
  ],
  [
    "app/(tools)/timer/_components/TimerDataControls.tsx",
    "Icon-only toolbar Export/Import actions, authentication, and backup errors.",
  ],
  [
    "app/(tools)/timer/_components/TimerToolbar.tsx",
    "Add Task, backup actions, and the Settings trigger.",
  ],
  [
    "app/(tools)/timer/_components/TimerSettings.tsx",
    "Page-scoped Base UI settings handle, general/daily triggers, preferences, and confirmation.",
  ],
  [
    "app/(tools)/timer/_components/TaskList.tsx",
    "Shared task clock, state calculation, and active/completed collections.",
  ],
  [
    "app/(tools)/timer/_components/CompletedTasksTable.tsx",
    "History table, Show/Hide controls, sorting, and completed/missed status.",
  ],
  [
    "app/(tools)/timer/_components/TaskCard.tsx",
    "Three-column desktop cards, header icons, progress, and icon actions.",
  ],
  [
    "app/(tools)/timer/_components/TaskCardView.tsx",
    "Shared header, elapsed/availability/remaining display, and action layout for ordinary and daily tasks.",
  ],
  [
    "app/(tools)/timer/_components/TaskProgress.tsx",
    "Current time, duration, percentage, and progress bar.",
  ],
  [
    "app/(tools)/timer/_components/TaskActions.tsx",
    "Start, Continue, Pause, and Done controls, text/icon presentations, and sounds.",
  ],
  [
    "app/(tools)/timer/_components/TaskDialog.tsx",
    "Add/Edit triggers, Shift+N shortcut, and form validation.",
  ],
  [
    "app/(tools)/timer/_components/TaskFormDialog.tsx",
    "90%-height mobile Add/Edit sheets, desktop dialogs, focus, counters, and form actions.",
  ],
  [
    "app/(tools)/timer/_components/DailyTaskSettings.tsx",
    "Synced daily definitions, future-day scheduling, ordering, and Save/Cancel drafts.",
  ],
  [
    "app/(tools)/timer/_components/DailyTaskFields.tsx",
    "Memoized daily-task fields and stable edit/reorder/remove actions.",
  ],
  [
    "app/(tools)/timer/_components/dailyTaskDraft.ts",
    "Pure daily draft conversion, strict clock parsing, validation, and reordering.",
  ],
  [
    "app/(tools)/timer/utils/dailyTasks.ts",
    "Initial daily definitions, instance creation, reserved IDs, and compact window labels.",
  ],
  [
    "app/(tools)/timer/_components/DurationFields.tsx",
    "Shared NumberInput controls for duration units and the preset grid.",
  ],
  [
    "components/NumberInput.tsx",
    "Base UI number input with labeled field layout, bounds, step, and form state.",
  ],
  [
    "app/(tools)/timer/_components/PresetSettings.tsx",
    "Duration and task preset editors, five-duration/ten-task limits, and section Save/Cancel drafts.",
  ],
  [
    "app/(tools)/timer/_components/durationValue.ts",
    "Controlled duration units, seconds conversion, and preset labels.",
  ],
  [
    "app/(tools)/timer/_components/taskPresentation.ts",
    "Grid card layout, spacing, borders, shadows, and state colors.",
  ],
  [
    "app/(tools)/timer/_components/taskState.ts",
    "Task ordering, completion partition, elapsed time, and control state.",
  ],
  [
    "app/(tools)/timer/_components/floatingTaskState.ts",
    "Running and retained paused task selection, start ordering, and midnight cutoff.",
  ],
  [
    "app/(tools)/timer/store.ts",
    "Transactional Turso task operations, midnight rollover, preferences, history, and backups.",
  ],
  [
    "app/(tools)/timer/server/timerAuth.ts",
    "Owner-only Google OpenID Connect, signed session cookies, and request origin checks.",
  ],
  [
    "app/api/timer/auth/[action]/route.ts",
    "Account session, Google login, callback, and sign-out endpoints.",
  ],
  [
    "app/(tools)/timer/statistic/page.tsx",
    "Statistics page header and metadata.",
  ],
  [
    "app/(tools)/timer/statistic/Statistics.tsx",
    "Date selection, the 30-day chart, and history refreshes limited to relevant changes.",
  ],
  [
    "app/(tools)/timer/details/page.tsx",
    "This explanation and file inventory.",
  ],
  [
    "app/(tools)/timer/details/relationships.ts",
    "Pele diagram definitions and explanations of Timer’s file and function relationships.",
  ],
  [
    "app/api/timer/route.ts",
    "Protected GET, POST, and PATCH handlers for Timer data and actions.",
  ],
  [
    "app/(tools)/timer/_components/TimerProvider.tsx",
    "Lightweight session-aware activation, shared context, and loading boundaries.",
  ],
  [
    "app/(tools)/timer/_components/TimerRuntime.tsx",
    "Deferred controller creation, snapshot loading, scheduling, and confirmed-only completion effects.",
  ],
  [
    "utils/timerSession.ts",
    "Shared account session request with lightweight response validation.",
  ],
  [
    "app/(tools)/timer/_components/FloatingTimerDock.tsx",
    "Compact floating task bar, task switcher, retained pause, and completion feedback.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerClock.ts",
    "Server-aligned display ticks, with immediate refresh on visibility changes.",
  ],
  [
    "app/(tools)/timer/utils/timerClock.ts",
    "Request-timing clock calibration and synchronized display boundaries.",
  ],
  [
    "components/floating/FloatingDock.tsx",
    "Shared player visibility, Music-above-Timer layout, and notices.",
  ],
  [
    "components/floating/useFloatingDockPosition.ts",
    "Shared Music and Timer navigation gap, desktop positioning, and combined floating layout clearance.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerSchedule.ts",
    "Completion and midnight refresh deadlines and timeout cleanup.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerAudio.ts",
    "Audio activation, ticking, and audio ownership.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerTicking.ts",
    "Settings subscription to local ticking and audio unlock on user interaction.",
  ],
  [
    "app/(tools)/timer/utils/timerController.ts",
    "Stable actions and cached field selections over the mutation controller.",
  ],
  [
    "app/(tools)/timer/utils/timerInput.ts",
    "Shared task-input limits and form parsing; legacy stored limits remain separate.",
  ],
  [
    "app/(tools)/timer/utils/timerTicking.ts",
    "Browser-persisted Ticking preference, hydration-safe reads, and tab synchronization.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerNotifications.tsx",
    "Completion claims, browser notifications, sound, and visible feedback.",
  ],
  [
    "app/(tools)/timer/utils/timerClient.ts",
    "API transport, cache keys, validation, and tab change subscriptions.",
  ],
  [
    "app/(tools)/timer/utils/timerMutations.ts",
    "In-memory optimistic projection, ordered saves, revision reconciliation, rollback, and failed form drafts.",
  ],
  [
    "app/(tools)/timer/utils/timerEngine.ts",
    "Shared settlement, actions, completion claims, Multitask, and Autoplay rules.",
  ],
  [
    "app/(tools)/timer/server/timerDatabase.ts",
    "Turso schema, indexed reads, historical totals, task/preference writes, and transactions.",
  ],
  [
    "app/(tools)/timer/utils/timerBackup.ts",
    "Versioned backup validation, paused export copies, and conflict-safe imports.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerAudioOwner.ts",
    "Single-owner ticking audio, with a focused-tab fallback.",
  ],
  [
    "app/(tools)/timer/hooks/useTimerPolling.ts",
    "One visible polling tab through Web Locks, with independent polling as a fallback.",
  ],
  [
    "app/(tools)/timer/utils/timerSound.ts",
    "Action sounds, Quartz clock ticking, and completion ringing.",
  ],
  [
    "app/(tools)/timer/utils/timer.ts",
    "Types, time calculations, empty personal days, and sample data generation.",
  ],
  [
    "app/(tools)/timer/utils/timerValidation.ts",
    "Validation schemas for stored records and API messages.",
  ],
  [
    "app/(tools)/timer/migrate-timer.ts",
    "Initializes Turso and imports backup or legacy JSON history.",
  ],
  [
    "app/(tools)/timer/seed-timer.ts",
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
    "app/(tools)/timer/_components/README.md",
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
