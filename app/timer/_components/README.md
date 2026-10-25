# Timer UI components

Start at [TimerClient.tsx](../TimerClient.tsx) for the page structure. It composes
Today, the toolbar, loading/error feedback, and the task list. These components
run inside its `use client` boundary.

| Change | File |
| --- | --- |
| Header analog clock, ticking once per second in WIB | [AnalogClock.tsx](AnalogClock.tsx) |
| Notification, Autoplay, Multitask, and Sound toggles; Multitask confirmation | [TimerToolbar.tsx](TimerToolbar.tsx) |
| Export/Import, authentication errors, and backup errors | [TimerDataControls.tsx](TimerDataControls.tsx) |
| Collection spacing, order, and loading state | [TaskList.tsx](TaskList.tsx) |
| Active card structure, title, and description placement | [TaskCard.tsx](TaskCard.tsx) |
| Shared per-task speed button, with optional clock icon | [TaskSpeedControl.tsx](TaskSpeedControl.tsx) |
| Completed task names, descriptions, times, percentages, and status | [CompletedTasksTable.tsx](CompletedTasksTable.tsx) |
| Time display, percentage, and progress bar | [TaskProgress.tsx](TaskProgress.tsx) |
| Delete confirmation for card and edit dialog | [DeleteTaskButton.tsx](DeleteTaskButton.tsx) |
| Start, Continue, Pause, and Done controls | [TaskActions.tsx](TaskActions.tsx) |
| Description hover target and popover | [TaskDescription.tsx](TaskDescription.tsx) |
| Add/Edit triggers and save behavior | [TaskDialog.tsx](TaskDialog.tsx) |
| Shared modal dimensions, fields, and header actions | [TaskFormDialog.tsx](TaskFormDialog.tsx) |
| Settings preset list editors, draft validation, and Save/Cancel | [PresetSettings.tsx](PresetSettings.tsx) |
| Duration conversion and preset labels | [durationValue.ts](durationValue.ts) |
| Number inputs, stepper buttons, and duration presets | [DurationFields.tsx](DurationFields.tsx) |
| Grid card dimensions, borders, shadow, spacing, and state colors | [taskPresentation.ts](taskPresentation.ts) |
| Task ordering, completion partition, elapsed time, and Start/Pause/Continue state | [taskState.ts](taskState.ts) |
| Floating-task eligibility, retained paused task, and most-recent-start ordering | [floatingTaskState.ts](floatingTaskState.ts) |
| Site-wide floating task, switcher, and completion messages | [FloatingTimerDock.tsx](./FloatingTimerDock.tsx) |

Add and Edit use the same `TaskFormDialog` with controlled field state inside
its mounted portal. Only Add shows the Preset task buttons, arranged in two columns below
Duration. Selecting one fills Name, Description, and all duration units without
submitting or closing. Done creates the task; Cancel and dismissal add nothing.
Matching field values determine the selected task preset styling. Defaults include
X Traversal (1h), YouTube (2h), House Keeping (1h), Short Break (10m),
Long Break (30m), and Orientation (30m). The three new presets have empty
descriptions; existing saved lists retain their configured entries. Duration labels
use compact h, m, and s units. In that file, `TaskNameField`, `TaskDescriptionField`, and `TaskFormActions`
keep each form section easy to locate. `DurationFields` is shared too.
Name allows 20 characters; the optional Description allows 35. Both show a
character counter beside their labels, using `text-attention` for Name and
`text-danger` for Description at the limit. Each field has
a Clear button with a native Clear hover hint that empties it and returns focus
to the field. Name and Description start at 40px tall; Description can be resized
vertically and uses a subtle scrollbar when needed. Longer descriptions in existing
records remain readable and must be shortened when editing the task.

`taskPresentation.ts` holds layout choices shared by the collection and cards.
Within `TASK_LAYOUT`, `collection` controls the outer grid and gaps,
`surface` controls the card shell, and `controls` controls the timer/action area.
Element-specific styles stay beside their JSX in the component files above.

The header places the title on the left, with speed, an Adjustments Horizontal edit button, and a circular description icon on the right.
Cards use two columns from `sm` and three from `lg`. Below the header, time and progress fill the space beside the circular actions, with `gap-2` matching the gap between buttons. The time row shows elapsed time, duration, remaining time, and percentage. Edit is a plain icon matching the description icon in size.
The description popover
opens on hover or click. The speed button cycles through 1x, 1.5x, 2x,
2.5x, and 3x, then returns to 1x. Each task defaults to 1x and saves its own speed
across pauses and reloads. At 2x, each real second adds two seconds toward the
task's duration; summaries include this accelerated time. Changing speed settles
existing elapsed time at the old rate before applying the new rate, without
starting a paused task or changing the most-recently-started ordering.
The speed label uses tabular numerals and grows toward the left as its value changes.
Personal timer actions and Multitask keep
their opacity while unavailable; preview controls remain dimmed. Saves do not
block unrelated controls or rapid task actions.

Completed tasks appear in `CompletedTasksTable` below the active task grid.
The section defaults collapsed. View reveals the sort controls and table; Hide
collapses them again. The expanded table wraps task names and descriptions and
scrolls horizontally on narrow screens. `TaskList` partitions tasks using their current elapsed
time, so a task moves into the table as soon as its duration is reached.
The list uses [useTimerClock.ts](../hooks/useTimerClock.ts) for one
clock across all cards and computes each task's state once per render. Cards
receive that state instead of creating their own intervals.

Outside `/timer`, `FloatingTimerDock` reuses compact `TaskProgress`, the icon presentation
of `TaskActions`. Its wrapping title and muted remaining time (prefixed with `-`) sit above the progress bar
and form one link occupying half the dock, with circular actions beside it. It shows one
running task, initially the most recently started, with a task-count button that
cycles through tasks when needed. Manual selection survives navigation. Pausing from the dock retains
one paused task for Continue or Done; unrelated paused tasks are not added.
Completed or deleted tasks disappear, and selection falls back to a remaining
running task. Selection resets at Jakarta midnight and is not stored on disk.
Turso running tasks use the dock.

The shared `FloatingDock` host stacks Music above Timer when both are visible.
It measures the combined stack and reserves footer clearance once.
The dock matches the mobile tab bar's translucent background, blur, border, and
fully rounded capsule. It uses an 8px outer phone inset, 20px internal left
padding, and 8px internal right and vertical padding. Its flexible title area
shrinks around the fixed-size buttons, separated by 8px gaps. Controls appear as
The task switcher when multiple tasks are available, Complete, then Play/Pause.
Its compact row combines title, remaining time, a thin progress
bar and circular actions, without a separate status row. Its minimum
height matches the navigation surface, with a 53px fallback when absent.
[useFloatingDockPosition.ts](../../../components/floating/useFloatingDockPosition.ts)
measures the real navigation surface and matches its bottom screen gap above it.
Without mobile navigation it uses safe-area-aware bottom clearance; desktop
aligns a 22.4rem bar to the site's content width. The dock overlays page content;
mobile footer clearance uses the dock height and a stable safe-area-aware gap,
independent of the sticky navigation position, to avoid a measurement feedback loop.
Completion messages share the dock.
Observers and event listeners are active only while the dock is visible.

Multitask appears after Autoplay and defaults off. Turso remembers Multitask,
Autoplay, and notification preferences across devices and reloads. Sound stays
local and persists across reloads and tabs in the same browser. Autoplay starts
one next unfinished task when none run.

Turning Multitask off with multiple running tasks opens a confirmation:
“Only the most recent task will continue”, with Cancel and OK. Cancel leaves all
tasks running; OK keeps the most recently started or continued task and pauses
the rest, preserving elapsed time. The selected backend re-evaluates running tasks when
confirming. Turso saves the preference and keeps the latest task in one
transaction. A failed save keeps Multitask enabled and shows an error. With zero
or one running task, no confirmation is needed.

The Sound switch controls ticking, defaults off, and stores its setting in browser localStorage under the
versioned `haritssr-timer-ticking:v1` key through
[timerTicking.ts](../utils/timerTicking.ts). Both on and off survive reloads;
storage events synchronize open tabs. If storage is blocked, the toggle still
works in memory. When enabled, one shared Quartz clock
mechanical tick repeats at a single pitch each real second while any personal task
runs, regardless of task speed or the number of running tasks. It stops when all
tasks pause, finish, or reach midnight, and continues across page navigation. It does not mute the existing
Start, Pause, Done, or completion sounds. Audio setup happens in the toggle's
click handler and on pointer/key interaction when restored ticking needs audio
permission after a reload. The switch stays enabled while the browser blocks
autoplay. The scheduling hook owns timeout cleanup and checks elapsed time
before each tick, so overdue tasks stay silent while waiting for a server refresh.

During the final 10 real seconds of a task, the same Quartz warning ticks play automatically,
even with Sound off. They become faster with 6 and 3 seconds remaining and
stop when the task pauses or finishes. Remaining time accounts for task speed.

The [provider](./TimerProvider.tsx) activates the deferred
[runtime](./TimerRuntime.tsx) for owner sessions or Timer visits
and keeps it alive across navigation. The runtime owns preference access,
the shared SWR loading cache, and optimistic state from
[timerMutations.ts](../utils/timerMutations.ts). The mutation controller
keeps confirmed revisions and projects pending changes in memory. It saves in
order, rebases pending changes over refreshed snapshots, and rolls back failed
changes. Add uses a stable UUID so a repeated creation cannot duplicate a task.
Add/Edit close after validation; failed entries are retained for reopening.
Pending saves do not globally disable task controls.
Completion claims consume confirmed snapshots only. The provider loads the
snapshot on any page so saved running tasks can appear after direct navigation or reload. Supporting
modules keep independent work separate:

- [timerClient.ts](../utils/timerClient.ts) handles protected API requests,
  response validation, cache keys, and validated snapshot broadcasts between tabs.
  Concurrent snapshot reads in one tab share a single request. Snapshot and
  history reads start alongside validation-module loading and have a ten-second
  deadline covering both operations. Initial snapshot failures retry at most
  twice with a five-second base delay; focus, reconnect, and Try again can also
  recover. When no snapshot exists, a failed load replaces the loading message
  with the existing error and Try again control. Saves retain their fifteen-second
  request timeout and are never automatically resent.
- [timerDatabase.ts](../server/timerDatabase.ts) owns SQL mapping and atomic
  Turso transactions, with indexed active/pending-date discovery performed once,
  date-scoped batched reads, changed-row writes, and a reused runtime client.
  Statistics reads only its 30-day window plus today and outstanding tasks;
  backups and imports still read all history. Run `bun run migrate:timer` to add
  the pending-notification partial index. [timerEngine.ts](../utils/timerEngine.ts) applies timer
  rules and [timerBackup.ts](../utils/timerBackup.ts) validates imports.
- [useTimerAudioOwner.ts](../hooks/useTimerAudioOwner.ts) coordinates
  continuous audio with a Web Lock and focused-tab fallback.
- [useTimerPolling.ts](../hooks/useTimerPolling.ts) elects one visible polling
  tab using Web Locks, releasing ownership on hide or close. It polls every
  30 seconds while running or two minutes while idle. Snapshots from reads and
  saves update other tabs without another fetch; unsupported or blocked browser
  APIs fall back to independent polling. Focus and scheduled completion/midnight
  refreshes remain available in every tab.
- [useTimerSchedule.ts](../hooks/useTimerSchedule.ts) schedules ticking,
  warnings, the earliest task completion, and midnight refreshes.
- [useTimerNotifications.tsx](../hooks/useTimerNotifications.tsx) claims
  completions and supplies sound, browser notifications, and visible feedback.
  Completion messages use the shared share-feedback toast: a capsule over the
  mobile tab bar or at the desktop bottom right, with a task link to Timer and
  a “Got it” action. They dismiss after five seconds; a new completion refreshes
  the toast and its timeout.
- [store.ts](../store.ts) persists daily records, and
  [timerSound.ts](../utils/timerSound.ts) generates sound.

The shared completion-time calculation in `timer.ts` accounts for task speed in
scheduling, stored completion timestamps, and completed-task ordering. The store
accounts for each task's speed, concurrent starts, and atomic single-task transitions. Optional
`lastStartedAt` timestamps preserve start order across elapsed-time updates;
older records remain readable without a migration. Action types and validation
live in [timer.ts](../utils/timer.ts) and
[timerValidation.ts](../utils/timerValidation.ts).

Turso days start empty. Export creates a paused copy without changing live timers;
Import adds missing dates, fills empty days, skips identical records, and rejects
all conflicting occupied dates before writing. Imported completion alerts are
acknowledged. Saving requires network access; failures restore confirmed data
and retain failed form drafts in memory. Recovery refreshes authoritative data
before sending later queued commands; uncertain writes are not automatically
resent. Backup controls wait for queued saves to finish.
Initialize or migrate through `bun run migrate:timer`; see the root README.

Export and Import share a segmented icon-only group,
beside the secondary Settings button, with native hover labels and accessible names.
These controls sit beside Add Task on desktop and at the opposite end on mobile.
Settings opens a modal containing Notification, Autoplay, Multitask, and Sound
switches. Its header shows only the centered Settings title. Escape or clicking
outside closes the modal; switches save immediately, while preset changes use
their section Save buttons. The
switches retain their existing icons, followed by initially collapsed Duration
Presets and Task Presets accordions. Duration lists allow 1–5 entries and task lists 1–10, with editable values,
Add preset, Remove, and separate Save/Cancel controls.
Drafts survive collapsing a section; closing Settings discards unsaved changes.
Save keeps Settings open, disables that editor while saving, and retains the
draft with an inline error on failure. Cancel restores saved values. Presets sync
through the existing preference mutation queue and Turso. Duration presets apply
to Add and Edit; task presets only appear in Add. Existing tasks and open task
form values are unaffected. `TimerDataControls` owns
backup state and passes its actions into `TimerToolbar`. Only errors appear above
the toolbar; save status, backup guidance, and success messages are omitted.

Account access stays beside View Source in the shared top bar. Below 640px, both move into Page actions while the scrolling page title is visible. The Google photo opens an account menu with email and Sign out; missing or failed photos use a profile icon. Existing sessions gain photos after signing in again. Timer authorization remains owner-only.

Task cards place Complete before Play/Pause or Continue, matching the floating timer. Task action buttons use Trash, Play, Pause, and outline Check icons with a heavier `strokeWidth={2.5}` with hover labels and accessible names. Start uses Play and Continue uses Forward; Delete retains its confirmation dialog. The Edit Task header uses a text Delete button.
