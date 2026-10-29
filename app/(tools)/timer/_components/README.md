# Timer UI components

Start at [TimerClient.tsx](../TimerClient.tsx) for the page structure. It composes
Today, the toolbar, loading/error feedback, and the task list. These components
run inside its `use client` boundary.

| Change | File |
| --- | --- |
| Header analog clock, ticking once per second in WIB and linking to Clock | [AnalogClock.tsx](AnalogClock.tsx), [Timer page](../page.tsx) |
| Full-page Clock Sound checkbox and quartz ticks | [ClockSound.tsx](../clock/ClockSound.tsx) |
| Add Task, backup actions, task counts, and Settings trigger | [TimerToolbar.tsx](TimerToolbar.tsx) |
| Page-scoped Settings handle, switches, and Multitask confirmation | [TimerSettings.tsx](TimerSettings.tsx) |
| Export/Import, authentication errors, and backup errors | [TimerDataControls.tsx](TimerDataControls.tsx) |
| Collection spacing, order, and loading state | [TaskList.tsx](TaskList.tsx) |
| Active card structure, title, and description placement | [TaskCard.tsx](TaskCard.tsx) |
| Shared presentation for ordinary and daily task cards | [TaskCardView.tsx](TaskCardView.tsx) |
| Completed task names, descriptions, times, percentages, and status | [CompletedTasksTable.tsx](CompletedTasksTable.tsx) |
| Time display, percentage, and progress bar | [TaskProgress.tsx](TaskProgress.tsx) |
| Delete confirmation for card and edit dialog | [DeleteTaskButton.tsx](DeleteTaskButton.tsx) |
| Start, Continue, Pause, and Done controls | [TaskActions.tsx](TaskActions.tsx) |
| Pulsing availability deadline icon and tooltip | [TaskDeadlineWarning.tsx](TaskDeadlineWarning.tsx) |
| Description hover target and popover | [TaskDescription.tsx](TaskDescription.tsx) |
| Add/Edit triggers and save behavior | [TaskDialog.tsx](TaskDialog.tsx) |
| Shared modal dimensions, fields, and header actions | [TaskFormDialog.tsx](TaskFormDialog.tsx) |
| Settings preset list editors, draft validation, and Save/Cancel | [PresetSettings.tsx](PresetSettings.tsx) |
| Duration conversion and preset labels | [durationValue.ts](durationValue.ts) |
| Shared NumberInput controls and duration presets | [DurationFields.tsx](DurationFields.tsx), [NumberInput.tsx](../../../../components/NumberInput.tsx) |
| Grid card dimensions, borders, shadow, spacing, and state colors | [taskPresentation.ts](taskPresentation.ts) |
| Task ordering, completion partition, elapsed time, and Start/Pause/Continue state | [taskState.ts](taskState.ts) |
| Floating-task eligibility, retained paused task, and most-recent-start ordering | [floatingTaskState.ts](floatingTaskState.ts) |
| Site-wide floating task, switcher, and completion messages | [FloatingTimerDock.tsx](./FloatingTimerDock.tsx) |

Add and Edit use the same `TaskFormDialog` with controlled field state inside
its mounted portal. Only Add shows the Preset task buttons, arranged in two columns below
Duration. Selecting one fills Name, Description, and all duration units without
submitting or closing. Add creates the task; Cancel and dismissal add nothing.
Matching field values determine the selected task preset styling. Defaults include
X Traversal (1h), YouTube (2h), House Keeping (1h), Short Break (10m),
Long Break (30m), and Orientation (30m). The three new presets have empty
descriptions; existing saved lists retain their configured entries. Duration labels
use compact h, m, and s units. In that file, `TaskNameField`, `TaskDescriptionField`, and `TaskFormActions`
keep each form section easy to locate. `DurationFields` is shared too.
Task form parsing lives in [timerInput.ts](../utils/timerInput.ts). Its lightweight
limits are shared with input counters and server schemas; stored legacy text keeps
its existing broader limits. Live elapsed-time validation remains in Edit.
Name allows 20 characters; the optional Description allows 35, or 2,000 for a
daily task. Both show a
character counter beside their labels, using `text-attention` for Name and
`text-danger` for Description at the limit. Each field has
a Clear button with a native Clear hover hint that empties it and returns focus
to the field. Name and Description start at 40px tall; Description can be resized
vertically and uses a subtle scrollbar when needed. Longer descriptions in ordinary
legacy records remain readable and must be shortened when editing the task.

`taskPresentation.ts` holds layout choices shared by the collection and cards.
Within `TASK_LAYOUT`, `collection` controls the outer grid and gaps,
`surface` controls the card shell, and `controls` controls the timer/action area.
Element-specific styles stay beside their JSX in the component files above.
`TaskCardView` shares the presentation of ordinary and daily tasks. Its optional `timeDisplay` forwards to `TaskProgress`: `spent` hides the
visible total-duration suffix. All Timer cards use `spent`; the default
`spent-and-duration` remains available to other consumers. Both retain duration in the progress accessibility text.
The optional `timeNote` places a short 24-hour availability range between elapsed
and remaining time on scheduled daily cards, at the same font size. Midnight at
the end of the day is shown as `24`.

The header places the title on the left, with a Pencil Square edit button, and a document description icon on the right.
Cards use two columns from `sm` and three from `lg`. Below the header, time and progress fill the space beside the circular actions, with `gap-2` matching the gap between buttons. The time row shows elapsed time and negative remaining time. Edit is a plain icon matching the description icon in size.
The description popover
opens on hover or click. Tasks advance by one second per real second.
Desktop List View defaults off and syncs through the preference queue. `TaskList`
subscribes to `desktopListView` and sets a collection data attribute. When enabled,
the collection stays one column at every size. From `lg` (1024px), a four-column
grid with `gap-8` places the list in the first two columns and History in the
last two; below `lg` both use the full width. When the list is at least 28rem wide, `TaskCardView`
places the header and controls side by side, vertically centered with `gap-6`.
Below `lg`, the columns reserve at least 20rem for time and actions. From `lg`,
the header and controls use an equal split. Progress fills the space beside the
buttons with `gap-4`, so bars align across cards. Narrower list cards stack their content to
avoid clipping.
List-view task names and time text use `text-base` and `text-xs` respectively.
In this horizontal layout, task action buttons use the usual circular styling
at `size-8`; mobile cards retain their 40px targets.
Below `sm`, card layout is unchanged. Named group variants let cards respond to
the collection attribute without changing their memoized props. The floating
player retains its layout.
Unavailable Done controls are dimmed and have no hover effect or tooltip.
Tasks with an availability window show a `size-5` danger warning before Edit
when remaining duration plus a ten-minute buffer reaches the closing time.
The icon pulses only when reduced motion is off. Running tasks that can finish
on time suppress the warning; late running tasks still warn. Finished tasks and
closed windows clear it. `timerDeadline.ts` shares eligibility and next boundaries
between the card state, display clock, reminder scheduler, and server claim.
Other personal timer actions and Multitask keep their opacity while unavailable;
preview controls remain dimmed. Saves do not
block unrelated controls or rapid task actions.

Completed and missed tasks appear in `CompletedTasksTable` beside the list from
`lg` when Desktop List View is enabled, and below the tasks otherwise.
The section defaults collapsed except in Desktop List View from `lg`, where the
table and sort controls stay visible without a Show/Hide control. Elsewhere, Hide
collapses the sort controls and table; Show reveals them again. The expanded table wraps task names and descriptions and
scrolls horizontally on narrow screens. Restore returns an early Done task to
the active list paused, preserving its time, while its window is still open;
Met and Missed tasks cannot be restored.
`TaskList` partitions tasks using their current elapsed
time, so a task moves into the table as soon as its duration is reached or its
availability window closes unfinished. Missed tasks retain their progress and
are excluded from active counts without being marked Done or Met.
On page load, daily and ordinary cards are ordered by state: running, paused,
not started, then unavailable or reached cards. Completion percentage breaks
ties within each group; equal percentages preserve saved order. Cards keep their
positions during the visit as states and percentages change. New or restored
cards append; completed, missed, and deleted cards leave the active list. The
order resets on a new Jakarta day or when the page is reopened.
The list uses [useTimerClock.ts](../hooks/useTimerClock.ts) for one
clock across all cards and computes each task's state once per render. Cards
receive that state instead of creating their own intervals.
Display ticks align to estimated server-second boundaries, pause while the tab
is hidden, and refresh immediately on return or focus. Idle clocks schedule the
next availability boundary or midnight locally, without polling or per-second
updates. Collections reuse one Jakarta day boundary and derive each task once;
the toolbar counts tasks without sorting. TaskCard memoization compares its task,
date, and primitive display state so unchanged cards skip clock renders. [timerClock.ts](../utils/timerClock.ts)
estimates the clock offset from monotonic request duration and server timestamps,
excluding server processing time. Response timing is captured before validation,
and broadcasts preserve that calibration even when delivery is delayed.

Outside `/timer`, `FloatingTimerDock` reuses compact `TaskProgress`, the icon presentation
of `TaskActions`. Its wrapping title and muted remaining time (prefixed with `-`) sit above the progress bar
and form one link occupying half the dock, with circular actions beside it. It shows one
running task, initially the most recently started, with a task-count button that
cycles through tasks when needed. Manual selection survives navigation. Pausing from the dock retains
one paused task for Continue or Done; unrelated paused tasks are not added.
Completed or deleted tasks disappear, and selection falls back to a remaining
running task. Selection resets at Jakarta midnight and is not stored on disk.
Turso running tasks use the dock.

The shared `FloatingDock` displays Music above Timer as separate pills when both
are visible. Each pill spans the available width on phones, and both players'
controls remain accessible. The Timer pill has a task switcher when multiple
tasks are available, Complete, and Play/Pause. The dock measures its content and
reserves footer clearance once. Its minimum height matches the navigation surface, with a 53px
fallback when absent.
[useFloatingDockPosition.ts](../../../../components/floating/useFloatingDockPosition.ts)
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
runs, regardless of the number of running tasks. It stops when all
tasks pause, finish, or reach midnight, and continues across page navigation. It does not mute the existing
Start, Pause, Done, or completion sounds. Audio setup happens in the toggle's
click handler and on pointer/key interaction when restored ticking needs audio
permission after a reload. The switch stays enabled while the browser blocks
autoplay. The audio hook owns ticking timeout cleanup and checks elapsed time
before each tick, so overdue tasks stay silent while waiting for a server refresh.

During the final 10 real seconds of a task, the same Quartz warning ticks play automatically,
even with Sound off. They become faster with 6 and 3 seconds remaining and
stop when the task pauses or finishes. Remaining time uses real elapsed time.

The [provider](./TimerProvider.tsx) activates the deferred
[runtime](./TimerRuntime.tsx) for owner sessions or Timer visits
and keeps it alive across navigation. The runtime creates one stable
[controller](../utils/timerController.ts), registers it with the provider once,
and owns the shared SWR loading cache. `useTimer` subscribes
directly to selected fields through `useSyncExternalStore`; actions keep stable
identities. The provider does not relay snapshot updates through React state.
The controller derives preference defaults and exposes optimistic state from
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
  In-memory snapshot versions travel through `ETag` / `If-None-Match`;
  unchanged polls reuse confirmed tasks from a 304 response with fresh server
  clock headers. Saves and broadcasts update the same memory cache. Failed
  requests discard the transport cache so retries fetch full data.
  Concurrent snapshot reads in one tab share a single request. Snapshot and
  history reads start alongside validation-module loading and have a ten-second
  deadline covering both operations. Initial snapshot failures retry at most
  twice with a five-second base delay; focus, reconnect, and Try again can also
  recover. On the Timer page, failures appear in the floating retry notification,
  including when no snapshot exists. Saves retain their fifteen-second
  request timeout and are never automatically resent. Refresh errors clear when a
  fresh snapshot arrives; save errors remain available for explicit recovery.
- [timerDatabase.ts](../server/timerDatabase.ts) owns SQL mapping and atomic
  Turso transactions, with indexed active/pending-date discovery performed once,
  date-scoped batched reads, changed-row writes, and a reused runtime client.
  Unchanged snapshot probes read only day/preference revisions and running
  deadlines, using the existing partial indexes. A due completion or midnight
  bypasses the version match. History uses a read-only transaction for selected
  task rows, 30 summary rows, and running rows within that window, without
  fetching unrelated tasks or preferences.
  Backups and imports still read all history. Run `bun run migrate:timer` to add
  the pending-notification partial index. This module also owns preference writes
  and historical-total queries. [timerEngine.ts](../utils/timerEngine.ts) shares
  settlement, command preparation, and preference transitions between optimistic
  projection and server operations. The server retains authorization, date checks,
  revision increments, and completion claims.
  [timerBackup.ts](../utils/timerBackup.ts) validates imports.
- [useTimerAudioOwner.ts](../hooks/useTimerAudioOwner.ts) coordinates
  continuous audio with a Web Lock and focused-tab fallback.
- [useTimerPolling.ts](../hooks/useTimerPolling.ts) elects one visible polling
  tab using Web Locks, releasing ownership on hide or close. It polls every
  30 seconds while running or two minutes while idle. Snapshots from reads and
  saves update other tabs without another fetch; unsupported or blocked browser
  APIs fall back to independent polling. Focus and scheduled completion/midnight
  refreshes remain available in every tab.
- [useTimerSchedule.ts](../hooks/useTimerSchedule.ts) schedules only the earliest
  task completion and midnight refreshes.
- [useTimerDeadlineReminders.ts](../hooks/useTimerDeadlineReminders.ts) schedules
  window reminders from confirmed state while visible and reevaluates on focus.
  It pauses claims during pending edits/actions. A protected
  `claim-deadline-reminder` action rechecks eligibility and records
  `timer_tasks.deadline_reminder_at` in the same write transaction. Only its
  winner shows a silent `timer-deadline` toast, once per task/date across devices.
  Toast titles are “Start soon” or “Not enough time”; the description contains
  the task and closing time. Dismissal leaves the card warning visible. Open
  toasts update if time runs out and close when the warning clears. Claims lost
  to transport errors refresh confirmed state without automatically resending.
  Legacy records/backups treat a missing claim as unclaimed; backup comparison
  ignores claim timestamps. Historical dates never issue deadline reminders.
- [useTimerAudio.ts](../hooks/useTimerAudio.ts) owns ticking,
  restored-audio activation listeners, and audio-owner coordination.
- [useTimerTicking.ts](../hooks/useTimerTicking.ts) lets Settings subscribe to the
  browser-local preference and unlock audio during the toggle interaction.
- [useTimerNotifications.tsx](../hooks/useTimerNotifications.tsx) claims
  completions and supplies browser notifications and visible feedback.
  Completion messages use the shared share-feedback toast in the floating dock,
  above Music and Timer, with plain task text and a circular Done button. They
  stack for separate completions and ring until individually dismissed. Multiple
  completion notifications share one repeating sound.
  The local completion deadline displays and rings the toast immediately; server confirmation
  enables browser alerts without delaying the message or sound. A dismissed
  pending toast stays dismissed when confirmation arrives, and a completion
  claimed by another device removes the local pending toast.
  Timer errors use the same floating notification surface with a red Retry control
  and remain visible until recovery.
- [store.ts](../store.ts) persists daily records, and
  [timerSound.ts](../utils/timerSound.ts) generates sound.

The shared completion-time calculation in `timer.ts` uses real elapsed time for
scheduling, stored completion timestamps, and completed-task ordering. The store
handles concurrent starts and atomic single-task transitions. Optional
`lastStartedAt` timestamps preserve start order across elapsed-time updates;
older records remain readable without a migration. Action types and validation
live in [timer.ts](../utils/timer.ts) and
[timerValidation.ts](../utils/timerValidation.ts).

New Turso days copy the saved Daily Tasks; existing dates are not backfilled. Export creates a paused copy without changing live timers;
Import adds missing dates, fills empty days, skips identical records, and rejects
all conflicting occupied dates before writing. Imported completion alerts are
acknowledged. Saving requires network access; failures restore confirmed data
and retain failed form drafts in memory. Recovery refreshes authoritative data
before sending later queued commands; uncertain writes are not automatically
resent. Backup controls wait for queued saves to finish.
Initialize or migrate through `bun run migrate:timer`; see the root AGENTS.md.

Export and Import share a segmented group beside the secondary Settings button.
They show icons on smaller screens and icons with labels from 1024px, with native
hover labels and accessible names.
These controls sit beside Add Task, with running, paused, and not-started counts
at the opposite end. Their dots use the orange, green, and foreground task colors,
including when a count is zero. Completed tasks are excluded.
Settings opens a modal containing Alerts, Autoplay, Multitask, Sound, and Desktop List View
switches. Its header has the centered Settings title and a secondary Done button. Escape or clicking
outside closes the modal; switches save immediately, while preset changes use
their section Save buttons. The
switches retain their existing icons, followed by initially collapsed Duration
Presets, Task Presets, and Daily Tasks accordions. Duration lists allow 1–5 entries and task lists 1–10, with editable values,
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

Task cards place Complete before Play/Pause or Continue, matching the floating timer. Task action buttons use Trash, Play, Pause, and outline Check icons with a heavier `strokeWidth={2.5}` with hover labels and accessible names. Start and Continue both use Play; Delete retains its confirmation dialog. The Edit Task header uses a text Delete button.

## Daily Tasks

`DailyTaskSettings.tsx` owns the draft and Save/Cancel lifecycle. Pure conversion,
strict HH:mm parsing, and reordering live in `dailyTaskDraft.ts`; the memoized
`DailyTaskFields.tsx` renders one task with stable callbacks. The field list mounts
inside the accordion panel while draft state remains outside, preserving edits
across collapse without constructing closed-panel fields. The editor provides
add/remove, and Up/Down ordering. Names use the existing 20-character limit; daily
descriptions allow 2,000 characters. The list may be empty and shares the existing
100-task daily ceiling. Scheduled availability uses From/Until in WIB; Until 00:00
means the following midnight. Overnight windows other than that cutoff are rejected.
Closing Settings discards unsaved changes. `TimerSettings.tsx` owns one page-scoped
Base UI handle: the toolbar trigger opens Settings and restores focus through Base
UI. The settings subtree is a
sibling of the ticking toolbar; it has no custom window-event handoff. Definitions, ordering, and removal apply to future days only.

`utils/dailyTasks.ts` supplies the initial X (30m), YouTube (2h), Housekeeping (1h),
Morning Meditation (30m), Evening Meditation (30m), and Exercise (30m) definitions.
Preferences persist them in `timer_preferences.daily_tasks`; the server copies them
only when initializing a new Jakarta day, with reserved `daily:` IDs, zero spent
time and paused state. The existing `(date, id)` key and one transaction
prevent duplicate instances. Existing dates and their availability are preserved.

`timer_tasks.availability_window` stores JSON `{from, until}` in minutes after
Jakarta midnight; NULL means anytime. Reads, snapshots, history, writes, and backups
preserve this optional field. Legacy backups omit it and remain valid. Daily
definitions remain preferences and are excluded from the history-only backup.

Daily and ordinary cards share the same state-based ordering. Completed daily
cards remain visible, while unfinished tasks with closed windows move into
History as Missed. History and statistics still include their progress once.
Daily cards show elapsed time, availability, and remaining daily duration without
a total-duration suffix or recurring icon. Before a window or after completion,
they are muted and Play/Continue becomes a disabled lock.
Descriptions remain accessible, and unfinished cards can be edited for today.
Done can finish a started
task early; History can restore it without resetting progress while its window is open.

`taskWindowEnd`, `taskAvailable`, and `taskTransitionTime` share cutoff rules between
display, optimistic commands, server settlement, refresh scheduling, floating
eligibility, and audio. Opening is inclusive, closing exclusive. Closing a window
pauses a task without marking it complete or issuing a completion alert. The
remaining duration stays the daily allowance, even if less window time is left.
Editing a daily card changes its name, description, and duration for today only;
its availability and future-day definition are unchanged. Daily cards cannot be
deleted, and Autoplay skips them. Ordinary task behavior is preserved.

Tasks always advance in real time. Existing recorded progress is preserved. Legacy
version-1 backups remain accepted: retired speed fields are discarded, and any
unsettled running interval uses real elapsed time. New exports omit speed. Existing
databases may retain an unused speed column; no migration is needed for its removal
from the runtime.
