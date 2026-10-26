<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Development and Verification

- Use Bun: `bun install --frozen-lockfile` and `bun run dev`. Reuse the existing
  dev server; never start multiple servers. This machine has 8 GB RAM.
- Never run a production build from an agent environment or use `--webpack`.
  Production builds belong in local human workflows or CI.
- Never launch temporary Chrome, including headless or automation sessions.
  Reuse an already-running browser or use non-browser verification.
- Avoid unnecessary background processes and stop temporary processes afterward.
- Never create, add, rename, or restore test files (`*.test.*`, `*.spec.*`, or
  files under `test/`, `tests/`, or `__tests__/`). Modify existing tests only
  when explicitly requested. Verify with existing tests and non-test checks.
- Use the smallest set of skills specific to the task.
- Keep [README.md](README.md) as a short, public introduction to the repository.
  Put developer setup and architecture notes in this file; explain feature
  behavior on its Details route. See Implementation Reference below.

## Verification

Run only commands whose triggers apply; multiple rows may apply. Check once after
the final relevant edit, reuse unchanged passing results, and rerun only affected
checks after failures or new edits. Questions and status updates need no checks.
Markdown-only documentation needs diff/link review; writing MDX follows the
content rule below. Markdown/MDX are excluded from Oxfmt.

`check` uses Ultracite → Oxfmt + Oxlint (`oxlint-tsgolint` for type-aware rules).
`typecheck` separately runs Next.js route type generation → native TypeScript 7.

For simple visual changes (colors, spacing, borders, typography, or CSS classes),
run only scoped `check`; do not run `typecheck`. This also applies to small
styling-only cleanup of inline styles or CSS custom properties when component
contracts and behavior stay unchanged.

| Command | Trigger |
| --- | --- |
| `bun run check <files...>` | Changes to supported source, CSS, or JSON files, including classes and JSX copy. Pass changed paths; skip unsupported assets and Markdown/MDX. |
| `bun run check` | Lint/format config or dependency changes, or refactors across shared modules and consumers. Otherwise use scoped checks. |
| `bun run typecheck` | Imports/exports, types, props, JSX structure, logic/hooks, API handlers, route folders/params, data shapes, TS/Next config, or type-affecting dependencies. Skip CSS/classes, static copy, unchanged-shape data values, Markdown, and assets. |
| `bun run knip` | Imports/exports, added/removed/renamed source or route files, dependencies, scripts, discovery entry points, or Knip config. Skip changes that leave the module/dependency graph unchanged. |
| `bun run knip:production` | Production entry points, conditional imports, dependency classification, or production Knip config; otherwise skip. |
| `bun run validate:content` | Lab catalog/routes, discontinued records, writing MDX/frontmatter, catalog/route/search discovery, frontmatter parsing, or the validator and its utilities. Skip unrelated UI/layout/CSS/docs. |
| `NODE_ENV=production bun run validate:content` | Those changes could alter public lab availability, including production filters and local DB gates; otherwise skip. |
| `bun run fix <files...>` | Auto-fixable errors in edited files; review the diff. Skip passing checks/manual-only failures; never fix the whole project for a local change. |

Verify behavior with existing tests or focused non-test checks, retaining the
browser/test-file restrictions. Other commands:

- `bun run import:commits --dry-run`: validate Git history without database access.
- `bun run sync:commits`: manually upload Git history to Turso when requested;
  never run automatically when committing, developing, or building.
- `bun run dev`: only when needed and no server exists; never just for checks.
- `bun run build`: human/CI only; never in an agent environment.
- `bun run start`: only when asked to serve an existing production build and no
  server exists; never build first or use it for verification.
- `bun install --frozen-lockfile`: only for missing dependencies or an installed
  dependency tree that does not match the lockfile.

## Next.js Documentation

[Official Next.js App Router documentation](https://nextjs.org/docs/app).

# Design and Components

- Before changing UI, inspect `/design` and `app/design/`. Reuse suitable shared
  components and their demonstrated behavior; create new ones only when needed.
  Follow existing design tokens.
- When discussing colors with the user, always use design-system color names,
  Tailwind tokens, or custom class/token names (for example, `zinc-50`,
  `bg-surface`, or `--color-border`). Never describe colors using hex values.
- Use Base UI for continuing widgets; React Aria is limited to the mobile
  article TOC Sheet and supporting controls. Do not reintroduce retired widget
  libraries; see Implementation Reference below for architecture.
- Repeated grid cards must have equal widths and heights within each row.
  Align content and actions with flexible layouts; avoid clipping, fixed heights,
  and masonry unless explicitly requested.

## Links

- Use `InternalLink`: `variant="inline"` for sentences, descriptions, and
  explanatory list items; default navigation for standalone links/lists;
  `variant="footer"` for footer navigation. Choose at the call site, never by
  DOM ancestry. Inline/footer links omit chevrons; inline inherits text sizing.

## Sections and Headings

- Use shared `Section` for titled content and `SectionHeading` for heading-only
  layouts. Leave specialized local sections intact unless explicitly refactoring.
- `Section` owns accessible heading IDs and `space-y-5`, with no global line
  height or width cap. `className` styles the section; `contentClassName` styles
  an optional body wrapper; `description` supplies muted introductory content.
- Container attributes apply to `Section`. Configure its heading through
  `headingAs`, `headingClassName`, and `headingVariant`. Preserve existing
  fragment anchors by moving their IDs to the section container.
- Page titles use the shared `PageTitle` typography inside `PageHeader`, without
  size or class overrides. The layout provides 32px above page content. `Footer`
  reserves a 24px breadcrumb row above the date and clock below 1024px; on desktop,
  breadcrumbs share a row with the date and clock grouped on the right, above
  the footer actions. `Breadcrumbs` owns its spacing;
  `PageHeader` starts with its title and renders no back link or empty navigation
  row. Pass back destinations through `back={{ href, name }}` for the top bar;
  put icons beside the title, keeping every title aligned to the same starting
  position. The header owns `gap-4` internally and `mb-16`
  before content; its child components have no vertical margins. Keep headers
  outside content stacks and omit an extra top margin on the first content block.
- Use `PageDescription` for page introductions (`as="div"` for block content).
- Physics and mathematics lab section stacks use parent `space-y-20`,
  including lab/demo sections. Other lab domains use `space-y-16`.
  Omit section top/bottom margins; keep introductions and source links together.
- Keep independent exercise/rule cards unnumbered in unordered lists. Number
  ordered solution steps and question-navigation controls when needed.
- Exclude all accordion/disclosure trigger headings from article TOCs,
  including custom implementations. Visible headings inside open panels may appear.

## Lab Width

Apply these defaults to new or refactored labs in every domain:

- Keep page and section containers, titles, and introductory descriptions full
  width. Apply left-aligned `max-w-3xl` only to reading content (explanations,
  derivations, solution steps, proofs, summaries, takeaways), such as
  `<Section contentClassName="max-w-3xl space-y-5" ...>`. Never cap a container
  that also holds a title or description.
- Interactive sections, labs, demos, visualizations, tables, and card grids use
  full available width with responsive columns. Preserve suitable intrinsic
  sizing for diagrams, controls, and overlays.
- In mixed sections, narrow only explanatory body content; keep the heading,
  description, and interactive content full width. Do not add a global cap to
  `Section`.
- Keep mobile layouts fluid; scroll wide equations/tables locally without
  causing page overflow. Other pages stay full width unless directed otherwise.

## Mathematical Notation

- Render all mathematical notation as TeX through `@/utils/katexify`: inline
  within sentences, display mode for standalone equations. Do not substitute
  Unicode, plain text, `<sub>`/`<sup>`, or monospace mathematical typography.
- Ensure `katex/dist/katex.min.css` is available wherever KaTeX is rendered.

# Content and Routes

- Every tool must have a Details page with these sections:
  - **Logics**: The axioms, rules, constraints, and design principles governing
    the tool's behavior.
  - **How this works**: A Pele diagram showing how related components connect
    and how data flows between them.
- Never add redirect rules in `next.config.ts`. Do not automatically add
  redirects when renaming routes; legacy URL aliases are intentionally absent.
- Lab routes are literal folders. Register title, description, tags,
  creation date, and update history in `app/labs/data.ts`. Append an
  update date once per calendar day; preserve creation dates and prior history.
- Physics and mathematics preview descriptions use concise catalog copy (aim
  for 80 characters or fewer) to fit roughly two lines in small link previews.
  Reuse it in page metadata instead of longer local overrides; keep detailed
  explanations in page content. Preview line wrapping depends on the host app.
- Writing uses local `app/writing/content/*.mdx` with validated frontmatter and
  automatic module discovery, without an import registry. Use `/writing` URLs directly.
- Every non-home page shows a pill `BackButton` in the top bar at every screen
  size, regardless of scroll position. Home keeps the site-name link. Pass the
  exact route through `PageHeader.path` and the destination through its `back`
  prop; the header supplies back metadata and `PageTitle` supplies the title marker
  for `useScrolledPageHeader`. Use Home when matching back metadata is unavailable.
  The title replaces center navigation only after scrolling behind the top bar;
  returning to the title restores center navigation while retaining the back pill.
- Keep Search, Share, View Source, and account controls inline at the page top
  and on Home. Below 640px, group them in a Page actions menu only while the
  scrolled page title is visible. Center that title with equal-width side columns.
  Keep Contents separate; never move page actions into its sheet.
- Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
  shared `SectionHeading` components) show `TopBarContents` in its
  own pill to the right of the top bar actions. Contents use rendered heading anchors,
  a desktop popover below the trigger, and a mobile sheet. Hide it on Home and
  all first-level routes. Do not add floating back-to-top buttons to writing
  or lab pages. Preserve their `data-article-*` title metadata.
- Keep `/api` current when GET endpoints change. Use shared `InternalLink` and
  concrete catch-all examples. Keep its footer link left of Install. Include
  the directory in search/sitemap, not raw endpoints; gate local-only entries.
- Music imports remain device-local in IndexedDB; never upload imported files.
  Included songs live in `public/music` with their catalog in `app/music/data.ts`
  and stream directly from the site. These public assets are deployed with it.
  Keep its persistent audio runtime lazy. Shared `FloatingDock` owns Music above
  Timer, navigation clearance, and combined footer spacing. Cache only the public
  Music shell and required immutable assets for offline reopening; never cache
  API/account responses or return HTML to RSC requests.
- Keep public pages searchable.

# Metadata and Site Behavior

- Use shared metadata in `utils/metadata/pageMetadata.ts` and the canonical domain from
  `utils/metadata/site.ts` for page URLs, social previews, sitemap, and RSS.
- Follow the metadata, archive, and offline safeguards in Implementation
  Reference below when changing their implementations.

# Commits

- Commit only with explicit user permission; committing is a separate action.
- Do not generate or restore `changelog.json`. Commit history is imported directly
  from Git into Turso with `bun run sync:commits`, only when explicitly requested.
  Creating Git commits does not authorize a database upload.
- Use `type(context): message`, such as `fix(TopBar): align back icon`.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related documentation. Keep project guidance accurate
  in the same change; `test` commits remain subject to the testing policy above.


# Implementation Reference

These notes describe the current implementation. Keep operational instructions
here and user-facing explanations on each feature's Details route:
[Music](https://haritssr.com/music/details),
[Timer](https://haritssr.com/timer/details), and
[Commits](https://haritssr.com/commits/details).

## Project structure

Route-specific components and data live beside their pages. Components shared
within a feature use `_components/`; site-wide UI lives in `components/`.
Top bar and article navigation live in `components/topbar/` and
`components/article/`.

Important content sources:

| Content | Location |
| --- | --- |
| Projects | `app/projects/data.ts` |
| Active labs and metadata | `app/labs/data.ts` |
| Discontinued labs | `app/labs/discontinued-data.ts` |
| Writing and automatic MDX discovery | `app/writing/content/` |
| Next.js posts demo | `app/labs/nextjs/posts/content/` |
| Included songs | `app/music/data.ts` and `public/music/` |
| Primary routes and navigation | `data/primaryRoutes.ts` and `data/navigation.ts` |
| Commit history | Git and the separate Turso commits database |

Other demos keep their data beside their implementation. Shared utilities are
grouped under `utils/{commits,content,discovery,metadata,navigation}/`; import
individual modules to preserve client/server boundaries.

The server-only `utils/discovery/routeManifest.ts` derives routes, parents,
dynamic patterns, and update dates. Search, sitemap, Tree, and content validation
reuse it. Metadata helpers and canonical site constants live in
`utils/metadata/`.

Labs use literal `/labs` routes, including `/labs/user-interface`. Former
`/experiments` routes have no aliases or redirects; discontinued records retain
historical URLs. The former Task and Tools SQLite labs and Task API are removed.

## Navigation and UI

`PageHeader` receives the exact `path` and `back={{ href, name }}` destination.
Every non-home page shows a top-bar back pill; Home shows the site name. Below
640px, the back label becomes icon-only after scrolling. `PageTitle` supplies the
marker that replaces center navigation with the scrolled title. Equal side
columns center that title; long titles truncate. Clicking it scrolls to the top
and removes the fragment without changing query parameters or adding history.

Nested pages with headings show Contents in a separate pill: a desktop popover
or mobile sheet. Home and first-level routes omit it. Search, Share, View Source,
and account controls remain inline until the scrolled title appears below 640px,
when they move into Page actions. Search closes Contents and restores focus on
dismissal. Writing and lab articles have no floating back-to-top control.

Desktop navigation appears from 1024px. Mobile bottom navigation appears on Home
and within Projects, Labs, Writing, and Design up to two URL segments deep;
articles and deeper routes omit it. Both use the shared navigation data and
`utils/navigation/navigationState.ts`.

Controls follow `/design` tokens, using `zinc-50` and `zinc-900` rather than pure
white or black. Mobile floating controls have 40px targets; bottom tabs have at
least 44px height. Shared `FloatingDock` positions Music above Timer and reserves
navigation, safe-area, and footer clearance without loading inactive runtimes.

The viewport-height layout keeps the footer at the bottom on short pages.
Symmetric scrollbar gutters prevent horizontal shifts. Below 1024px, footer
breadcrumbs sit above the Jakarta date and live WIB clock; desktop groups the
date and clock on the right as `YYYY-MM-DD, Day, HH:mm:ss WIB`. The clock uses
local data and pauses in hidden tabs.

### Homepage and shortcuts

The profile card keeps contacts visible and puts background and principles in a
More accordion below 768px. Desktop retains three columns.

Features use a rounded grid with dashed dividers, one column on mobile and three
on desktop. Each title shows its shortcut. Previews are decorative except for
the working Install button. It shares a browser install prompt with the footer's
plain Install action; the footer action appears only when available, while the
homepage button is disabled otherwise. Installation requires user activation.

| Shortcut | Action |
| --- | --- |
| `⌘P/Ctrl+P` | Search; overrides browser Print |
| `Opt+C/Alt+C` | Toggle Contents on nested pages with headings |
| `Opt+S/Alt+S` | Copy the current URL, including query and fragment |
| `Opt+T/Alt+T` | Open Timer |
| `Opt+R/Alt+R` | Open RSS |
| `Opt+I/Alt+I` | Install when available |

Option/Alt shortcuts ignore editable controls, composition, repeats, and extra
modifiers. They use physical letter codes. Search filters primary pages, tools,
and commands; its Share command uses the same feedback as the top-bar action.
One root `SharePageProvider` supplies copy feedback.

`useTopBarHeight` provides the measurement used by scrolling titles, Contents,
and anchor spacing. `HeaderActions` coordinates action handoffs; Contents tracks
active sections only while open. Scroll updates occur at state boundaries,
not on every scroll event.

## Commits

`/commits`, dated reviews, `/api/commits`, and the homepage count read Turso through
server-only `utils/commits/commitHistory.ts`. Runtime readers have no local fallback.

Configure these server-only variables locally and in Vercel Production/Preview:

- `TURSO_COMMITS_DATABASE_URL`
- `TURSO_COMMITS_AUTH_TOKEN`

Import manually from a full Git checkout:

```sh
bun run import:commits --dry-run
bun run sync:commits
```

The importer (`app/commits/import-commits.ts`) accepts authors Harits Syah and
haritssr, rejects shallow checkouts, validates before connecting, and verifies
records within one transaction. Reruns update matching hashes without duplicates
or deleting extra history. Imports never run automatically during development,
builds, or commits. No JSON snapshot is used.

History and the separate count-only query cache for 24 hours. API responses also
have 24-hour browser/CDN caches, so updates may take longer to appear. Failed fresh
API reads return uncached 503 responses; Home retains tool links without a count.
Next.js may retain cached results after revalidation failures.

The explorer starts on the latest recorded day with at most 50 rows. Filters and
row limits live in the URL; later selections load through the API with debounced
search and Back/Forward support. See `/commits/details` for storage and caching.

`/commits/weekly-changelog` contains curated summaries from January 2026 through
October 22. Weeks use days 1–7, 8–14, 15–21, 22–28, and 29–month end; inactive weeks
remain visible and the current week is partial. Update summaries and the review
cutoff together in `app/commits/weekly-changelog/data.ts`.
Dated reviews and model assessments cover fixed commit snapshots and appear in
search and sitemap. Model and reasoning-effort labels are editorial estimates,
not recorded usage.

## Timer

`/timer` tracks activities by Jakarta calendar day. `/timer/statistic` shows daily
history and 30-day totals; `/timer/details` explains rules, schema, and component
diagrams. The [component guide](app/timer/_components/README.md) maps its controls.

### Storage and setup

Turso stores owner tasks and preferences across devices. Visitors receive read-only
samples. Credentials stay server-only; no task data is stored in IndexedDB or local
JSON at runtime.

Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`, then initialize or update the schema:

```sh
bun run migrate:timer
```

Run migration before deploying schema changes. It idempotently creates tables,
summary triggers, pending-notification indexes, and preset columns.
`timerDatabase.ts` owns SQL mapping, preference writes, historical-total reads,
and transactions; `store.ts` coordinates `timerEngine.ts` rules. Shared command
and preference operations also drive optimistic projection; server authorization,
date checks, revisions, and completion claims remain authoritative. Mutations
project queued changes in memory and reconcile confirmed revisions. Writes affect changed rows; optional UUID `taskId` makes
repeated creation idempotent.

### Owner authentication

Google OpenID Connect allows only the verified `TIMER_GOOGLE_EMAIL`. Optionally
pin its permanent subject with `TIMER_GOOGLE_USER_ID`. Configure in Git-ignored
`.env.local` and deployment:

- `TIMER_GOOGLE_CLIENT_ID`
- `TIMER_GOOGLE_CLIENT_SECRET`
- `TIMER_GOOGLE_EMAIL`
- `TIMER_SESSION_SECRET` (generate with `openssl rand -base64 32`)
- `TIMER_AUTH_ORIGIN`
- `TIMER_GOOGLE_USER_ID` (optional; blank means unset)

Create a Google OAuth **Web application** client and register
`{TIMER_AUTH_ORIGIN}/api/timer/auth/callback`, for example
`http://localhost:3000/api/timer/auth/callback` or
`https://haritssr.com/api/timer/auth/callback`. Add the owner as a test user when
the consent app is in testing. The origin must match exactly, use HTTPS in
production, and contain no credentials, path, query, or fragment; surrounding
whitespace and a trailing slash are accepted.

OAuth uses state, PKCE, and nonce. The server validates Google's signature,
issuer, audience, expiration, and verified email. Seven-day sessions use signed
HttpOnly SameSite cookies, Secure in production. No Google tokens or account
table are stored. Sign-out clears this browser's session; rotating the session
secret invalidates all sessions. Old GitHub sessions are rejected; remove obsolete
`TIMER_GITHUB_*` settings.

Missing configuration keeps personal data locked. `AUTH_CONFIGURATION_INVALID`
reports variable names and safe hints without exposing values. Correct Vercel
Production variables and redeploy before retrying.

### Rules and synchronization

- Start pauses other tasks unless Multitask is enabled. Disabling Multitask keeps
  the most recently started task atomically with its preference.
- Autoplay prefers paused unfinished tasks when none remain running. Speed ranges
  from 1x to 3x in 0.5x steps. Done preserves actual time; Reached stops at duration.
- Duration must exceed time spent. Names allow 20 characters and descriptions 35;
  longer legacy descriptions must be shortened on edit. New days start empty.
- Time derives from timestamps without per-second writes. Tasks stop at Jakarta
  midnight. Transactions ensure one device claims each completion and transition.
- One visible owner tab polls every 30 seconds while running or two minutes while
  idle. Web Locks elect it and validated snapshots reach other tabs; unsupported
  browsers poll independently. Focus refreshes data. Hidden tabs and previews do
  not poll, though completion and midnight scheduling remain active in hidden tabs.
- Changes need a connection. An optimistic queue saves in order; failures restore
  confirmed state, preserve Add/Edit drafts, and offer Retry to refresh. Uncertain
  writes are never resent automatically. There is no offline writable fallback,
  background scheduler, or Autoplay after all pages close.

Snapshot reads fetch today plus running/unacknowledged dates found through partial
indexes. Statistics fetch selected/active dates and 30 summary rows. SQL triggers
maintain saved totals; reads overlay live time. Backups still read full history.

Duration Presets allow 1–5 entries and Task Presets 1–10, with Save/Cancel controls.
They sync across devices, apply to Add/Edit, and never modify existing tasks.
Durations range from one second to 24 hours; history backups exclude presets.
Autoplay, Multitask, and notification preferences also sync through Turso. Ticking
defaults off and persists in this browser; Web Locks coordinate local audio.
Completion feedback is claimed globally.

`TimerProvider` shares the account session check and lazy-loads `TimerRuntime` for
the owner or after a Timer visit, retaining it across navigation. Other anonymous
visitors load neither runtime nor snapshots. The runtime registers one stable
`timerController` with the provider; `useTimer` subscribes directly to selected
fields, without relaying snapshots through provider state. `useTimerAudio` owns
ticking and warnings, `useTimerSchedule` owns completion/midnight refreshes, and
`useTimerTicking` handles the Settings preference subscription and audio unlock.
`timerInput` shares form limits with counters and server schemas while preserving
broader legacy record validation. HTTP transport, scheduling, audio,
notifications, and display clocks live in focused modules under `app/timer/`.

Notifications are opt-in with on-screen fallback. Closed or suspended browsers
may delay alerts; there is no push service. Mobile support may require installation.
The existing service worker registers locally when a permitted completion needs it.

### Backups and imports

Export/Import accepts versioned history JSON up to 10 MB, excluding preferences
and credentials. Keep a backup before migration.

```sh
bun run migrate:timer path/to/backup.json
bun run migrate:timer --local-json
```

These write to configured Turso without changing source files. Imports preserve
IDs/dates, restore timers paused, suppress old alerts, skip identical days, fill
empty dates, and reject occupied-date conflicts atomically. Legacy recurring IDs
use a composite date/ID key. `--local-json` reads `data/timer/*.json`.
`bun run seed:timer` optionally generates 30 days of sample JSON; runtime demos
generate samples without these files.

## Music

`MusicStore` owns audio, queue transitions, persistence, and library mutations.
`MusicMediaSession` handles optional device controls/artwork; `MusicTabSync` owns
cross-tab claims/messages; `importMusic` owns sequential decoding/commits.
`MusicLibrary` composes search/import controls, `MusicSongList`,
`MusicPlaybackControls`, and `MusicTrackMenu`. Progress uses a separate clock
subscription. See the [component guide](app/music/_components/README.md) and
Details' Pele diagram for module relationships.

`/music` streams seven included songs from `public/music`, registered in
`app/music/data.ts`. Add public MP3s and catalog metadata together. Included songs
need a connection and cannot be removed through the player.

Imported MP3s stay in this browser's versioned IndexedDB database. Audio,
metadata, 256px artwork thumbnails, and settings use separate stores. Imports and
metadata edits never upload or alter original files. Clearing site data or browser
eviction removes the local library. Root-level MP3s remain Git-ignored.

Imports run sequentially and commit each file atomically. Matching filename,
size, and modification-time signatures are skipped; failures preserve successful
imports. `music-metadata` loads during import, with filename/icon fallbacks.

The library supports search, saved ordering, shuffle, repeat, seeking, and volume.
It starts alphabetically; drag handles or focused arrow keys reorder playback.
New imports append after manually ordered songs. Repeat One affects automatic
completion only. Manual Next wraps at the end even with repeat off; automatic
completion stops there. Exhausted shuffle queues restart on manual Next.

A lazy runtime starts on `/music` or for a remembered visible player. One native
audio element survives navigation and loads only the selected URL/blob. Library,
order, selection, position, and settings restore paused after reload. A playing
tab pauses the previous one through BroadcastChannel and storage events. Media
Session and browser volume support are optional; device controls remain available.
The volume capsule opens on click/hover and dismisses outside. Timer and Music
sounds can play together.

Space toggles playback on `/music` or while its floating bar is visible, starting
the first song if needed. Typing, interactive controls, dialogs, modifiers, and
held keys retain normal behavior. Closing the floating player pauses and dismisses
it without losing selection; a dismissed bar does not capture Space elsewhere.

`/music/details` documents rules, storage, and offline status without preparing
the cache itself. Its oldest-first Music changelog uses the shared 24-hour commit
cache, with separate Jakarta date/time columns.

### Offline safeguards

Production Music visits prepare only the public Music document and required
immutable Next.js assets through the existing service worker. Dependencies cache
before the document; failed refreshes preserve the last complete shell.

- Assets must carry `Cache-Control: immutable`; development chunks are excluded.
- Development startup updates existing workers, removes stale development Music
  caches, and reloads once when needed.
- Offline reopening plays imported songs from IndexedDB. Included songs stream
  online and are never downloaded during setup.
- API/account responses, RSC payloads, and other documents are never cached.
- The generic offline fallback and Timer notification clicks remain intact.
- Offline readiness appears only after preparation succeeds; initial setup needs
  connectivity, service-worker support, and retained browser storage.

## Lab implementation notes

Plain Contents labels avoid KaTeX; mathematical labels load their renderer
separately. Fixed practice formulas render on the server. Flow diagrams load near
the viewport. Electron geometry uses a worker with a four-entry cache and ignores
stale results. Confetti requires explicit Start, provides Stop, and respects
reduced motion.

`/labs/user-interface/gradient-cards` renders 100 authored recipes on the server
in one/two/four columns with `gap-5`. All 16 desktop spans from 1×1 through 4×4
appear; tablet spans cap at two and mobile uses content-driven single columns.
A small client controller loads a Base UI inspector on demand, sharing artwork
and CSS serialization. Animated examples pause offscreen and respect reduced
motion. Six generated images live in `public/images/gradient-cards`, whose README
records their prompts.
