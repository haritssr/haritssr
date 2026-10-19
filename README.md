- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Labs](https://haritssr.com/labs): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [More](https://haritssr.com/more): Interests and personal notes.
- [Commits](https://haritssr.com/commits): Commit history and activity.
  Model suitability lives at `/commits/2026-10-11` and `/commits/2026-10-15`;
  the dated review at
  `/commits/2026-10-14` covers a fixed set of committed changes in Jakarta time.
  All three pages are linked below the timeline and included in search and
  the sitemap.
  The October 15 assessment covers a fixed set of committed changes; model and
  effort labels are editorial estimates, not recorded model usage.

- Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.
- Timer at `/timer` tracks today's activities in Jakarta time, with daily history
  and a 30-day totals chart at `/timer/statistic`. `/timer/details` explains its
  behavior and lists its source and storage locations. By default, one activity runs at once.
  Starting another pauses the current activity unless Multitask is enabled.
  Multitask allows several activities to run independently; switching it off
  confirms keeping only the most recently started task running. Multitask and
  Autoplay preferences reset on reload. Running timers recover from saved
  timestamps after navigation, reloads, or browser closure, and stop at midnight.
  Each task has a saved speed from 1x to 3x in 0.5x steps; its speed control cycles
  through the options. Speed changes preserve recorded progress, and statistics
  include accelerated task time.
  X Traversal and House keeping recur daily with one-hour budgets; added activities are for
  today only. Reached activities stop at their duration. Done finishes a running or paused activity
  early while preserving its actual time spent. Autoplay starts the next unfinished
  activity after Done or a duration completion when no tasks remain running,
  prioritizing paused activities.
  It runs while the site is open and stops when no unfinished activities remain. Unfinished activities
  have an Edit action to change their name, description, and duration using the same
  fields and presets as New Task. Edited durations must exceed time already spent.
- Timer UI components live in `app/timer/components/`; its [component guide](app/timer/components/README.md)
  maps each visible control to its file. `TimerClient.tsx` composes the page,
  `taskPresentation.ts` owns card/list layout and colors, and `TaskFormDialog.tsx`
  supplies the identical Add/Edit form.
- Local Timer data lives in ignored `data/timer/YYYY-MM-DD.json` files, written
  atomically by one local Node server process. Run `bun run seed:timer` to create
  realistic sample records for the previous 30 completed days; it never overwrites
  existing files. These are sample records, not measured activity. Production
  shows a read-only generated preview, does not read personal files, and rejects
  Timer mutations. Personal files are excluded from deployment tracing.
- Timer browser notifications are opt-in, with visible completion messages as a
  fallback. Alerts may be delayed while the browser is closed or suspended;
  there is no push service or background scheduler. Notification support varies
  by browser; mobile may require installing the site. The Timer registers the
  existing service worker locally only when a permitted completion needs it.
- Subscribe to the [RSS feed](https://haritssr.com/feed.xml).

User Interface labs live at `/labs/user-interface` and its child
routes. Labs uses `/labs` throughout navigation, metadata, search, and the sitemap;
the previous `/experiments` routes have no redirects or aliases. Discontinued
records retain their historical URLs. The Tools lab keeps its existing
`experiment.db` SQLite filename so local data remains available after the rename.

Every non-home page shows a pill back button in the top bar at every screen size,
including before scrolling. Home keeps the “Harits Syah” link. Pass the destination
through `PageHeader`'s `back={{ href, name }}` prop and set `path` to the exact route;
the header stores navigation metadata without rendering a back link or reserving
an empty navigation row above the title. Lab headers provide their parent
destination even when the former in-content back button was hidden. The top bar
uses Home when matching header metadata is unavailable. Below 640px, the back
pill shows its destination name at the page top and becomes chevron-only as soon
as the page is scrolled. Desktop always keeps the destination name. The topbar
`BackButton` accepts `compact` for this mobile-only icon state; long labels
truncate to keep the controls on one row.

`useScrolledPageHeader` discovers back metadata independently of the title's scroll
position. `PageTitle` provides the title marker: once the title scrolls behind the
top bar, it replaces the center navigation. Returning to the title restores center
navigation while keeping the back button visible.
Clicking the scrolling title or article back-to-top clears the URL fragment
without adding a history entry, preserves query parameters, and scrolls to the top.
On every screen size, the scrolling title is centered in the available space
between the Back pill and the complete right-hand control group, with equal
gaps on either side. The title pill fits its text and truncates long titles
within that space.

The desktop navigation pill is also visible on Home and lists Home, Projects,
Labs, Writing, Design, and Commits in that order. It appears from 1024px so all
six links fit between the side controls. Home's responsive card grid also links
to Commits with the count from the shared changelog snapshot.

Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
shared `SectionHeading` components) show an icon-only
Contents button in its own pill to the right of the top bar actions. Contents opens
below the trigger on desktop and in a sheet on mobile. Below 640px, Search,
Share, and GitHub always appear inside the sheet below its grab handle,
including before scrolling. Only the Contents trigger appears in the top bar.
Home and first-level routes show the inline actions pill at the page top,
collapsing it into Page actions on mobile after scrolling. Nested pages without
contents always show a matching Page actions
pill with the same list icon as Contents on mobile, opening the actions in a
modal Dialog that locks background scrolling and traps focus. Desktop shows the
inline actions pill instead. The menu stays right-aligned below its trigger and uses
the Contents panel material and rounded corners, with vertical icon-and-label
rows for Search, Copy URL, and View Source.
Selecting any action closes the dialog; copy-link feedback remains visible
after it closes.
Search waits for the sheet or actions dialog to close; its shortcut remains
available and returns focus to the corresponding trigger.
The top bar shares one mobile breakpoint subscription across its controls and
updates scroll state only when entering or leaving the page top. Header discovery
ignores unrelated content mutations. Active-section tracking runs inside the
Contents panel only while it is open; search status updates are isolated from
the menu action callbacks.
Home and first-level routes omit the Contents button. Writing and lab
articles show their floating back-to-top control when scrolling upward. It
hides while scrolling downward and at the top of the page.

Below 640px, floating icon controls use 40px tap targets and 20px icons;
desktop controls retain their compact sizing. Text pills have a matching minimum
height, and bottom navigation links have at least 40px tap height. The top bar
stays on one row, truncating the site name or page title when space is limited.

The top bar uses the layout background at 70% opacity with a subtle blur while
scrolling. Navigation controls no longer share a floating surface treatment.
The Pill Material lab retains its adjustable opacity and blur.

UI colors use near-white (`zinc-50`) and near-black (`zinc-900`) instead of pure
white or black, including shared color tokens, control thumbs, and shadows.

Global search opens with a single list of Home, Projects, Labs, Writing,
and Design, followed by Share and GitHub. Type to filter pages and commands.
Type `share` and press Enter to copy the current page URL (including its query
and fragment); the same confirmation and clipboard behavior are shared with the
top-bar Share button.

The mobile BottomBar appears on Home and routes under Projects, Labs,
Writing, Design, and Commits up to two URL segments deep, such as
`/labs/mathematics`. Nested routes highlight their main section. Individual
writing articles, deeper routes, and other sections omit it. The design preview
remains available. Its six links share equal width; Commits uses a history clock icon.

The shared layout uses a viewport-height flex layout for the whole page, so its footer fits
without extra scrolling when the content fits. Longer content still scrolls normally.
The root reserves symmetric scrollbar gutters so expanding accordions or navigating
between short and long pages keeps the centered layout in place.
