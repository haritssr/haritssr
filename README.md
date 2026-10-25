- [URL](https://haritssr.com/url): Available in the homepage Tools section. Paste a URL to automatically remove all query parameters and copy the result. Turn automatic mode off to select individual parameters or fragments manually. Processing stays local and preserves retained URL encoding and parameter order.
- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Labs](https://haritssr.com/labs): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [Music](https://haritssr.com/music): Included songs and a device-local MP3 library and player.
- [Commits](https://haritssr.com/commits): Commit history and activity.
  [Changelog](https://haritssr.com/commits/weekly-changelog) presents
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
- Below 1024px, the footer shows breadcrumbs above the Jakarta date and live
  24-hour WIB clock. On desktop, breadcrumbs share a row with the date and clock
  combined on the right as `YYYY-MM-DD, Day, HH:mm:ss WIB`.
  Updates pause in hidden tabs and resume immediately on return;
  the display uses local clock data without API or database reads.
- The commit importer lives in `app/commits/import-commits.ts`.
  `bun run sync:commits` (or `bun run import:commits`) reads Git history directly
  into the separate Turso `commits` table from a full Git checkout. It includes
  authors Harits Syah and haritssr and rejects shallow checkouts. Configure
  `TURSO_COMMITS_DATABASE_URL` and `TURSO_COMMITS_AUTH_TOKEN` in `.env.local`.
  The importer validates Git records before connecting, uploads in one transaction,
  and verifies every source record before committing. Reruns update changed hashes
  without duplicating rows or deleting extra history. Run it manually after committing
  to upload new records; importing never runs during development, builds, or commits.
  `bun run import:commits --dry-run` validates Git history without database access.
  No JSON snapshot is generated or required.
- `/commits`, its dated analysis pages, `/api/commits`, and the homepage commit count
  read the separate Turso database through the server-only `utils/commits/commitHistory.ts`.
  The homepage uses a separate count-only query cached for 24 hours, so home visits
  do not refresh the full history. One full-history query is cached across requests
  for 24 hours, while React
  deduplicates reads within a server render. Filtering and activity calculations
  retain the existing behavior. API responses also use 24-hour browser and CDN caches,
  so changes can take longer than 24 hours to appear across cache layers.
  If a fresh read fails, the API
  returns an uncached 503; the homepage keeps its Tools links without the count.
  Next.js can retain previously cached results during revalidation failures.
  Set the two `TURSO_COMMITS_*` variables in Vercel Production and Preview before
  deploying. Runtime readers have no local file fallback.
  `/commits/details`, linked before Changelog in the Commits header,
  documents storage, cache consumers and periods, request-driven refreshes,
  database usage, and the manual import workflow.
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
  Timer maintenance scripts live in `app/timer/`. `bun run seed:timer` optionally
  generates 30 days of local sample JSON for imports; runtime demos generate samples
  directly without those files.
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
  one device handles a completion and its Autoplay transition. One visible owner
  tab polls every 30 seconds while tasks run, or every two minutes while idle,
  and shares validated snapshots with other tabs. Web Locks elect the polling
  tab; unsupported browsers use independent polling. Pages revalidate on focus.
  Hidden tabs stop polling;
  timestamp-based completion and midnight scheduling remain active. Read-only
  previews do not poll. Changes require network connectivity;
  actions update immediately through an in-memory optimistic queue while saves
  run in order. Failed saves restore confirmed state, retain Add/Edit drafts for
  reopening, and show an error with Retry to refresh authoritative data. Uncertain
  writes are not automatically resent. There is no offline writable fallback,
  background scheduler, or Autoplay while all pages close.
- Snapshot reads discover running and unacknowledged-task dates once through
  partial indexes, then fetch only those dates and today. Statistics reads full tasks only for its selected day and active dates, plus
  30 daily summary rows. SQLite triggers keep saved totals synchronized with
  inserts, edits, deletes, and imports; live task time is overlaid at read time.
  Run `bun run migrate:timer` before deploying these statistics changes to add
  and backfill the totals column and install its triggers. Unchanged snapshot
  broadcasts no longer trigger duplicate statistics requests; periodic polling,
  focus refresh, and cross-device updates retain their existing intervals. Backups and imports retain full-history reads.
  Run `bun run migrate:timer` after updating to add the pending-notification index.
- Settings includes Duration Presets and Task Presets editors. Duration lists
  allow 1–5 entries and task lists 1–10, with separate Save and Cancel
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

Components used by a single route live beside that route’s page. Related groups
shared across routes within a feature use `_components/`, such as
`app/labs/_components/`; shared UI primitives remain in the root `components/`
directory. Top bar components and their CSS module live in `components/topbar/`.
Article navigation components, hooks, and styles live in `components/article/`.

User Interface labs live at `/labs/user-interface` and its child
routes. Labs uses `/labs` throughout navigation, metadata, search, and the sitemap;
the previous `/experiments` routes have no redirects or aliases. Discontinued
records retain their historical URLs. The former Task and Tools SQLite labs,
their local databases, and the Task API have been removed.

Every non-home page shows a pill back button in the top bar at every screen size,
including before scrolling. Home shows the “Harits Syah” link in a matching pill without a chevron, keeping the top bar height consistent across routes. Pass the destination
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
Clicking the scrolling title clears the URL fragment
without adding a history entry, preserves query parameters, and scrolls to the top.
Below 640px, the scrolling title is centered in the bar with equal-width side
columns for Back and the compact action controls. At larger widths, it is centered
in the available space between Back and the complete right-hand control group.
Long titles truncate within that space.

Top-right inline actions share a 42px translucent capsule with 4px padding,
32px buttons, and 1px gaps. The compact Page actions trigger and separate Contents
trigger use matching circular capsules with an 8px gap. Icons use foreground color
and switch to the action token with an inset foreground highlight on hover or
while open. Mobile title columns reserve 42px, or 92px when Contents is present.

The desktop navigation pill is also visible on Home and lists Home, Projects,
Labs, Writing, and Design in that order. It appears from 1024px so all
five links fit between the side controls. Both navigation bars use translucent
fully rounded capsules, action-blue selected labels over a foreground/8 pill,
and foreground-colored inactive labels. Bottom tabs use filled icons and 8px
outer padding, with bottom safe-area clearance. Floating Music and Timer bars
share the capsule treatment and phone inset; their mobile stack gap matches the
navigation's safe-area-aware bottom padding (at least 8px). Flexible title areas leave room
for their fixed-size controls. Home's responsive card grid links
to Timer, Commits, Tree, Music, and URL under Tools, with the commit count from a separate Turso count query cached for 24 hours.

Shared helpers in `utils/` are grouped by responsibility: `commits/` handles
commit records and Turso reads; `content/` handles posts and article outlines;
`discovery/` handles catalogs, routes, and search indexing; `metadata/` handles
site constants and page metadata; `navigation/` handles command matching, slugs,
and source links. Standalone helpers remain at the root. Import individual modules
directly to preserve client/server boundaries.

Route-owned data lives beside its implementation: Projects uses
`app/projects/data.ts`; the Next.js articles and students demos each own a
`data.ts`; book search and dated commit articles keep their JSON beside the page
or demo. Writing MDX and its automatic module discovery live in
`app/writing/content/`, while the Next.js posts demo reads Markdown from
`app/labs/nextjs/posts/content/`. The active lab catalog and its metadata helpers
live in `app/labs/data.ts`; discontinued records live in
`app/labs/discontinued-data.ts`. Commit history lives in Git and Turso; the
site-wide route registry remains in `data/`.
The server-only `utils/discovery/routeManifest.ts` derives available routes, dynamic
patterns, parents, and update dates from these sources. Search, sitemap, and
tree reuse the manifest; content validation checks its page files and production
availability.

Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
shared `SectionHeading` components) show an icon-only
Contents button in its own pill to the right of the top bar actions. Contents opens
below the trigger on desktop and in a sheet on mobile. Search, Share, View Source,
and account controls stay inline at the page top and on Home. Below 640px, they
collapse into a Page actions menu only while the scrolling title is visible.
Contents keeps its own trigger; actions never move into its sheet.
Search closes an open Contents panel before opening its dialog, and its shortcut
returns focus to the Search button or compact Page actions trigger when dismissed.
The top bar updates scroll state only when entering or leaving the page top and
subscribes to the mobile breakpoint rather than continuous resize events. Header discovery
ignores unrelated content mutations. Active-section tracking runs inside the
Contents panel only while it is open; search status updates are isolated from
the navigation action callbacks.
Home and first-level routes omit the Contents button. Writing and lab
articles have no floating back-to-top button.

Below 640px, floating icon controls use 40px tap targets and 20px icons;
desktop controls retain their compact sizing. Text pills have a matching minimum
height, and bottom navigation links have at least 44px tap height. The top bar
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

Commit-specific components live in `app/commits/_components/`.

Commit history defaults to the latest recorded day and renders at most 50 rows
on first load. `/api/commits` filters cached Turso history and computes summary
counts and activity buckets on the server; later selections load on demand with
public response caching. Period, date, type, query, and row limit live in the URL;
Back/Forward restore them, and typing updates are debounced before requests.

The top bar measures its height once through `useTopBarHeight`; scrolling titles,
Contents highlighting, and anchor scroll padding use that measurement.
`HeaderActions` coordinates page actions, Contents, and Search handoffs;
`TopBarContents` renders only its outline control and panel. Shared action styling
lives in `TopBarAction`, and one root `SharePageProvider` supplies copy feedback
for buttons, keyboard shortcuts, and Search. Copy feedback uses a capsule matching
the bottom navigation's width, height, and safe-area spacing below `lg`; on desktop
it appears at the bottom right. Long URLs truncate within the capsule.


Global search uses Ctrl/Cmd+K, preserving the browser Print shortcut. Top and
bottom navigation share `data/navigation.ts` and route matching from
`utils/navigation/navigationState.ts`. Primary titles and search descriptions live
in `data/primaryRoutes.ts`; section links distinguish the
current page from a parent location.

Plain table-of-contents labels do not load KaTeX; mathematical labels load their
renderer separately. Fixed practice formulas render on the server, leaving only
answer selection in the client. Flow diagrams load near the viewport. Electron
configuration geometry runs in a dedicated worker with a four-entry cache and
ignores results from older selections. Confetti requires an explicit start,
provides Stop, and respects reduced motion.

## Gradient Cards

`/labs/user-interface/gradient-cards` contains 100 authored card recipes in one
mixed grid. It uses one, two, and four columns with `gap-5`, and demonstrates all
16 desktop column/row spans from 1×1 through 4×4. Tablet spans are capped at two;
mobile cards return to a single column with content-driven heights.

The gallery renders on the server. A small client controller delegates inspection
to native buttons and loads one Base UI inspector on demand. Gallery and inspector
share artwork and CSS serialization. Ten animated examples pause offscreen and
disable motion for reduced-motion preferences. Six generated images are stored
under `public/images/gradient-cards`; that folder's README records their prompts.

## Music

The Music header links to `/music/details` for storage notes and offline status.
Offline preparation still runs on the player page; Details only checks its status.

`/music` includes seven songs from `public/music`, cataloged in `app/music/data.ts`.
They appear automatically and stream directly from their public URLs, with native
audio seeking and no import step. These files are deployment assets and need a
connection. Add included songs by placing an MP3 in that folder and registering
its metadata in the catalog. Included songs cannot be removed through the player.

Users can also import MP3s into this browser's versioned IndexedDB database.
Original imported files stay untouched; imports are never uploaded. Track metadata, audio,
256px artwork thumbnails, and playback settings have separate stores. Clearing
site data or browser storage eviction removes the saved library. Root-level
MP3s remain ignored by Git; included audio is grouped under `public/music` instead.

The compact library initially sorts titles alphabetically and supports search,
saved library reordering, shuffle, repeat, seeking, and volume/mute. Move songs
with the library's six-dot drag handles; focused handles
also support arrow keys. Playback follows that order without a
separate Queue panel. New imports append after manually ordered songs.
The current song expands inside the library to show seeking and playback controls.
Embedded tags use `music-metadata`,
loaded during import, with filenames and a music icon as fallbacks. Imports run
sequentially and commit each file atomically. Identical filename/size/modification
time signatures are skipped. Import failures retain successful songs.
Repeat One applies only to automatic completion. Clicking Next at the end of the
queue wraps to its first song even with repeat off; automatic completion still
stops at the end. Exhausted shuffle queues also restart on manual Next.

A lazy Music runtime activates on `/music` or for a remembered visible player.
One native audio element survives client navigation; only the selected song
is loaded, from its public URL or a local audio blob. Position updates have
separate subscribers from the library.
Library, queue, selected song, position, and preferences restore paused after a
reload. A new playing tab pauses the previous one through BroadcastChannel and
storage events. Media Session controls are optional browser enhancements. Device
volume controls remain available where browser volume changes are unsupported.
Music and Timer sounds play together.

Outside `/music`, the Music bar remains visible while playing or paused. Close
pauses and dismisses it without losing the selected song. The shared
`components/floating/FloatingDock.tsx` portals Music above Timer and measures the
combined stack for navigation, safe-area, and footer clearance. Timer completion
and error messages retain their existing behavior. Neither inactive runtime is
loaded just to display the floating host.

In production, visiting Music prepares its public document and required immutable
Next.js assets through the existing service worker. Asset responses must carry
`Cache-Control: immutable`; development chunks are never served from this cache.
Development startup updates an existing site worker and removes stale Music
shell caches containing development assets, then reloads once when needed.
Imported songs and metadata remain in IndexedDB. “Player and imported songs
available offline” appears only after preparation succeeds. The document is committed to the cache after
its dependencies; failed refreshes retain the last complete shell. `/music` can
then reopen offline and play imported songs. Included songs are streamed online
and are not downloaded during offline setup. API/account responses, RSC payloads,
and other page documents are not cached. The generic offline fallback and Timer
notification click behavior remain intact. Initial setup needs a connection;
service-worker support and retained browser storage are required.
