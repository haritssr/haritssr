# Project Agent Skills

These are project-local instructions for coding agents. Copy the complete
skill bundle, including each skill's nested support files, when reusing it in
another project.

## Skills

- `next-cache-components-adoption` — adopt Cache Components and resolve its blocking routes.
- `next-cache-components-optimizer` — make a Next.js route's static shell instant and keep it verified.
- `next-partial-prefetching-adoption` — adopt Partial Prefetching and resolve its development insights.
- `vercel-composition-patterns` — design scalable React composition APIs.
- `vercel-react-best-practices` — apply React and Next.js performance practices.
- `vercel-react-view-transitions` — implement React View Transition animations.
- `web-design-guidelines` — review UI code against the latest Web Interface Guidelines.

## Updating

Run `bunx skills update --project --yes` from the repository root to refresh
the skills recorded in `skills-lock.json`. Commit the updated skill bundles
and lockfile together after review.

## Copying rules

Copy each skill directory, including all nested files. In particular, retain
the `references/`, `reference/`, and `rules/` directories and generated support
files. Relative links inside the skills rely on that structure.

The project convention is `.agents/skills/` (plural). A target project that
already standardizes on `.agent/skills/` may use that destination instead.
