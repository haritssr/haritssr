# Timer UI components

Start at [TimerClient.tsx](../TimerClient.tsx) for the page structure. It composes
Today, the toolbar, loading/error feedback, and the task list. These components
run inside its `use client` boundary.

| Change | File |
| --- | --- |
| Notification and Autoplay toggle buttons; Cards/List controls | [TimerToolbar.tsx](TimerToolbar.tsx) |
| Collection spacing, order, and loading state | [TaskList.tsx](TaskList.tsx) |
| Active card structure, title, and description placement | [TaskCard.tsx](TaskCard.tsx) |
| Completed task names, descriptions, times, percentages, and status | [CompletedTasksTable.tsx](CompletedTasksTable.tsx) |
| Time display, percentage, and progress bar | [TaskProgress.tsx](TaskProgress.tsx) |
| Start, Continue, Pause, and Done controls | [TaskActions.tsx](TaskActions.tsx) |
| Description hover target and popover | [TaskDescription.tsx](TaskDescription.tsx) |
| Add/Edit triggers and save behavior | [TaskDialog.tsx](TaskDialog.tsx) |
| Shared modal dimensions, padding, fields, and footer | [TaskFormDialog.tsx](TaskFormDialog.tsx) |
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

Completed tasks appear in `CompletedTasksTable` below active tasks in both views.
All details stay visible, with wrapping task names and descriptions and horizontal
scrolling on narrow screens. `TaskList` partitions tasks using their current elapsed
time, so a task moves into the table as soon as its duration is reached.

Task persistence, notifications, autoplay, and sound generation remain in
[TimerProvider](../../../components/TimerProvider.tsx),
[store.ts](../store.ts), and [timerSound.ts](../../../utils/timerSound.ts).
