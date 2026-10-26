<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Development

- Use Bun. Install with `bun install --frozen-lockfile` only when dependencies
  are missing or differ from the lockfile.
- Reuse the dev server. Run `bun run dev` only when needed and none exists, never
  just for checks. This machine has 8 GB RAM; avoid unnecessary background
  processes and stop temporary ones afterward.
- Never run production builds or use `--webpack` in an agent environment.
  Builds belong to humans/CI. Use `bun run start` only when asked to serve an
  existing build and no server exists; never build first or use it for checks.
- Never launch temporary Chrome, including headless/automation sessions. Reuse
  an existing browser or verify without one.
- Never create, add, rename, or restore `*.test.*`, `*.spec.*`, or files under
  `test/`, `tests/`, or `__tests__/`. Modify existing tests only when explicitly
  requested. Use existing tests or focused non-test checks.
- Use the smallest set of task-specific skills.
- Keep [README.md](README.md) a short public introduction, developer setup and
  architecture here, and feature behavior on its Details route.

## Verification

Run only applicable checks after the final relevant edit; multiple triggers may
apply. Reuse unchanged passing results and rerun only affected checks after edits
or failures. Questions/status need no checks. Markdown-only changes need diff/link
review; Markdown/MDX are excluded from Oxfmt, but writing MDX needs content validation.

`check` runs Ultracite → Oxfmt + Oxlint (type-aware `oxlint-tsgolint`);
`typecheck` runs Next.js route type generation → native TypeScript 7.

| Command | Trigger |
| --- | --- |
| `bun run check <files...>` | Changed supported source, CSS, or JSON, including classes and JSX copy. Pass changed paths; exclude assets and Markdown/MDX. |
| `bun run check` | Lint/format config, dependencies, or refactors across shared modules and consumers. Otherwise scope it. |
| `bun run typecheck` | Imports/exports, types, props, JSX structure, logic/hooks, API handlers, route folders/params, data shapes, TS/Next config, or type-affecting dependencies. Skip styling, static copy, unchanged-shape values, Markdown, and assets. |
| `bun run knip` | Module/dependency graph changes: imports/exports, source/route files, dependencies, scripts, discovery entry points, or Knip config. |
| `bun run knip:production` | Production entry points, conditional imports, dependency classification, or production Knip config. |
| `bun run validate:content` | Lab catalog/routes, discontinued records, writing MDX/frontmatter, catalog/route/search discovery, frontmatter parsing, or validator utilities. |
| `NODE_ENV=production bun run validate:content` | Content changes that could affect public lab availability, production filters, or local DB gates. |
| `bun run fix <files...>` | Auto-fixable errors in edited files; review the diff. Never fix the whole project for a local change or run on passing/manual-only checks. |

Simple visual changes need only scoped `check`, including inline styles and CSS
custom properties when contracts and behavior stay unchanged. Do not typecheck them.

# Design and Components

- Inspect `/design` and `app/design/` before UI changes. Reuse suitable shared
  components, demonstrated behavior, and existing tokens.
- Describe colors with design-system names or tokens (`zinc-50`, `bg-surface`,
  `--color-border`), never hex. Use `zinc-50`/`zinc-900` instead of pure white/black.
- Use Base UI for continuing widgets. React Aria is limited to the mobile article
  TOC Sheet and supporting controls; do not restore retired widget libraries.
- Repeated grid cards have equal widths/heights per row. Use flexible content/action
  alignment; avoid clipping, fixed heights, and masonry unless requested.
- Mobile floating controls have 40px targets; bottom tabs are at least 44px tall.
- `InternalLink` variants: `inline` in prose/descriptions/explanatory lists, default
  for standalone navigation, `footer` for footer links. Choose at the call site,
  never by ancestry. Inline/footer omit chevrons; inline inherits text size.

## Sections and page layout

- Use `Section` for titled content and `SectionHeading` for heading-only layouts.
  Preserve specialized local sections unless explicitly refactoring.
- `Section` owns accessible heading IDs and `space-y-5`, without global line-height
  or width caps. Container attributes and `className` style the section;
  `contentClassName` styles an optional body wrapper; `description` is muted intro copy.
  Configure headings with `headingAs`, `headingClassName`, and `headingVariant`.
  Preserve fragment anchors by moving their IDs to the section container.
- Use unmodified `PageTitle` typography inside `PageHeader`, with icons beside it
  and consistent title alignment. The layout provides 32px above page content.
  `PageHeader` starts with its title, without a back link or empty navigation row;
  it owns `gap-4` and `mb-16`. Keep it outside content stacks, with no child vertical
  margins or extra top margin on the first content block.
- Use `PageDescription` for introductions (`as="div"` for block content).
- Lab section stacks use parent `space-y-20` for physics/mathematics (including
  demos), `space-y-16` elsewhere. Omit section vertical margins; keep introductions
  and source links together.
- Use unordered, unnumbered independent exercise/rule cards. Number ordered
  solution steps and question-navigation controls when needed.
- Exclude accordion/disclosure trigger headings from article TOCs, including custom
  triggers. Visible headings inside open panels may appear.

## Lab width and mathematics

For new/refactored labs, keep containers, titles, introductions, and interactive
content full width. Apply left-aligned `max-w-3xl` only to reading content
(explanations, proofs, solution steps, summaries), e.g.
`<Section contentClassName="max-w-3xl space-y-5" ...>`. Never cap a wrapper containing
a title/description or add a global cap to `Section`.

Use responsive columns for interactive content, tables, and grids; preserve suitable
intrinsic diagram/control/overlay sizing. Keep mobile layouts fluid and scroll wide
equations/tables locally. Other pages stay full width unless directed otherwise.

Render all mathematics as TeX through `@/utils/katexify`, inline in prose or display
mode for standalone equations, with `katex/dist/katex.min.css` available. Do not
substitute Unicode, plain text, `<sub>`/`<sup>`, or monospace notation.

# Content and Routes

- Every tool needs a Details page with **Logics** (axioms, rules, constraints,
  design principles) and **How this works** (Pele component/data-flow diagram).
- Never add redirects in `next.config.ts` or automatically when renaming routes.
  Legacy aliases are intentionally absent.
- Lab routes are literal folders. Register title, description, tags, creation date,
  and update history in `app/labs/data.ts`. Append updates once per calendar day;
  preserve creation dates and history.
- Physics/mathematics preview copy should aim for ≤80 characters (roughly two lines,
  host-dependent). Reuse catalog copy in metadata; put detailed explanations on-page.
- Writing uses `app/writing/content/*.mdx`, validated frontmatter, automatic module
  discovery, and direct `/writing` URLs; no import registry.
- Keep `/api` current with GET endpoints, using `InternalLink` and concrete catch-all
  examples. Its footer link stays left of Install. Index the directory in
  search/sitemap, not raw endpoints; gate local-only entries.
- Keep public pages searchable. Use `utils/metadata/pageMetadata.ts` and the canonical
  domain in `utils/metadata/site.ts` for URLs, social previews, sitemap, and RSS.

## Navigation

- Pass the exact `PageHeader.path` and `back={{ href, name }}`. Every non-home page
  shows a top-bar `BackButton` pill at every size/scroll position; Home shows the
  site name. Fall back to Home when back metadata is unavailable.
- `PageTitle` supplies the marker for `useScrolledPageHeader`. Only after the title
  scrolls behind the top bar does it replace center navigation; scrolling back
  restores navigation while retaining the back pill. Below 640px the scrolled back
  label becomes icon-only. Equal side columns center the title; truncate long titles.
  Clicking it scrolls up and removes the fragment, preserving query/history.
- Search, Share, View Source, and account controls stay inline at the page top and
  on Home. Below 640px, move them into Page actions only while the scrolled title
  is visible. Keep Contents separate from these actions and their sheet.
- Nested pages with visible `h2`–`h6` content headings (including MDX/SectionHeading)
  show `TopBarContents` in its own pill right of the actions. Use rendered anchors,
  a desktop popover below its trigger, and a mobile sheet. Hide on Home/first-level
  routes. Search closes Contents and restores focus on dismissal.
- No floating back-to-top controls on writing/labs; preserve `data-article-*` metadata.
- Desktop navigation starts at 1024px. Mobile bottom navigation appears on Home and
  Projects/Labs/Writing/Design up to two URL segments deep, excluding articles/deeper
  routes. Both use shared navigation data and `utils/navigation/navigationState.ts`.
- `FloatingDock` places Music above Timer and owns navigation, safe-area, and combined
  footer clearance without loading inactive runtimes.
- Use viewport-height layout and symmetric scrollbar gutters. `Breadcrumbs` owns
  its spacing: below 1024px, Footer reserves a 24px breadcrumb row above the Jakarta
  date/WIB clock; desktop places breadcrumbs and right-aligned date/clock together
  above actions. Format: `YYYY-MM-DD, Day, HH:mm:ss WIB`. Clock data is local and
  updates pause in hidden tabs.
- `useTopBarHeight` supplies title/Contents/anchor measurements; `HeaderActions`
  coordinates handoffs. Track active Contents sections only while open and update
  scroll state at boundaries, not on every event.

## Homepage and shortcuts

Contacts stay visible; background/principles move into More below 768px, with three
columns on desktop. Features use a rounded, dashed-divider grid: one column mobile,
three desktop, shortcut beside each title. Previews are decorative except Install.
The homepage button and footer Install share a browser prompt requiring user
activation; when unavailable, disable the homepage button and hide the footer action.

| Shortcut | Action |
| --- | --- |
| `⌘P/Ctrl+P` | Search, overriding browser Print |
| `Opt+C/Alt+C` | Toggle Contents on nested pages with headings |
| `Opt+S/Alt+S` | Copy URL including query/fragment |
| `Opt+T/Alt+T` | Open Timer |
| `Opt+R/Alt+R` | Open RSS |
| `Opt+I/Alt+I` | Install when available |

Option/Alt shortcuts use physical letter codes and ignore editable controls,
composition, repeats, and extra modifiers. Search filters primary pages, tools,
and commands; Search and top-bar Share use root `SharePageProvider` feedback.

# Commits

- Commit only with explicit permission; it does not authorize database uploads.
- Use `type(context): message`, e.g. `fix(TopBar): align back icon`. Types:
  `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
- Review staged changes and related docs; update guidance in the same change.
  The test-file policy still applies to `test` commits.
- Never generate/restore `changelog.json`. Upload Git history to Turso only when
  explicitly requested with `bun run sync:commits`, never during development,
  builds, or commits. `bun run import:commits --dry-run` validates without DB access.

# Implementation Reference

Keep setup/architecture here and behavior on Details routes:
[Music](https://haritssr.com/music/details),
[Timer](https://haritssr.com/timer/details),
[Commits](https://haritssr.com/commits/details).

## Project structure

Keep route-specific code/data beside pages, feature-shared components in
`_components/`, and site-wide UI in `components/`. Top-bar/article navigation lives
in `components/topbar/` and `components/article/`. Import individual modules from
`utils/{commits,content,discovery,metadata,navigation}/` to preserve client/server boundaries.

Timer, Commits, Tree, Music, and URL live under `app/(tools)/`, sharing the root
layout and retaining `/timer`, `/commits`, `/tree`, `/music`, and `/url` URLs.
`appRouteDirectory` in `utils/navigation/routePatterns.ts` maps these public routes
to source directories for View Source and content validation. Manifest patterns
remain public URL patterns; do not include route-group names in links or metadata.

| Content | Source |
| --- | --- |
| Projects | `app/projects/data.ts` |
| Labs / discontinued records | `app/labs/data.ts` / `app/labs/discontinued-data.ts` |
| Writing | `app/writing/content/` |
| Next.js posts demo | `app/labs/nextjs/posts/content/` |
| Included music | `app/(tools)/music/data.ts` + `public/music/` |
| Routes / navigation | `data/topLevelNavigation.ts` / `data/navigation.ts` |
| Commit history | Git + separate Turso commits database |

Server-only `utils/discovery/routeManifest.ts` derives routes, parents, dynamic
patterns, and update dates for search, sitemap, Tree, and content validation.
It shares dynamic patterns with View Source through `utils/navigation/routePatterns.ts`;
`data/navigation.ts` adds icons to the text-only `topLevelNavigation` definitions.
`utils/content/validate-content.ts` runs catalog, filesystem, writing, archive, and
discovery checks in separate phases. Shared calendar validation lives in
`utils/calendar.ts`; server-only `utils/content/localContent.ts` discovers and
reads local posts, while frontmatter parsers retain their own rules. Article TOC
label extraction lives separately from outline assembly.
Labs use `/labs`, including `/labs/user-interface`; old `/experiments` URLs survive
only in historical discontinued records, without aliases/redirects. Task/Tools
SQLite labs and the Task API are removed. Other demos keep data beside their code.

## Commit history

`/commits`, dated reviews, `/api/commits`, and the homepage count read server-only
`utils/commits/commitHistory.ts`, with no local fallback. Set
`TURSO_COMMITS_DATABASE_URL` and `TURSO_COMMITS_AUTH_TOKEN` locally and in Vercel
Production/Preview. Import from a full Git checkout using the commands above.

`app/(tools)/commits/import-commits.ts` accepts Harits Syah/haritssr authors, rejects shallow
checkouts, validates before connecting, and verifies in one transaction. Reruns
update matching hashes without duplicates or deleting extra history; no JSON snapshot.

History, the separate count query, and browser/CDN API responses cache for 24 hours;
updates may take longer to appear. Failed fresh API reads return uncached 503s;
Home retains tool links without a count. Next.js may retain stale results after
revalidation failures. The explorer starts on the latest day with ≤50 rows; URL
filters/limits drive later API reads with debounced search and Back/Forward support.

Weekly changelog summaries cover January 2026–October 22. Weeks use days 1–7, 8–14,
15–21, 22–28, and 29–month end; retain inactive weeks and mark the current week
partial. Update summaries and cutoff together in `app/(tools)/commits/weekly-changelog/data.ts`.
Dated reviews/model assessments cover fixed snapshots and appear in search/sitemap;
model/reasoning labels are editorial estimates, not recorded usage.

`changelogTypes.ts` holds client/server response and selection contracts;
`changelogSummary.ts` performs pure filtering and aggregation. `commitHistory.ts`
owns cached reads and delegates calculation without changing cache keys or periods.

## Timer

`/timer` tracks Jakarta calendar days; `/timer/statistic` shows daily history and
30-day totals. Details covers rules/schema/diagrams; the
[component guide](app/(tools)/timer/_components/README.md) maps controls.

### Storage and authentication

Turso syncs owner tasks/preferences; visitors get read-only samples. Credentials
stay server-only; no runtime task data in IndexedDB/local JSON. Set
`TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`; run `bun run migrate:timer` before schema
deployments. It idempotently creates tables, summary triggers, pending-notification
indexes, and preset columns.

`timerDatabase.ts` owns SQL mapping, preference writes, historical totals, and
transactions; `store.ts` coordinates `timerEngine.ts`. Shared command/preference
operations drive optimistic projection, while server authorization, date checks,
revisions, and completion claims stay authoritative. Queued mutations reconcile
confirmed revisions. Write changed rows only; optional UUID `taskId` makes creation idempotent.

Google OpenID Connect admits only the verified owner email, optionally pinned by
subject. Configure Git-ignored `.env.local` and deployment:

- `TIMER_GOOGLE_CLIENT_ID`, `TIMER_GOOGLE_CLIENT_SECRET`, `TIMER_GOOGLE_EMAIL`
- `TIMER_SESSION_SECRET` (generate with `openssl rand -base64 32`)
- `TIMER_AUTH_ORIGIN`
- `TIMER_GOOGLE_USER_ID` (optional; blank means unset)

Use a Google OAuth **Web application** client with callback
`{TIMER_AUTH_ORIGIN}/api/timer/auth/callback` (e.g.
`http://localhost:3000/api/timer/auth/callback` or
`https://haritssr.com/api/timer/auth/callback`). Add the owner as a test user while
the consent app is in testing. Origin must match exactly, use HTTPS in production,
and contain no credentials/path/query/fragment; surrounding whitespace/trailing slash are accepted.

OAuth uses state, PKCE, nonce, and server validation of signature, issuer, audience,
expiry, and verified email. Signed seven-day HttpOnly SameSite cookies are Secure
in production. Store no Google tokens/account table. Sign-out clears this browser;
rotating the session secret invalidates all sessions. Reject old GitHub sessions
and remove `TIMER_GITHUB_*`. Missing config locks personal data;
`AUTH_CONFIGURATION_INVALID` exposes only variable names/safe hints. Correct
Vercel Production variables and redeploy before retrying.

### Rules and runtime

- Start pauses other tasks unless Multitask is on; disabling it atomically keeps
  the most recently started task with the preference change.
- Autoplay prefers paused unfinished tasks when none run. Speed: 1x–3x in 0.5x
  steps. Done preserves actual time; Reached stops at duration.
- Duration must exceed spent time. Names: 20 characters; descriptions: 35 (shorten
  longer legacy descriptions on edit). New days are empty.
- Timestamps drive time without per-second writes; tasks stop at Jakarta midnight.
  Transactions allow one device to claim each completion/transition.
- Web Locks elect one visible owner tab to poll every 30 seconds running / two
  minutes idle and share validated snapshots. Unsupported browsers poll separately.
  Focus refreshes. Hidden tabs/previews do not poll; hidden completion/midnight
  scheduling remains active.
- Writes require a connection and save in queue order. Failures restore confirmed
  state, retain Add/Edit drafts, and offer Retry to refresh. Never automatically
  resend uncertain writes. No writable offline fallback, background scheduler,
  or Autoplay after all pages close.

Snapshots read today plus running/unacknowledged dates via partial indexes;
statistics read selected/active dates plus 30 summary rows. SQL triggers maintain
saved totals; reads overlay live time. Backups read full history.

Duration Presets allow 1–5 entries (one second–24 hours), Task Presets 1–10, with
Save/Cancel. They sync and apply to Add/Edit without changing existing tasks.
Autoplay, Multitask, and notification preferences also sync. Ticking defaults off,
stays browser-local, and uses Web Locks for audio; completion feedback is claimed globally.

`TimerProvider` shares the account check and retains lazy `TimerRuntime` after owner
access or a Timer visit; other anonymous visitors load neither runtime nor snapshots.
The runtime registers a stable `timerController`; `useTimer` subscribes to selected
fields directly, without provider snapshot relays. `useTimerAudio` owns ticking/
warnings, `useTimerSchedule` completion/midnight refreshes, and `useTimerTicking`
Settings subscription/audio unlock. `timerInput` shares form/counter/schema limits
while preserving broader legacy validation. Transport, scheduling, audio,
notifications, and display clocks stay in focused `app/(tools)/timer/` modules.

Notifications are opt-in with on-screen fallback, no push service. Closed/suspended
browsers may delay alerts; mobile may require installation. The existing service
worker registers locally when a permitted completion needs it.

### Backups

Export/Import accepts versioned history JSON ≤10 MB, excluding preferences/presets
and credentials. Back up before migration:

```sh
bun run migrate:timer path/to/backup.json
bun run migrate:timer --local-json
```

These write configured Turso without changing source files. Imports preserve IDs/
dates, restore paused, suppress old alerts, skip identical days, fill empty dates,
and atomically reject occupied-date conflicts. Legacy recurring IDs use date/ID
composite keys. `--local-json` reads `data/timer/*.json`; `bun run seed:timer`
optionally generates 30 days of sample JSON. Runtime demos need neither.

## Music

`MusicStore` owns audio, queue transitions, persistence, and library mutations.
`MusicMediaSession` handles optional device controls/artwork; `MusicTabSync` owns
cross-tab claims/messages; `importMusic` owns sequential decoding/commits.
`MusicLibrary` composes search/import controls, `MusicSongList`,
`MusicPlaybackControls`, and `MusicTrackMenu`. Progress uses a separate clock
subscription. See the [component guide](app/(tools)/music/_components/README.md) and
Details' Pele diagram for module relationships.

Seven included songs stream from deployed `public/music` assets, cataloged in
`app/(tools)/music/data.ts`; add MP3s and metadata together. They require connectivity and
cannot be removed through the player. Root-level MP3s remain Git-ignored.

Imported MP3s stay in versioned browser IndexedDB, with separate audio, metadata,
256px artwork, and settings stores. Never upload imports or alter original files.
Clearing/evicting browser data removes the library. Sequential imports commit each
file atomically, skip matching filename/size/mtime, and preserve successes on failure.
Load `music-metadata` during import, with filename/icon fallbacks.

Search, saved ordering, shuffle, repeat, seeking, and volume are supported. Start
alphabetically; drag handles/focused arrows reorder, and imports append after
manual ordering. Repeat One affects automatic completion only. Manual Next wraps
even with repeat off and restarts exhausted shuffle; automatic completion stops at
the end with repeat off.

Lazy runtime starts on `/music` or for a remembered visible player. One native audio
element survives navigation and loads only the selected URL/blob. Library/order/
selection/position/settings restore paused. A playing tab pauses the previous one
via BroadcastChannel/storage events. Media Session/browser volume are optional;
device controls remain. Volume opens on click/hover and dismisses outside. Music
and Timer audio may coexist.

Space toggles on `/music` or with a visible floating player, starting the first song
if needed. Preserve typing, interactive controls, dialogs, modifiers, and held-key
behavior. Closing pauses/dismisses without losing selection or capturing Space
elsewhere. Details shows rules/storage/offline status without preparing caches;
its oldest-first changelog uses the shared 24-hour commit cache and separate
Jakarta date/time columns.

### Offline safeguards

- Production Music visits use the existing service worker to cache only the public
  Music document and required immutable Next.js assets. Cache dependencies first;
  failed refreshes retain the last complete shell.
- Assets require `Cache-Control: immutable`; exclude development chunks. Development
  startup updates workers, clears stale development Music caches, and reloads once
  when needed.
- Offline reopening plays IndexedDB imports; never download included songs at setup.
- Never cache API/account responses, RSC payloads, or other documents, or return HTML
  for RSC requests. Preserve generic offline fallback and Timer notification clicks.
- Show readiness only after successful preparation, which requires connectivity,
  service-worker support, and retained browser storage.

`public/sw.js` stays a standalone classic worker. Its event listeners delegate to
separate lifecycle, notification, preparation/status, asset, and navigation handlers;
cache names and the Music message protocol stay stable.

Tree builds its route hierarchy and analytics from the discovery manifest. The
shared ToggleList displays route links and child counts with independent disclosure
controls; branches start closed on Tree. See `/tree/details` for its rules and flow.

## Labs

Harimaki reference labs live at `app/labs/harimaki/{matematika,fisika}/`.
Each `reference.json` is a local snapshot of its named Notion source, preserving
Indonesian labels and order. Update snapshots deliberately; there is no runtime
Notion connection. `ReferencePage` derives hierarchy counts and renders editorial
analysis above the tree. Shared `components/ToggleList.tsx` uses Base UI
Collapsible for text-only nested lists, indentation guides, and Expand all /
Collapse all controls; its example lives in `app/design/ToggleList.tsx`.
The Diagram section derives the complete parent–child flowchart from the same
snapshot through `referenceDiagram.ts`, rendered lazily by shared `FlowDiagram`
with zoom, pan, and expanded view.

Plain Contents labels avoid KaTeX; mathematical labels load it separately. Render
fixed practice formulas on the server and load flow diagrams near the viewport.
Electron geometry uses a worker/four-entry cache and ignores stale results.
Confetti requires explicit Start, offers Stop, and respects reduced motion.

`/labs/user-interface/gradient-cards` server-renders 100 recipes in one/two/four
columns with `gap-5`: all 16 desktop spans from 1×1 to 4×4, tablet spans capped at
two, and mobile content-driven single columns. A small client controller lazily
loads the Base UI inspector, sharing artwork/CSS serialization. Pause animations
offscreen and respect reduced motion. Six generated images and their prompt README
live in `public/images/gradient-cards`.
