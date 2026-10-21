const colors = `
  classDef action stroke-width:2px
  classDef attention stroke-width:2px
  classDef success stroke-width:2px
  classDef danger stroke-width:2px
`;

export const timerRelationships = [
  {
    id: "timer-runtime-map",
    title: "Pages, shared state, and storage",
    description:
      "Arrows describe composition, function calls, and returned data. File paths start at the project root; UI component filenames in the next diagram live in app/timer/components/.",
    definition: `flowchart TD
      accTitle: Timer pages, provider, API, and daily storage
      accDescr: The root layout mounts TimerProvider. TimerClient reads its shared snapshot. The provider and Statistics call the protected Timer API. The store applies timerEngine rules inside Turso transactions.
      Layout["app/layout.tsx"] -->|mounts across navigation| Provider["components/TimerProvider.tsx: useTimer, act, publish, refresh"]
      Page["app/timer/page.tsx"] --> Client["app/timer/TimerClient.tsx"]
      Page --> Date["TimerDate.tsx: date label from utils/timer.ts"]
      Provider -->|snapshot, preferences, actions| Client
      Provider -->|site-wide snapshot and completion feedback| Dock["components/FloatingTimerDock.tsx"]
      Dock -->|mobile navigation geometry and dock clearance| Position["components/useTimerDockPosition.ts"]
      Position --> Navigation["components/TabBarButtom.tsx"]
      Client --> Toolbar["TimerToolbar.tsx"]
      Client --> List["TaskList.tsx"]
      Provider -->|fetchTimerSnapshot / sendTimerAction| Transport["utils/timerClient.ts"]
      StatsPage["app/timer/statistic/page.tsx"] --> Stats["app/timer/statistic/Statistics.tsx"]
      Stats -->|fetchTimerHistory| Transport
      Transport -->|protected GET / POST / PATCH| API["app/api/timer/route.ts"]
      API --> Store["app/timer/store.ts: snapshots, actions, preferences, history"]
      Store --> Engine["utils/timerEngine.ts: shared rules"]
      Store --> Database["utils/timerDatabase.ts: SQL mapping and transactions"]
      Database --> Turso[("Turso: days, tasks, preferences")]
      API -->|snapshot or history response| Transport
      Transport -->|validated snapshot and clock offset| Provider
      Transport -->|validated history and 30-day totals| Stats
      Migration["scripts/migrate-timer.ts"] -->|initialize schema; import backups or JSON| Turso
      class Page,Client,Date,Toolbar,List,StatsPage,Stats,Dock,Navigation action
      class Layout,Provider,Transport,Position attention
      class API,Store,Database,Turso,Migration,Engine success
      ${colors}`,
    notes: [
      "TimerProvider fetches on any page so saved running tasks are recovered on direct navigation or reload. SWR loads confirmed snapshots; timerMutations projects ordered pending changes in memory through useTimer; mounting it in app/layout.tsx keeps scheduling and completion effects alive across navigation.",
      "FloatingTimerDock reuses the shared snapshot outside /timer and stacks completion messages with a compact task bar. useTimerDockPosition measures mobile navigation height and gap and publishes back-to-top clearance; desktop placement follows the content width. The dock overlays content without reserving footer space.",
      "act projects the change immediately, then timerMutations calls sendTimerAction in order through the protected API. Task actions read saved preferences in the same Turso transaction. receive protects newer confirmed revisions and rebases pending changes; failed writes restore confirmed state and preserve form drafts. Committed changes invalidate other tabs without triggering a redundant same-tab fetch.",
      "Statistics uses GET /api/timer?date=YYYY-MM-DD for history and 30-day totals. The API checks access before returning personal Turso records.",
    ],
  },
  {
    id: "timer-ui-map",
    title: "Rendering activities and editing tasks",
    description:
      "The task list derives display state once per shared clock update. Cards receive that state; controls send changes through the provider instead of writing records directly.",
    definition: `flowchart TD
      accTitle: Timer UI component and function relationships
      accDescr: TimerClient composes the toolbar and list. TaskList uses getTaskCollection to derive active and completed tasks. Cards compose descriptions, progress, and actions. Add and Edit share a form and duration fields. All mutations use TimerProvider act.
      Client["TimerClient.tsx"] --> Toolbar["TimerToolbar.tsx: preferences and view"]
      Client --> List["TaskList.tsx: one shared clock"]
      Client --> Data["TimerDataControls.tsx: Export, Import, errors"]
      Data --> Backups["utils/timerBackup.ts: validation and conflict-safe merge"]
      Data --> Backup["protected Timer API: backup import and export"]
      List --> Clock["components/useTimerClock.ts: display-local clock"]
      List -->|getTaskCollection calls getTaskState| State["taskState.ts: sort, partition, elapsed state"]
      State -->|active tasks and derived state| Card["TaskCard.tsx"]
      State -->|completed tasks| Completed["CompletedTasksTable.tsx"]
      State -->|taskSpent| Time["utils/timer.ts"]
      Card -->|taskAppearance / TASK_VIEW_LAYOUT| Appearance["taskPresentation.ts"]
      Card --> Desc["TaskDescription.tsx: description popover"]
      Card --> Progress["TaskProgress.tsx: time, percentage, progress bar"]
      Card --> Actions["TaskActions.tsx: Start, Pause, Continue, Done"]
      Card --> Speed["TaskSpeedControl.tsx: speed cycle"]
      Dock["components/FloatingTimerDock.tsx"] --> Clock
      Dock --> Selection["floatingTaskState.ts: running or retained paused; start order"]
      Selection --> State
      Dock --> Progress
      Dock -->|circular icon presentation| Actions
      Dock -->|text only| Speed
      Card -->|EditTask| Dialog["TaskDialog.tsx: AddTask / EditTask; readTaskForm"]
      Toolbar -->|Add Task / Shift+N| Dialog
      Dialog --> Form["TaskFormDialog.tsx: name, description, counters, clear buttons"]
      Form --> Duration["DurationFields.tsx: NumberInput and presets"]
      Actions --> Delete["DeleteTaskButton.tsx: confirmation"]
      Form --> Delete
      Dialog -->|validated add / edit| Act["components/TimerProvider.tsx: act"]
      Actions -->|start / pause / done| Act
      Delete -->|delete| Act
      Speed -->|speed| Act
      Toolbar -->|setMultitask; single-task when needed| Act
      Actions --> Sound["utils/timerSound.ts: action feedback"]
      class Client,Toolbar,List,Card,Completed,Desc,Progress,Actions,Dialog,Form,Duration,Delete,Dock,Speed,Data action
      class State,Appearance,Time,Act,Clock,Selection attention
      class Sound danger
      class Backups,Backup success
      ${colors}`,
    notes: [
      "getTaskCollection maps each task through getTaskState, sorts the results, and separates active tasks from completed tasks. getTaskState uses taskSpent to derive elapsed time, completion, running/paused state, and the action label.",
      "TaskCard combines taskPresentation styling with TaskDescription, TaskProgress, TaskActions, EditTask, and its speed control. CompletedTasksTable handles the collapsed completed list, sorting, and completion-time display.",
      "FloatingTimerDock shares compact progress, speed, action handlers, and sounds. getFloatingTasks excludes completed tasks and stops showing the old day at midnight; it includes running tasks and the one paused from the dock. The task-count button cycles through tasks and preserves selection for the session. Both displays use useTimerClock, with the dock clock disabled on /timer.",
      "TimerDataControls exports paused copies without changing live timers. Import validates the whole backup and atomically adds missing dates, fills empty days, or skips identical records. Conflicts reject every addition; imported completions do not alert again.",
      "AddTask chooses a random name and description and handles Shift+N. AddTask and EditTask both call readTaskForm, share TaskFormDialog and DurationFields, and submit through act. Add/Edit close after validation and keep failed drafts for reopening. DeleteTaskButton routes confirmed deletion back to its caller, which submits through act.",
    ],
  },
  {
    id: "timer-effects-map",
    title: "Saving, scheduling, and completion",
    description:
      "Shared timer rules run inside Turso transactions. Browser hooks schedule refreshes, coordinate audio, and claim completion messages; there is no background push scheduler.",
    definition: `flowchart TD
      accTitle: Turso saves, scheduling, and completion feedback
      accDescr: The protected API applies timer rules in a Turso write transaction. Results publish after commit. Browser hooks refresh at completion and midnight and claim completion feedback atomically.
      Act["TimerProvider.tsx: act / saved preferences"] --> Send["timerClient.ts: protected HTTP requests"]
      Send --> Local["store.ts: changeTimer / state"]
      Local --> Validate["timerValidation.ts: action, day, preferences"]
      Local --> Tx["timerDatabase.ts: write transaction"]
      Tx --> Engine["timerEngine.ts: settleTimerDay / applyTimerAction"]
      Engine --> Auto["autoplayNextTask: only when no tasks run"]
      Engine --> Commit["Turso transaction commit"]
      Auto --> Commit
      Commit --> Publish["timerMutations.receive: confirmed snapshot"]
      Commit --> Tabs["BroadcastChannel invalidation; focus and polling refresh"]
      Publish --> Schedule["components/useTimerSchedule.ts"]
      Schedule -->|earliest completion or Jakarta midnight| Refresh["TimerProvider.refresh: protected API"]
      Refresh --> Send
      Schedule --> Owner["components/useTimerAudioOwner.ts: Web Lock or focus fallback"]
      Owner --> Sound["utils/timerSound.ts: ticks and warnings"]
      Publish --> Notify["components/useTimerNotifications.ts"]
      Notify -->|acknowledge: atomic completion claim| Send
      Notify -->|claimed notification only| Feedback["visible message, reached sound, optional browser notification"]
      Feedback --> Sound
      Feedback --> Worker["public/sw.js: notification click opens Timer"]
      class Act,Send,Publish,Refresh attention
      class Local,Validate,Tx,Engine,Auto,Commit,Tabs success
      class Schedule,Owner,Sound,Notify,Feedback,Worker danger
      ${colors}`,
    notes: [
      "timerEngine applies settlement, actions, latest-running selection, and Autoplay inside one Turso write transaction. Saved preferences are read in the same transaction; confirmed snapshots publish only after commit.",
      "Refreshes derive progress from timestamps without rewriting running baselines. Completion and midnight boundaries persist when due. Failed transactions publish no changes. History includes accelerated live time across exactly 30 dates.",
      "useTimerSchedule refreshes at completion or midnight. useTimerAudioOwner gives continuous audio to one eligible browser tab through Web Locks, falling back to the focused tab. Explicit action sounds remain in the clicked tab, and Ticking resets off on reload.",
      "useTimerNotifications submits acknowledge through the protected API. In Turso, the completion claim and Autoplay transition are atomic and read saved preferences. Only the winning claim shows feedback; imported historical completions are already acknowledged. The service worker opens or focuses Timer when a system notification is clicked.",
    ],
  },
] as const;
