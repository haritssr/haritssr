Personal and experimental site by Harits Syah [www.haritssr.com](https://www.haritssr.com)

- [`projects`](/projects): Project portfolio and project detail pages.
- [`experiments`](/experiments): Interactive experiments across frontend libraries, browser APIs, mathematics, and physics.
- [`blog`](/blog): Blog posts and notes.
- [`design`](/design): Design system reference.

## Technology

Built with Next.js App Router, React, TypeScript, and Tailwind CSS. Blog posts
use MDX, and Bun is used for project scripts and tooling. The experiments also
explore libraries including Radix UI, Headless UI, Mantine, and TanStack Table.

Blog posts are local MDX files in `data/blog/`; Turbopack discovers their compiled
modules lazily, while frontmatter is validated on the server. Adding a post does
not require editing a separate import registry.
