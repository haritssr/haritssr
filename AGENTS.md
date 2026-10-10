<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Engineering Quality

Manage agents with established engineering practices. Clear constraints and
feedback help both people and agents produce reliable code. Follow repository
lint rules, types, compiler diagnostics, existing tests, and observability.
Apply the same quality standards to human-written and agent-written code.
When mistakes recur, strengthen reusable checks and guardrails.

# Design Component Reuse

- Before creating or changing UI, inspect the `/design` page and its source in
  `app/design/` for an existing component or pattern that serves the need.
- Always reuse an available component demonstrated in `/design`, importing its
  shared implementation and following the demonstrated styling and behavior.
  Do not create a custom replacement when a suitable component already exists.
- Create a new component or design only when no suitable existing component or
  pattern is available. Follow the established design tokens and conventions.

## Internal Links

- Use `InternalLink` with `variant="inline"` for links within sentences,
  section descriptions, and explanatory list items. Inline links omit the
  chevron and inherit the surrounding text size and line height.
- Use the default navigation variant for standalone links and navigation
  lists. It retains the chevron and supports `lg` sizing. The inline variant
  inherits its size even when `lg` is supplied.
- Select the variant explicitly at the call site; do not infer it from DOM
  ancestry. See `/design` for examples of both variants.

## Sections and Headings

- Keep independent exercise and rule card titles unnumbered. Use unordered
  lists for these cards; retain numbering for ordered solution steps and
  question-navigation controls that depend on it.
- Experiment tables of contents must exclude accordion and disclosure trigger
  headings, including solution and derivation controls. Apply this globally,
  regardless of their label or whether they use the shared Accordion component.
  Ordinary visible headings inside expanded panels may still appear.
- In experiment pages, use `space-y-20` on the parent that stacks page sections,
  including sections rendered by demo or lab components. Let that parent own
  the spacing; omit individual top and bottom margins on its section children.
  Keep introductory text and its source link grouped together. Internal content
  spacing and responsive grids keep their own layout rules.
- Use the shared `Section` for a semantic section with a title and content:
  `<Section title="Title">...</Section>`. It renders the section and its heading
  and manages `aria-labelledby`. Each section uses the shared `space-y-5`
  spacing and `leading-8` line height; `className` adds layout classes to the
  outer section.
- Use the optional `description` for an introductory paragraph. It accepts
  React content such as links and inline KaTeX, and `Section` gives it the
  shared muted color and readable maximum width. The section itself and its
  body can still use the available width.
- Use `contentClassName` to style an internal wrapper around section body
  content, for example to lay cards out in a responsive grid. The wrapper is
  omitted when the prop is absent or the section has no body. A section may
  contain a description without additional body children; use `SectionHeading`
  when only a heading is needed.
- Native `Section` attributes (`id`, `className`, `style`, `data-*`, etc.) apply
  to the container. Use `id` for section fragment targets; `Section` generates
  the heading ID used by `aria-labelledby`. Configure its heading with
  `headingAs`, `headingClassName`, and `headingVariant`. Heading IDs default to
  `${id}-heading` when the container has an ID, otherwise a stable generated ID.
- Use `SectionHeading` for heading-only layouts, including navigation and
  custom headers. Its children supply the title; native attributes apply to the
  heading, `as` selects `h2` or `h3`, and `variant` selects default or compact
  typography. Both components use the same heading design; an explicit heading
  class replaces the default classes.
- Preserve existing heading anchors by moving their fragment ID to the Section
  container. Leave specialized local section components intact unless their
  behavior is explicitly being refactored.

# Mathematical Notation

- Always render mathematical notation in page content and UI with the project
  math renderer, `katexify` from `@/utils/katexify`. Use inline mode for
  in-sentence notation and display mode for standalone equations.
- Write notation as TeX input for the renderer. Do not imitate mathematical
  typography with Unicode symbols, plain text, `<sub>`/`<sup>`, or monospace
  styling.
- Ensure `katex/dist/katex.min.css` is available wherever rendered KaTeX
  output is used so equations and fonts display correctly.

# Testing Policy

- Coding agents must never create, add, rename, or restore test files. This includes files named `*.test.*` or `*.spec.*`, and test files placed in `test/`, `tests/`, or `__tests__/` directories.
- Do not add tests as part of a feature, bug fix, refactor, or other coding task. Only modify an existing test file when the user explicitly asks for test-file changes.
- If verification is needed, use the existing test files and other non-test checks already available in the repository; do not create a test file to enable verification.


# Commit Guidelines

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Changes to existing tests when explicitly requested
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

Template:
type(context): message
Example:
refactor(Breadcrumbs.tsx): make it scrollable at mobile size when it too long

[source](https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/)

- Before committing, review the staged files and related documentation. Keep `AGENTS.md` and other project guidance accurate and relevant to the current codebase, updating them in the same change when needed.
- Never commit changes without the user's explicit permission. Treat committing as a separate action that requires confirmation.

# Resource-Constrained Development

This machine has 8 GB RAM. Optimize commands for low resource usage:

- Never start multiple development servers.
- Reuse the existing development server.
- Do not run background processes unnecessarily.
- Never launch a temporary Chrome process for any purpose, including testing,
  screenshots, headless browsing, or remote debugging. This prohibition applies
  to foreground and background processes, whether launched directly or through
  browser automation tools. Reuse an already-running browser session without
  launching Chrome, or use non-browser verification instead.
- Kill temporary processes after finishing.
- Prefer targeted tests and targeted linting.
- Do not run the entire test suite unless necessary.

# Run Build

- Never run the production build from an AI agent environment. Turbopack may
  require local worker-port permissions unavailable to sandboxed agents; run
  the build locally or in CI instead.
- Never use `--webpack` with Next.js or build commands; use the default
  Turbopack command instead.

# Project Development

Use `bun install --frozen-lockfile` and `bun run dev`. Reuse a running development
server. Run `bun run check`, `bun run typecheck`, `bun run knip`, and
`bun run validate:content` before submitting changes. Also run
`NODE_ENV=production bun run validate:content` to verify local-only exclusions.
The CI workflow performs these checks and the production build.

Experiment routes are literal folders. Register their title, description, tags,
creation date, and update-date history in `data/ExperimentsData.ts`. The explorer,
search, metadata, and sitemap derive their records from that catalog. Append an
update date once per calendar day and retain the creation date and prior history.

Blog posts are local MDX files in `data/blog/`; Turbopack discovers their compiled
modules lazily, while frontmatter is validated on the server. Adding a post does
not require editing a separate import registry.

## Architecture Decisions

- Next.js App Router replaces Pages Router.
- Next.js MDX replaces Content Collections for blog content.
- Turbopack discovers MDX files automatically, replacing the manual import registry.
- Ultracite with Oxlint and Oxfmt replaces Biome.
- Native APIs replace Effect, date-fns, and react-use in small helpers.
- Retired Headless UI, Mantine, Radix UI, React Aria, React Table, React Query,
  VisX, and Haris Lab experiments are static historical records rather than live routes.
  Their implementations and exclusive dependencies were removed; continuing
  widgets use Base UI, except the mobile experiment table of contents, which uses
  React Aria Sheet. Historical counts are separate from live experiment counts.
  The cmdk demo and dependency were also removed; omit cmdk from archive cards.
- The installable PWA caches a standalone offline page instead of Next.js pages.
- SQLite task and tools experiments stay local until they have authentication,
  authorization, rate limits, and durable storage.
- Public pages stay searchable. Cloudflare manages AI-training opt-out when enabled.

# Site Implementation

## Social Previews

Every page's metadata points to `/api/og`, which renders a 1200 × 630 image with
`ImageResponse` from `next/og`, then compresses it with Sharp to a quality-90 JPEG
with full chroma resolution to preserve text clarity and reduce preview file
size. `utils/pageMetadata.ts` passes the page's title, social description, and
path in the image URL, so content changes produce a new preview URL. Open Graph
and Twitter use the same image and descriptive alt text.
Edit `app/api/og/OpenGraphCard.tsx` to change the shared JSX design and palette.
The shared watercolor background is `public/images/og-watercolor-blue-mint.png`;
page text and CTAs are rendered dynamically over it. The route loads the local
image once and embeds it without a network request. Change the `v` parameter in
`utils/pageMetadata.ts` when updating the design to refresh cached previews.
The image renderer uses Next.js's bundled font and needs no external service.

The shared metadata identifies `@haritssr` as the Twitter/X site account.

## Canonical URLs

`utils/site.ts` defines `https://haritssr.com` as the primary domain, matching the
host served by the deployment. Page canonicals, social URLs, the sitemap, and RSS
feed all use this value; the `www` hostname redirects to the primary domain.

## Structured Data

The root layout renders `WebSite` and `Person` JSON-LD using
`components/StructuredData.tsx`. The homepage and physics units page also render
`WebPage` data; the units page includes its visible breadcrumb hierarchy. Its
structured-data title comes from the same metadata as its page title. All JSON-LD
is serialized with `<` escaped before insertion into a script element.

## Browser Appearance

`SITE_THEME_COLOR` in `utils/site.ts` sets the browser and installed-app toolbar
color through the root viewport export and app manifest. The offline document
declares the same color in its static HTML.

The root metadata registers `/favicon-32x32.png` alongside the existing ICO and
Apple touch icon. The PNG, ICO, and Apple touch icon are rasterized from
`public/icons/haritssr.svg`. That asset and `/favicon.svg` use the homepage logo's
saturated blue palette in both light and dark mode. The top bar displays the
colors directly without an additional saturation filter.

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

See the [architecture decisions](#architecture-decisions).

Validate in a production browser: install or register the worker online, disable
network access, and reload a visited and an unvisited URL. Both should show the
fallback. Reconnect and reload to recover. Check that updates remove old owned
caches and preserve unrelated caches. No full offline-content support is promised.

## RSS Feed

The blog RSS feed is available at [`/feed.xml`](https://haritssr.com/feed.xml).
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

# Discontinued Experiments

- Keep retired experiments as static records in `data/DiscontinuedExperimentsData.ts`,
  separate from the live catalog. Preserve their names, marks, and historical
  experiment counts. Render static cards inside the collapsed discontinued
  accordion without registering live pages, search entries, or sitemap URLs.
  Archive cards must not link to deleted routes.
- Do not reintroduce Headless UI, Mantine, Radix UI, React Table,
  React Query, cmdk, or VisX dependencies. Continuing widgets use the Base UI patterns
  demonstrated in `/design` and the shared components.
- React Aria is permitted only for the mobile experiment table-of-contents Sheet
  and its supporting trigger, title, and close controls. Keep its retired
  experiments archived and use Base UI for other continuing widgets.
- `discontinuedExperimentHistory.removalCommitSha` stores the actual full SHA
  of the commit that removed the implementations and dependencies. Record it
  in a follow-up commit because a commit cannot contain its own SHA. Keep this
  reference fixed to the removal commit; never replace it with the current
  HEAD, a deployment SHA, or a placeholder. This link records the original
  retirement batch; later archived experiments may have separate removal commits.

# Local Database Experiments

The task and tools database experiments are available only in development.
They store SQLite files in `.data-haritssr/` by default; set `TASK_DB_DIR` or
`TOOLS_DB_DIR` to override that directory. Production builds omit these
experiments from navigation and the sitemap, and their routes return 404.

Keep them local-only until they have user authentication, authorization, rate
limits, and durable production storage. See
[architecture decisions](#architecture-decisions).

Inspect existing local SQLite databases with `bun scripts/inspect-task-db.js`
or `bun scripts/inspect-tools-db.js`. These scripts open the databases read-only
and respect `TASK_DB_DIR` and `TOOLS_DB_DIR`.

# Skill Selection

- Use the skill that is most specific to the task being performed.
- Use the smallest set of relevant skills needed to complete the task.
- Do not invoke unrelated or overlapping skills merely because they are available.

# Responding to Explicit Instructions

When the user gives explicit directions, take one of these actions:

1. If you believe the directions are incorrect, explain why with concrete reasoning.
2. If the directions are ambiguous, request clarification.
3. Otherwise, execute the directions.

Do not silently ignore instructions or leave them unaddressed. If execution is
blocked, explain the blocker and what is needed to proceed.
