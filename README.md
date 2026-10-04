Personal and experimental site by Harits Syah [www.haritssr.com](https://www.haritssr.com)

- [`projects`](/projects): Project portfolio and project detail pages.
- [`experiments`](/experiments): Interactive experiments across frontend libraries, browser APIs, mathematics, and physics.
- [`blog`](/blog): Blog posts and notes.
- [`design`](/design): Design system reference.

## Technology

Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Blog posts
use MDX, and Bun is used for project scripts and tooling. The experiments also
explore libraries including Radix UI, Headless UI, Mantine, and TanStack Table.

## Decisions

- Next.js App Router replaces Pages Router.
- Next.js MDX replaces Content Collections for blog content.
- Turbopack discovers MDX files automatically, replacing the manual import registry.
- Ultracite with Oxlint and Oxfmt replaces Biome.
- Native APIs replace Effect, date-fns, and react-use in small helpers.
- The installable PWA caches a standalone offline page instead of Next.js pages.
- SQLite task and tools experiments stay local until they have authentication,
  authorization, rate limits, and durable storage.
- Public pages stay searchable. Cloudflare manages AI-training opt-out when enabled.

## Development

Use `bun install --frozen-lockfile` and `bun run dev`. Reuse a running development
server. Run `bun run check`, `bun run typecheck`, `bun run knip`, and
`bun run validate:content` before submitting changes. Also run
`NODE_ENV=production bun run validate:content` to verify local-only exclusions.
The CI workflow performs these checks and the production build.

Inspect existing local SQLite databases with `bun scripts/inspect-task-db.js`
or `bun scripts/inspect-tools-db.js`. These scripts open the databases read-only
and respect `TASK_DB_DIR` and `TOOLS_DB_DIR`.

Experiment routes are literal folders. Register their title, description, tags,
creation date, and update-date history in `data/ExperimentsData.ts`. The explorer,
search, metadata, and sitemap derive their records from that catalog. Append an
update date once per calendar day and retain the creation date and prior history.

Blog posts are local MDX files in `data/blog/`; Turbopack discovers their compiled
modules lazily, while frontmatter is validated on the server. Adding a post does
not require editing a separate import registry.

## Progressive Web App

The site is installable over HTTPS in supporting browsers. The offline behavior
is a clear fallback page, not an offline copy of the experiments or articles.

- `app/manifest.ts` defines the app identity and icons.
- `components/FooterActions.tsx` offers the native install prompt where available.
- `components/ServiceWorkerRegistration.tsx` registers the worker only in production.
- `public/sw.js` pre-caches only `public/offline.html`. That document uses inline
  styling and system fonts, so it needs no framework scripts or remote assets.
- Successful network navigations return directly, independently of cache writes.
  Failed same-origin document navigations show the offline fallback. API requests,
  assets, and client navigation requests retain their normal browser behavior.
- Activation deletes only older caches owned by this worker, including the
  previous HTML navigation caches. `/sw.js` keeps its no-cache response headers.

See the [decision notes](#decisions).

Validate in a production browser: install or register the worker online, disable
network access, and reload a visited and an unvisited URL. Both should show the
fallback. Reconnect and reload to recover. Check that updates remove old owned
caches and preserve unrelated caches. No full offline-content support is promised.

## RSS Feed

The blog RSS feed is available at [`/feed.xml`](https://www.haritssr.com/feed.xml).
The site footer includes a link to the feed. Visitors can paste this URL into
an RSS reader such as Feedly, Inoreader, NetNewsWire, or Thunderbird.

The feed is generated from the local blog post index:

1. Blog posts are added to `data/blog/*.mdx` with a `publishedAt` value in
   `YYYY-MM-DD` format.
2. `utils/blog-posts.ts` parses and validates the frontmatter, derives the slug
   and word count, and loads the posts into `allBlogPosts`.
3. `app/feed.xml/route.ts` passes the collection to `app/feed.xml/rss.ts`.
4. The renderer creates an RSS 2.0 document with each post's title,
   summary, canonical URL, and publication date.

The feed contains summaries that link to the full posts. Its
`lastBuildDate` reflects the feed generation time so changes to existing
posts are visible to RSS readers. In production, the statically generated
feed is updated during deployment, so a new deployment is required for a new
post to appear in the live feed.
