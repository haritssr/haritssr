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

# Discontinued Experiments

- Keep retired experiments as static records in `data/DiscontinuedExperimentsData.ts`,
  separate from the live catalog. Archive cards must not link to deleted routes.
- Do not reintroduce Headless UI, Mantine, Radix UI, React Aria, React Table,
  React Query, or cmdk dependencies. Continuing widgets use the Base UI patterns
  demonstrated in `/design` and the shared components.
- The removal-commit link uses the actual full SHA, added in a follow-up change
  after the removal commit exists. Never use a placeholder or current HEAD.

# Local Database Experiments

The task and tools database experiments are available only in development.
They store SQLite files in `.data-haritssr/` by default; set `TASK_DB_DIR` or
`TOOLS_DB_DIR` to override that directory. Production builds omit these
experiments from navigation and the sitemap, and their routes return 404.

Keep them local-only until they have user authentication, authorization, rate
limits, and durable production storage. See
[README decision notes](README.md#decisions).

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
