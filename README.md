Personal and experimental site by Harits Syah [www.haritssr.com](https://www.haritssr.com)

- [`projects`](/projects): Project portfolio and project detail pages.
- [`experiments`](/experiments): Interactive experiments across frontend libraries, browser APIs, mathematics, and physics.
- [`blog`](/blog): Blog posts and notes.
- [`design`](/design): Design system reference.

## Technology

Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Blog posts
use MDX, and Bun is used for project scripts and tooling. The experiments also
explore libraries including Radix UI, Headless UI, Mantine, and TanStack Table.

## Development

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
