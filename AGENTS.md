<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Commit Guidelines

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
- add: Adding new things

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
- Kill temporary processes after finishing.
- Prefer targeted tests and targeted linting.
- Do not run the entire test suite unless necessary.
- Do not run `next build` unless necessary.

# Run Build

- Never run the production build from an AI agent environment. Turbopack may
  require local worker-port permissions unavailable to sandboxed agents; run
  the build locally or in CI instead.
- Never use bun run --webpack to run build, use regular bun run build (which using Turbopack)

# Skill Selection

- Use the skill that is most specific to the task being performed.
- Use the smallest set of relevant skills needed to complete the task.
- Do not invoke unrelated or overlapping skills merely because they are available.
