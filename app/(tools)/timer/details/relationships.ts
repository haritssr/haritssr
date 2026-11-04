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
      "Arrows describe composition, function calls, and returned data. File paths start at the project root; UI component filenames in the next diagram live in app/(tools)/timer/_components/.",
    definition: `flowchart TD
      accTitle: Timer pages, provider, API, and daily storage
      accDescr: The root layout mounts TimerProvider. TimerClient reads its shared snapshot. The deferred runtime shares one controller through the provider; controls subscribe to selected fields. The controller and Statistics call the protected Timer API. The store applies timerEngine rules inside Turso transactions.
      Layout["app/layout.tsx"] -->|mounts across navigation| Provider["app/(tools)/timer/_components/TimerProvider.tsx: lazy activation and selected subscriptions"]
      Page["app/(tools)/timer/page.tsx"] --> Client["app/(tools)/timer/TimerClient.tsx"]
      ClockPage["app/(tools)/timer/clock/page.tsx"] --> ClockFace["AnalogClock.tsx: Jakarta time"]
      Provider -->|loads once when needed| Runtime["app/(tools)/timer/_components/TimerRuntime.tsx"]
      Runtime -->|creates and registers once| Controller["app/(tools)/timer/utils/timerController.ts: stable actions and selections"]
      Controller -->|selected snapshot, preferences, actions| Client
      Controller -->|selected state and actions| Dock["app/(tools)/timer/_components/FloatingTimerDock.tsx"]
      Dock -->|portal slot| Host["components/floating/FloatingDock.tsx"]
      Host -->|combined Music and Timer geometry| Position["components/floating/useFloatingDockPosition.ts"]
      Position --> Navigation["components/TabBarBottom.tsx"]
      Client --> Toolbar["TimerToolbar.tsx"]
      Client --> List["TaskList.tsx"]
      Client --> Year["TimerYear.tsx: data-free year overview"]
      Client -->|React.lazy| Calendar["TimerCalendarContent.tsx: TimerWeek / TimerMonth / TimerCalendarDay date browsing"]
      Client --> CalendarRead["hooks/useTimerCalendar.ts: account-scoped month and cross-month week reads"]
      CalendarRead -->|fetchTimerCalendar| Transport
      Runtime -->|snapshot loading and broadcasts| Transport
      Controller --> Mutations["app/(tools)/timer/utils/timerMutations.ts: ordered optimistic changes"]
      Mutations -->|sendTimerAction / saveTimerPreferences| Transport["app/(tools)/timer/utils/timerClient.ts"]
      StatsPage["app/(tools)/timer/statistics/page.tsx"] --> Stats["app/(tools)/timer/statistics/Statistics.tsx"]
      Stats -->|fetchTimerHistory| Transport
      Transport -->|protected GET / POST / PATCH| API["app/api/timer/route.ts"]
      API --> Store["app/(tools)/timer/store.ts: snapshots, actions, preferences, history, calendar"]
      Store --> Engine["app/(tools)/timer/utils/timerEngine.ts: shared commands and preferences"]
      Mutations --> Engine
      Store --> Database["app/(tools)/timer/server/timerDatabase.ts: SQL mapping and transactions"]
      Database --> Turso[("Turso: days, tasks, preferences")]
      API -->|snapshot or history response| Transport
      Transport -->|validated snapshot and clock offset| Mutations
      Transport -->|validated history and 30-day totals| Stats
      Migration["app/(tools)/timer/migrate-timer.ts"] -->|initialize schema; import backups or JSON| Turso
      class Page,Client,Date,Toolbar,List,StatsPage,Stats,Dock,Navigation action
      class Layout,Provider,Runtime,Controller,Mutations,Transport,Position attention
      class API,Store,Database,Turso,Migration,Engine success
      ${colors}`,
    notes: [
      "TimerProvider checks the shared account session and loads TimerRuntime for the owner or a Timer page, recovering saved running tasks on direct navigation or reload. Anonymous visitors elsewhere do not load Timer state. TimerRuntime creates one controller and registers it with the provider once. SWR loads confirmed snapshots; timerMutations projects ordered pending changes in memory. useTimer subscribes directly to selected fields with stable action functions; mounting it in app/layout.tsx keeps scheduling and completion effects alive across navigation.",
      "FloatingTimerDock reuses the shared snapshot outside /timer. FloatingDock displays full Music and Timer pills with Music above Timer, keeping both sets of controls accessible. Completion feedback uses the shared toast. useFloatingDockPosition measures the dock and mobile navigation gap and reserves footer clearance.",
      "act projects the change immediately, then timerMutations calls sendTimerAction in order through the protected API. Task actions read saved preferences in the same Turso transaction. Optimistic projection and server commands share settlement and preference rules; server authorization, date checks, revisions, and notification claims remain authoritative. timerDatabase owns preference writes and historical-total queries as well as task persistence. receive protects newer confirmed revisions and rebases pending changes; failed writes restore confirmed state and preserve form drafts. Reads and committed changes broadcast validated snapshots to other tabs without another fetch. One visible tab owns periodic polling through Web Locks.",
      "Statistics uses GET /api/timer?date=YYYY-MM-DD for history and 30-day totals. Calendar browsing uses GET /api/timer?month=YYYY-MM with bounded read-only queries and unsaved future daily previews. Calendar responses stay outside the mutation runtime. The API checks access before returning personal Turso records.",
    ],
  },
  {
    id: "timer-ui-map",
    title: "Rendering activities and editing tasks",
    description:
      "The task list derives display state once per shared clock update. Cards receive that state; controls send changes through the provider instead of writing records directly.",
    definition: `flowchart TD
      accTitle: Timer UI component and function relationships
      accDescr: TimerClient composes the toolbar and list. TaskList uses getTaskCollection to derive active and completed tasks. Cards compose progress and actions. Add and Edit share a form and duration fields. All mutations use TimerProvider act.
      Client["TimerClient.tsx"] --> Toolbar["TimerToolbar.tsx: preferences and view"]
      Client -->|shared clock| List["TaskList.tsx"]
      Client --> Data["TimerDataControls.tsx: Export and errors"]
      Backup --> Backups["app/(tools)/timer/utils/timerBackup.ts: backup creation"]
      Data --> Backup["protected Timer API: backup export"]
      List --> Clock["app/(tools)/timer/hooks/useTimerClock.ts: display-local clock"]
      List -->|getTaskCollection calls getTaskState| State["taskState.ts: sort, partition, elapsed state"]
      State -->|active tasks and derived state| Card["TaskCard.tsx"]
      State -->|completed or missed tasks| Completed["CompletedTasksTable.tsx"]
      State -->|taskTiming| Time["app/(tools)/timer/utils/timer.ts"]
      Card --> View["TaskCardView.tsx: shared card presentation"]
      Client --> Settings["TimerSettings.tsx: page-scoped dialog handle"]
      Toolbar -->|general trigger| Settings
      Settings --> Daily["DailyTaskSettings.tsx: future daily definitions"]
      Daily -->|save dailyTasks| Act
      View -->|taskAppearance / TASK_LAYOUT| Appearance["taskPresentation.ts"]
      View --> Progress["TaskProgress.tsx: time, percentage, progress bar"]
      Card --> Actions["TaskActions.tsx: Start, Pause, Continue, Done"]
      Dock["app/(tools)/timer/_components/FloatingTimerDock.tsx"] --> Clock
      Dock --> Selection["floatingTaskState.ts: running or retained paused; start order"]
      Selection --> State
      Dock --> Progress
      Dock -->|circular icon presentation| Actions
      Card -->|EditTask| Dialog["TaskDialog.tsx: AddTask / EditTask"]
      Toolbar -->|Add Task / Shift+N| Dialog
      Dialog --> Input["app/(tools)/timer/utils/timerInput.ts: readTaskForm and input limits"]
      Input --> Validation["app/(tools)/timer/utils/timerValidation.ts: server schemas"]
      Dialog --> Form["TaskFormDialog.tsx: name, description, counters, clear buttons"]
      Form --> Duration["DurationFields.tsx: NumberInput and presets"]
      Duration --> NumberInput["components/NumberInput.tsx: labeled integer fields"]
      Actions --> Delete["DeleteTaskButton.tsx: confirmation"]
      Form --> Delete
      Dialog -->|validated add / edit| Act["app/(tools)/timer/_components/TimerProvider.tsx: act"]
      Actions -->|start / pause / done| Act
      Delete -->|delete| Act
      Settings -->|setMultitask; single-task when needed| Act
      Actions --> Sound["app/(tools)/timer/utils/timerSound.ts: action feedback"]
      class Client,Toolbar,Settings,List,Card,View,Daily,Completed,Desc,Progress,Actions,Dialog,Form,Duration,NumberInput,Delete,Dock,Data action
      class State,Appearance,Time,Act,Clock,Selection,Input attention
      class Sound danger
      class Backups,Backup,Validation success
      ${colors}`,
    notes: [
      "getTaskCollection derives each task once with shared Jakarta day bounds and partitions active/completed tasks. Active and visible cards share one sorted collection; the toolbar derives History from the completed collection. The browser title selects the earliest running task in one pass, preserving progress and saved-order ties. getTaskState uses taskTiming to derive elapsed time, availability, completion, running/paused state, and the action label.",
      "TaskCard composes live description, editing, and action controls inside TaskCardView. TaskCardView shares the card layout and TaskProgress between ordinary and daily cards. TaskList keeps available cards in their initial order during a visit and retains all scheduled windows in TaskTimeline all day, with green running cards, violet active cards, muted past cards, and the red time line above them. Only future eligible cards can move or resize; active cards have edit icons. useTimelineCreation handles empty-region mouse dragging, touch holds, and keyboard selection, using timelineSelection for quarter-hour geometry. useTimelineResize previews top/bottom boundary changes with overlap lanes and submits resize-scheduled commands that compute matching durations without overwriting task text. Failed resizes preserve the requested window and duration in edit drafts. It submits scheduled add commands through act; failed additions retain IDs and windows in drafts for AddTask recovery. Daily cards can be edited for today and lock outside their availability. CompletedTasksTable handles the completed list, sorting, and completion-time display.",
      "FloatingTimerDock shares compact progress, action handlers, and sounds. getFloatingTasks excludes completed tasks and stops showing the old day at midnight; it includes running tasks and the one paused from the dock. The task-count button cycles through tasks and preserves selection for the session. Both displays use useTimerClock, with the dock clock disabled on /timer.",
      "TimerDataControls exports paused copies without changing live timers. The separate migration command can restore backups with conflict checks.",
      "AddTask opens with empty name and description fields and handles Shift+N. AddTask and EditTask both call readTaskForm from timerInput, whose limits are shared with field counters and server schemas, share TaskFormDialog and DurationFields, and submit through act. Add/Edit close after validation and keep failed drafts for reopening. DeleteTaskButton routes confirmed deletion back to its caller, which submits through act.",
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
      Act["timerController.ts: stable actions"] --> Queue["timerMutations.ts: optimistic projection and ordered saves"]
      Queue --> Send["timerClient.ts: protected HTTP requests"]
      Send --> Local["store.ts: changeTimer / state"]
      Local --> Validate["timerValidation.ts: action, day, preferences"]
      Local --> Tx["timerDatabase.ts: write transaction"]
      Tx --> Engine["timerEngine.ts: applyTimerCommand / applyTimerPreferencePatch"]
      Queue --> Engine
      Deadline["useTimerDeadlineReminders: visible-page deadlines"] -->|claim-deadline-reminder| Send
      Rules["timerDeadline: remaining duration plus ten minutes"] --> Deadline
      Rules --> Engine
      Commit -->|winning reminder claim| Reminder["Silent deadline toast; one per task/date"]
      Engine --> Auto["autoplayNextTask: only when no tasks run"]
      Engine --> Commit["Turso transaction commit"]
      Auto --> Commit
      Commit --> Publish["timerMutations.receive: confirmed snapshot"]
      Commit --> Tabs["BroadcastChannel snapshots; focus and one polling tab"]
      Publish -->|projected state| Schedule["app/(tools)/timer/hooks/useTimerSchedule.ts"]
      Schedule -->|local completion deadline| Preview["ShareToastViewport: immediate plain-text toast and ringing"]
      Schedule -->|earliest completion or Jakarta midnight| Refresh["TimerProvider.refresh: protected API"]
      Refresh --> Send
      Publish -->|projected state| Audio["app/(tools)/timer/hooks/useTimerAudio.ts: ticking"]
      Audio --> Owner["app/(tools)/timer/hooks/useTimerAudioOwner.ts: Web Lock or focus fallback"]
      Ticking["useTimerTicking.ts: settings subscription and audio unlock"] --> Preference["timerTicking.ts: browser preference"]
      Preference --> Audio
      Owner --> Sound["app/(tools)/timer/utils/timerSound.ts: ticks and completion ringing"]
      Publish -->|confirmed state only| Notify["app/(tools)/timer/hooks/useTimerNotifications.tsx"]
      Notify -->|acknowledge: atomic completion claim| Send
      Notify -->|claimed notification only| Feedback["confirm toast, optional browser notification"]
      Feedback --> Preview
      Feedback --> Sound
      Feedback --> Worker["public/sw.js: notification click opens Timer"]
      class Act,Queue,Send,Publish,Refresh,Ticking,Preference attention
      class Local,Validate,Tx,Engine,Auto,Commit,Tabs success
      class Schedule,Preview,Audio,Owner,Sound,Notify,Feedback,Worker danger
      ${colors}`,
    notes: [
      "timerEngine applies settlement, actions, latest-running selection, and Autoplay inside one Turso write transaction. Saved preferences are read in the same transaction; confirmed snapshots publish only after commit.",
      "Refreshes derive progress from timestamps without rewriting running baselines. Completion and midnight boundaries persist when due. Failed transactions publish no changes. History includes accelerated live time across exactly 30 dates.",
      "useTimerSchedule owns completion and midnight refreshes. useScheduledTaskStarts checks window openings and already-open windows on return across routes. It submits start-scheduled commands through the shared writer; Multitask starts all due tasks, otherwise the latest opening wins and pauses the current task. Starts within 60 seconds of opening are backdated to the opening. Batch tracking and server start-history checks prevent overlap churn and duplicate starts while preserving manual pauses and avoiding uncertain-write retries. useTimerAudio owns ticking and restored-audio listeners; useTimerTicking lets Settings subscribe to the local preference and unlock audio during the click. useTimerAudioOwner gives ticking audio to one eligible browser tab through Web Locks, falling back to the focused tab. Completion toasts share a repeating sound until dismissed. Explicit action sounds remain in the clicked tab. timerTicking remembers Ticking across reloads and tabs in the same browser; pointer or key interaction can unlock restored audio.",
      "useTimerNotifications submits acknowledge through the protected API. In Turso, the completion claim and Autoplay transition are atomic and read saved preferences. Only the winning claim shows feedback; imported historical completions are already acknowledged. The service worker opens or focuses Timer when a system notification is clicked.",
    ],
  },
] as const;
