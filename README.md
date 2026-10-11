Personal site by Harits Syah — [haritssr.com](https://haritssr.com).

- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Experiments](https://haritssr.com/experiments): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.

Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.

Subscribe to the [RSS feed](https://haritssr.com/feed.xml).
Agent workflow and contribution rules are in [AGENTS.md](AGENTS.md).


## Architecture

The app uses Next.js App Router, React, TypeScript, Tailwind CSS, and Bun.
Next.js MDX and Turbopack discover local writing modules automatically;
`utils/writing-posts.ts` validates frontmatter and derives the post index.
Ultracite uses Oxlint and Oxfmt. Continuing widgets use Base UI, except the
mobile experiment table of contents, which uses React Aria Sheet.

Earlier migrations replaced Pages Router, Content Collections, a manual MDX
import registry, and Biome. Small helpers use native APIs instead of Effect,
date-fns, and react-use. Retired library demos remain static historical records
in `data/DiscontinuedExperimentsData.ts`, separate from live experiments.

## Development

Install with `bun install --frozen-lockfile`; start with `bun run dev`, reusing
an existing server when available. Required checks are listed in AGENTS.md;
CI runs those checks and the production build.

Experiment routes are literal folders registered in `data/ExperimentsData.ts`.
The catalog supplies explorer, search, metadata, and sitemap records.
Writing posts live in `data/writing/`; `/blog` URLs permanently redirect to
matching `/writing` URLs through `next.config.ts`.

## Metadata and Appearance

- `utils/site.ts` defines the canonical `https://haritssr.com` domain and
  `SITE_THEME_COLOR`. The `www` hostname redirects to the canonical host.
- `utils/pageMetadata.ts` constructs metadata and versioned `/api/og` image URLs.
  `app/api/og/OpenGraphCard.tsx` defines the image design. `ImageResponse`
  renders 1200 × 630 images; Sharp converts them to quality-90 JPEG with full
  chroma resolution. The renderer uses Next.js's bundled font without an
  external image service or background asset. Open Graph and Twitter share
  images and alt text; Twitter identifies `@haritssr`.
- `components/StructuredData.tsx` supplies `WebSite`, `Person`, and `WebPage`
  JSON-LD. The root layout renders site/person data; the homepage and physics
  units page render page data. The units page includes its breadcrumb hierarchy.
- Browser and installed-app colors come from the root viewport and manifest;
  the offline document declares the same theme color.
- PNG, ICO, and Apple touch icons derive from `public/icons/haritssr.svg`.
  `/favicon.svg` shares its blue palette; the top bar displays it directly.

## API Directory

The `/api` page lists accessible GET endpoints and is linked left of Install
in the footer. It belongs in site search and the sitemap; raw endpoints do not.
The task API appears only in development, sharing the local experiment flag.

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
