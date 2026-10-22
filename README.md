- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Labs](https://haritssr.com/labs): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [Commits](https://haritssr.com/commits): Commit history and activity.
  [Weekly changelog](https://haritssr.com/commits/weekly-changelog) presents
  curated summaries from January 2026 through October 22, newest first. Each
  month uses days 1–7, 8–14, 15–21, 22–28, and 29–month end; inactive weeks
  remain visible and the current week is marked partial. Update the summaries
  and review cutoff together in `app/commits/weekly-changelog/data.ts`.
  Model suitability lives at `/commits/2026-10-11` and `/commits/2026-10-15`;
  the dated review at
  `/commits/2026-10-14` covers a fixed set of committed changes in Jakarta time.
  Reviews for `/commits/2026-10-21` and `/commits/2026-10-22` cover fixed
  snapshots of those days’ committed changes. All dated pages are linked below
  the timeline and included in search and the sitemap. The October 14, 21, and
  22 reviews include per-commit model and reasoning-effort suitability estimates.
  The October 15 assessment covers a fixed set of committed changes; model and
  effort labels are editorial estimates, not recorded model usage.

- Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.
- Timer at `/timer` tracks personal activities by Jakarta calendar day, with
  daily history and 30-day totals at `/timer/statistic`. `/timer/details` explains
  behavior, Turso schema, source files, and interactive Pele relationship diagrams.
- Turso is the only runtime store. The protected Next.js API keeps credentials
  server-only. `app/timer/server/timerDatabase.ts` maps SQL rows and owns transactions;
  `app/timer/store.ts` applies the shared `timerEngine.ts` rules. Reads are batched,
  ordinary writes update only changed task rows, and runtime requests reuse a
  database client. `timerMutations.ts` projects queued changes in memory and
  reconciles confirmed revisions. Add accepts an optional UUID `taskId` so repeat
  creation cannot duplicate the task. No task data is
  written to IndexedDB or local JSON. Signed-in devices share tasks and preferences.
- Personal access uses Google OpenID Connect restricted to `TIMER_GOOGLE_EMAIL`.
  Only the configured verified email can sign in; optionally pin the permanent
  account subject with `TIMER_GOOGLE_USER_ID`. Sessions identify the Google subject,
  include the allowed email, use signed HttpOnly SameSite cookies, expire after
  seven days, and use Secure cookies in production. The server validates Google's
  ID token signature, issuer, audience, expiration, nonce, and verified email.
  OAuth uses state and PKCE. No Google tokens are persisted. Old GitHub sessions
  are rejected. Rotate `TIMER_SESSION_SECRET` to invalidate all sessions.
  Visitors receive read-only samples; personal history requires the owner session.
  Sign-out clears the current browser session. No account table is needed.
- Configure credentials in the Git-ignored `.env.local`; setup comments live beside
  its settings. In Google Cloud Console, configure the
  consent screen and create an OAuth client of type **Web application**. Register
  `{TIMER_AUTH_ORIGIN}/api/timer/auth/callback` as an authorized redirect URI.
  For localhost this is `http://localhost:3000/api/timer/auth/callback`; production
  is `https://haritssr.com/api/timer/auth/callback`. Match the actual origin exactly.
  Configure `TIMER_GOOGLE_CLIENT_ID`, `TIMER_GOOGLE_CLIENT_SECRET`,
  `TIMER_GOOGLE_EMAIL`, `TIMER_SESSION_SECRET`, and `TIMER_AUTH_ORIGIN` locally and
  in deployment. If the Google app is in testing, add your account as a test user.
  `TIMER_GOOGLE_USER_ID` is optional; an empty or whitespace-only value is treated
  as unset. `TIMER_AUTH_ORIGIN` accepts surrounding whitespace and a trailing slash;
  it must use HTTPS in production and contain no credentials, path, query, or fragment.
  Login configuration failures return `AUTH_CONFIGURATION_INVALID` with the affected
  variable names and safe setup hints. Responses and server logs never include their
  values. Save corrected Production variables in Vercel and redeploy before retrying.
  Generate a session secret with `openssl rand -base64 32`. Keep every variable
  server-only. Missing settings leave personal data locked. Remove obsolete
  `TIMER_GITHUB_*` variables; the callback route and Turso schema do not change.
- Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` locally and in deployment.
  Run `bun run migrate:timer` to initialize the three-table schema. Run
  `bun run migrate:timer path/to/backup.json` to import a browser backup, or
  `bun run migrate:timer --local-json` to import `data/timer/*.json`. These commands
  write to the configured Turso database; source files remain untouched. Imports
  preserve IDs and dates (tasks use a composite date/ID key for legacy recurring IDs), restore timers paused, suppress old completion alerts,
  skip identical days, fill empty dates, and reject occupied-date conflicts atomically.
- Export/Import in Timer provide versioned JSON history backups (10 MB maximum).
  Backups contain
  task history, not preferences or credentials. Keep a backup before migrating.
- Start normally pauses other activities; Multitask permits concurrent tasks.
  Disabling it keeps the most recently started task, atomically with its preference.
  Autoplay starts the next unfinished task when none remain running, preferring
  paused tasks. Tasks support 1x–3x speed in 0.5x steps. Done preserves actual time;
  Reached stops at the duration. Edits require duration above time already spent.
  Names allow 20 characters and descriptions 35; legacy longer descriptions remain
  readable but must be shortened on edit. New days start empty.
- Progress derives from timestamps without a write every second. Tasks stop at
  Jakarta midnight. Actions and completion claims use write transactions so only
  one device handles a completion and its Autoplay transition. Visible owner pages poll every 15 seconds while tasks run, or every
  60 seconds while idle, and revalidate on focus. Hidden tabs stop polling;
  timestamp-based completion and midnight scheduling remain active. Read-only
  previews do not poll. Changes require network connectivity;
  actions update immediately through an in-memory optimistic queue while saves
  run in order. Failed saves restore confirmed state, retain Add/Edit drafts for
  reopening, and show an error with Retry to refresh authoritative data. Uncertain
  writes are not automatically resent. There is no offline writable fallback,
  background scheduler, or Autoplay while all pages close.
- Settings includes Duration Presets and Task Presets editors. Duration lists
  allow 1–5 entries and task lists 1–6, with separate Save and Cancel
  controls. Duration presets apply to Add and Edit; task presets in two columns appear below
  Duration in New Task, fill every field, and wait for Done before adding a task.
  Presets sync across devices and never change existing tasks. Names allow 20
  characters, descriptions 35, and durations one second to 24 hours. History
  backups do not include presets. Run `bun run migrate:timer` before deploying
  this version: it idempotently adds nullable `duration_presets` and `task_presets`
  JSON columns to existing preferences; missing values use the default presets.
- Autoplay, Multitask, and notification preferences persist in Turso. Ticking
  defaults off and remembers its setting in this browser across reloads and tabs.
  Web Locks coordinate continuous audio within one browser;
  other devices can play their own ticking. Completion feedback is claimed globally.
- Timer UI components live in `app/timer/_components/`; its
  [component guide](app/timer/_components/README.md) maps the controls. The global
  Timer components, hooks, utilities, and server modules are colocated under
  `app/timer/`. The shared account-session utility remains in `utils/timerSession.ts`.
  `TimerProvider` shares a lightweight session check with the account control.
  It lazy-loads `TimerRuntime` for the owner or after visiting a Timer page, then
  keeps it mounted across navigation. Anonymous visitors elsewhere do not load
  the runtime or request Timer snapshots. Outside Timer, the compact
  floating dock shows the task title, progress, speed, and circular actions above
  mobile navigation or within desktop content width. Completion messages link
  back to Timer. `timerClient.ts` handles HTTP transport; scheduling, notification,
  audio ownership, display clocks, and dock geometry live in focused hooks.
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
Labs, Writing, and Design in that order. It appears from 1024px so all
five links fit between the side controls. Home's responsive card grid links
to Timer, Commits, and Tree under Tools, with the commit count from the shared changelog snapshot.

Route-owned data lives beside its implementation: Projects uses
`app/projects/data.ts`; the Next.js articles and students demos each own a
`data.ts`; book search and dated commit articles keep their JSON beside the page
or demo. Writing MDX and its automatic module discovery live in
`app/writing/content/`, while the Next.js posts demo reads Markdown from
`app/labs/nextjs/posts/content/`. The active lab catalog and its metadata helpers
live in `app/labs/data.ts`; discontinued records live in
`app/labs/discontinued-data.ts`. The generated changelog snapshot lives in
`app/commits/changelog.json`; the site-wide route registry remains in `data/`.
The server-only `utils/routeManifest.ts` derives available routes, dynamic
patterns, parents, and update dates from these sources. Search, sitemap, and
tree reuse the manifest; content validation checks its page files and production
availability.

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

The homepage Shortcuts table documents the working global controls: Command+K
on Mac or Ctrl+K opens Search. Option on Mac or Alt on Windows with C toggles
Contents, S copies the current page URL with confirmation, T opens Timer,
R opens the RSS feed, and I opens the install prompt when available. Contents
requires a nested page with headings. The Option/Alt shortcuts ignore typing in
editable controls, composition, held-key repeats, and additional modifiers;
physical letter codes keep them working when Option changes the typed character.

The mobile TabBarButtom appears on Home and routes under Projects, Labs,
Writing, and Design up to two URL segments deep, such as
`/labs/mathematics`. Nested routes highlight their main section. Individual
writing articles, deeper routes, and other sections omit it. The design preview
remains available. Its five links share equal width; Design uses a squares-plus icon.

The shared layout uses a viewport-height flex layout for the whole page, so its footer fits
without extra scrolling when the content fits. Longer content still scrolls normally.
The root reserves symmetric scrollbar gutters so expanding accordions or navigating
between short and long pages keeps the centered layout in place.

Commit history defaults to the latest recorded day and renders at most 50 rows
on first load. `/api/commits` filters the committed snapshot and computes summary
counts and activity buckets on the server; later selections load on demand with
public response caching. Period, date, type, query, and row limit live in the URL;
Back/Forward restore them, and typing updates are debounced before requests.

Global search uses Ctrl/Cmd+K, preserving the browser Print shortcut. Top and
bottom navigation share `data/navigation.ts`; section links distinguish the
current page from a parent location.

Plain table-of-contents labels do not load KaTeX; mathematical labels load their
renderer separately. Fixed practice formulas render on the server, leaving only
answer selection in the client. Flow diagrams load near the viewport. Electron
configuration geometry runs in a dedicated worker with a four-entry cache and
ignores results from older selections. Confetti requires an explicit start,
provides Stop, and respects reduced motion.
