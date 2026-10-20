# Timer UI components

Start at [TimerClient.tsx](../TimerClient.tsx) for the page structure. It composes
Today, the toolbar, loading/error feedback, and the task list. These components
run inside its `use client` boundary.

| Change | File |
| --- | --- |
| Notification, Autoplay, Multitask, and Ticking toggles; Multitask confirmation; Cards/List controls | [TimerToolbar.tsx](TimerToolbar.tsx) |
| Collection spacing, order, and loading state | [TaskList.tsx](TaskList.tsx) |
| Active card structure, title, description placement, and per-task speed control | [TaskCard.tsx](TaskCard.tsx) |
| Completed task names, descriptions, times, percentages, and status | [CompletedTasksTable.tsx](CompletedTasksTable.tsx) |
| Time display, percentage, and progress bar | [TaskProgress.tsx](TaskProgress.tsx) |
| Delete confirmation for card and edit dialog | [DeleteTaskButton.tsx](DeleteTaskButton.tsx) |
| Start, Continue, Pause, and Done controls | [TaskActions.tsx](TaskActions.tsx) |
| Description hover target and popover | [TaskDescription.tsx](TaskDescription.tsx) |
| Add/Edit triggers and save behavior | [TaskDialog.tsx](TaskDialog.tsx) |
| Shared modal dimensions, fields, and header actions | [TaskFormDialog.tsx](TaskFormDialog.tsx) |
| Number inputs, stepper buttons, and duration presets | [DurationFields.tsx](DurationFields.tsx) |
| Card/list dimensions, borders, shadow, spacing, and state colors | [taskPresentation.ts](taskPresentation.ts) |
| Timer updates and derived task state | [useTaskState.ts](useTaskState.ts) |

Add and Edit use the same `TaskFormDialog`; only their title and initial values
differ. In that file, `TaskNameField`, `TaskDescriptionField`, and `TaskFormActions`
keep each form section easy to locate. `DurationFields` is shared too.

`taskPresentation.ts` holds layout choices shared by the collection and cards.
Within `TASK_VIEW_LAYOUT`, `collection` controls the outer grid and gaps,
`surface` controls the card shell, and `controls` controls the timer/action area.
Element-specific styles stay beside their JSX in the component files above.

The title and Edit action share the first header row. Description and the speed
control share a second row on mobile and desktop, aligned to opposite sides.
The underlined speed button, beside a clock icon, cycles through 1x, 1.5x, 2x,
2.5x, and 3x, then returns to 1x. Each task defaults to 1x and saves its own speed
across pauses and reloads. At 2x, each real second adds two seconds toward the
task's duration; summaries include this accelerated time. Changing speed settles
existing elapsed time at the old rate before applying the new rate, without
starting a paused task or changing the most-recently-started ordering.
The speed label uses tabular numerals and grows toward the left as its value changes.
Local timer actions and Multitask keep
their opacity while disabled during saves; unavailable preview controls remain dimmed.

Completed tasks appear in `CompletedTasksTable` below active tasks in both views.
The section defaults collapsed. View reveals the sort controls and table; Hide
collapses them again. The expanded table wraps task names and descriptions and
scrolls horizontally on narrow screens. `TaskList` partitions tasks using their current elapsed
time, so a task moves into the table as soon as its duration is reached.

Multitask appears after Autoplay. It defaults off and, like Autoplay, is a
session-only preference that resets on reload. When enabled, Start and Continue
leave other tasks running, with independent time and danger styling. Autoplay
starts one next unfinished task only when no tasks remain running.

Turning Multitask off with multiple running tasks opens a confirmation:
“Only the most recent task will continue”, with Cancel and OK. Cancel leaves all
tasks running; OK keeps the most recently started or continued task and pauses
the rest, preserving elapsed time. The server re-evaluates running tasks when
confirming. A failed save keeps Multitask enabled and shows an error. With zero
or one running task, no confirmation is needed.

Ticking defaults off and resets on reload. When enabled, one shared analog-style
tick plays per real second while any local task runs, regardless of task speed
or the number of running tasks. It stops when all tasks pause, finish, or reach
midnight, and continues across page navigation. It does not mute the existing
Start, Pause, Done, or completion sounds. Audio setup happens in the toggle's
click handler; the provider owns interval cleanup and checks elapsed time before
each tick, so overdue tasks stay silent while waiting for a server refresh.

During the final 10 real seconds of a task, warning ticks play automatically,
even with Ticking off. They become faster with 6 and 3 seconds remaining and
stop when the task pauses or finishes. Remaining time accounts for task speed.

Task persistence, notifications, autoplay, multitask state, and sound generation remain in
[TimerProvider](../../../components/TimerProvider.tsx),
[store.ts](../store.ts), and [timerSound.ts](../../../utils/timerSound.ts).
The provider schedules the earliest completion across all running tasks; the store
accounts for each task's speed, concurrent starts, and atomic single-task transitions. Optional
`lastStartedAt` timestamps preserve start order across elapsed-time updates;
older records remain readable without a migration. Action types and validation
live in [timer.ts](../../../utils/timer.ts) and
[timerValidation.ts](../../../utils/timerValidation.ts).
