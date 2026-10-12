Personal site by Harits Syah — [haritssr.com](https://haritssr.com).

- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Experiments](https://haritssr.com/experiments): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [Commits](https://haritssr.com/commits): Commit history and activity.

Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.

Subscribe to the [RSS feed](https://haritssr.com/feed.xml).
Agent workflow and contribution rules are in [AGENTS.md](AGENTS.md).


## Architecture

The app uses Next.js App Router, React, TypeScript, Tailwind CSS, and Bun.
Next.js MDX and Turbopack discover local writing modules automatically;
`utils/writing-posts.ts` validates frontmatter and derives the post index.
Ultracite uses Oxlint and Oxfmt. Continuing widgets use Base UI, except the
mobile article table of contents, which uses React Aria Sheet. Writing and
experiments share a scrolling top bar and floating Contents/back-to-top controls.
`utils/katexify.tsx` keeps up to 256 recently used equation renderings, keyed by
TeX and display mode, while preserving the shared KaTeX HTML and MathML output.

Earlier migrations replaced Pages Router, Content Collections, a manual MDX
import registry, and Biome. Small helpers use native APIs instead of Effect,
date-fns, and react-use. Retired library demos remain static historical records
in `data/DiscontinuedExperimentsData.ts`, separate from live experiments.
Archived cards remain static, without deleted-route links or search/sitemap
entries. Preserve `discontinuedExperimentHistory.removalCommitSha` as the
original removal commit's full SHA, never the current HEAD or deployment SHA.

## Development

Use Bun 1.4.2, matching `package.json` and CI.
Install with `bun install --frozen-lockfile`; start with `bun run dev`, reusing
an existing server when available. Required checks are listed in AGENTS.md;
CI runs those checks and the production build.

Experiment routes are literal folders registered in `data/ExperimentsData.ts`.
The catalog supplies explorer, search, metadata, and sitemap records.
Mathematics and physics titles match their URL slugs; shared page titles,
index links, and breadcrumbs use the catalog names. Euler uses
`/experiments/mathematics/euler`.
The physics index lists experiments by creation date, newest first.
Writing posts live in `data/writing/` and use `/writing` URLs directly.
Legacy URL aliases are intentionally absent from `next.config.ts`.

## Search Commands

Open search with Cmd+P, Ctrl+P, or the top-bar search button. Type `theme`
to choose Light, Dark, or System; `dark mode` and `light mode` find their
matching commands directly. Use arrow keys and Enter, or click a command,
to apply it and close search. The theme switcher shares the same preference,
which persists across reloads and synchronizes across tabs when local storage
is available. Type `github`
or `source code`, then press Enter or click the command to open this site's
GitHub repository in a new tab. Commands remain available while the page search
index loads or if it cannot load.

## Metadata and Appearance

- `utils/site.ts` defines the canonical `https://haritssr.com` domain and
  `SITE_THEME_COLOR`. The `www` hostname redirects to the canonical host.
- `utils/pageMetadata.ts` constructs metadata and versioned `/api/og` image URLs.
  `app/api/og/OpenGraphCard.tsx` defines the image design. `ImageResponse`
  renders 1200 × 630 images; Sharp converts them to quality-90 JPEG with full
  chroma resolution. The renderer uses Next.js's bundled font without an
  external image service or background asset. Open Graph and Twitter share
  images and alt text; Twitter identifies `@haritssr`.
  When changing the OG design, bump the image URL's `v` in
  `utils/pageMetadata.ts` and preserve crawler access to `/api/og` in
  `app/robots.ts`.
- `components/StructuredData.tsx` supplies `WebSite`, `Person`, and `WebPage`
  JSON-LD. The root layout renders site/person data; the homepage and physics
  units page render page data. The units page includes its breadcrumb hierarchy.
  Reuse these components and preserve escaping of `<` in serialized JSON-LD.
- Browser and installed-app colors come from the root viewport and manifest;
  the offline document declares the same theme color.
- PNG, ICO, and Apple touch icons derive from `public/icons/haritssr.svg`.
  `/favicon.svg` shares its blue palette; the top bar displays it directly.

## API Directory

The `/api` page lists accessible GET endpoints and is linked left of Install
in the footer. It belongs in site search and the sitemap; raw endpoints do not.
The task API appears only in development, sharing the local experiment flag.

## Commits

The `/commits` page lists Harits Syah's commits reachable from the checked-out
HEAD, including the original `haritssr` author name. It is linked immediately
left of API in the footer and included in search and the sitemap. It opens to
the current day, showing 50 commits at a time. Older history stays available
through the filters; Today selects the current day, and Reset returns to it.
Date filters use Asia/Jakarta time, with weeks starting Monday. The activity
graph includes quiet periods and follows the date, category, and search filters.
The explorer prepares Jakarta dates, hours, commit types, and search text once
per history array in the client. Filtering and activity calculations reuse those
records; the server passes only the original commit fields.

`bun run sync:changelog` generates `data/changelog.json` from Git author dates,
subjects, and hashes; it runs before `bun run dev` and `bun run build`. Commit
the snapshot so deployments without Git can still render the entire history.
Shallow checkouts merge available commits into the saved snapshot; full
checkouts regenerate it from HEAD. CI fetches the complete history. The page
needs no runtime Git installation, GitHub token, or external API request.
After making commits while the dev server is running, run the sync command to
refresh the page. Uncommitted work appears after it is committed and synced.

Model Suitability is a separate, fixed table for 2026-10-11 in Jakarta time,
inside a "Commits" accordion that starts closed.
`data/model-suitability-2026-10-11.json` stores model and reasoning-effort
recommendations keyed by full commit hash, independently of the generated
changelog. They are task-complexity estimates based on commit changes and
[OpenAI model-selection guidance](https://developers.openai.com/api/docs/guides/model-selection),
not measured comparisons. Newly synced commits for that date show “Not assessed”
until a recommendation is added; Timeline filters do not affect this table.
Below the chart, the color legend and commit-type counts use two CSS columns
from `sm` upward. Counts cover the same fixed date and sort largest first.
Model Suitability and Activity share a bordered line chart with an internal
title, muted gridlines, and small axis labels. Lines include quiet periods;
points mark active periods. The hourly chart uses Jakarta time. Activity points
for larger periods let readers explore that period.

## Progressive Web App

`app/manifest.ts` defines identity and icons; `components/FooterActions.tsx`
offers installation where supported. `components/ServiceWorkerRegistration.tsx`
registers `public/sw.js` only in production.

The worker pre-caches only `public/offline.html`, a standalone document with
inline styling and system fonts. Successful navigations use the network;
failed same-origin document navigations show the fallback. APIs, assets, and
client navigations retain normal behavior. Activation deletes older owned
caches, including previous HTML caches. `/sw.js` has no-cache response headers.

To validate in an existing production browser session: register or install
online, disconnect, then reload both a visited and an unvisited URL. Both
should show the fallback. Reconnect and reload to recover. Verify that updates
remove old owned caches and preserve unrelated caches.

## RSS

`/feed.xml` is generated from local writing posts:

1. Add `data/writing/*.mdx` with `publishedAt` in `YYYY-MM-DD` format.
2. `utils/writing-posts.ts` validates frontmatter and derives slug/word count
   in `allWritingPosts`.
3. `app/feed.xml/route.ts` passes posts to `app/feed.xml/rss.ts` for RSS 2.0 output.

Entries include titles, summaries, canonical links, and publication dates.
`lastBuildDate` reflects generation time. Production feeds update on deployment.

## Local Databases

Task/tools experiments are development-only; production routes return 404.
SQLite files default to `.data-haritssr/`, with `TASK_DB_DIR` and `TOOLS_DB_DIR`
overrides. Inspect them read-only with `bun scripts/inspect-task-db.js` or
`bun scripts/inspect-tools-db.js`; both respect those environment variables.
