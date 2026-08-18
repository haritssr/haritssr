<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
`node_modules/next/dist/docs/` (resolved from this file's directory; in
monorepos the `next` package may not be visible from the repo root) before
writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at
`node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a
diff only re-creates the uncommitted change; committing it with your work keeps
the tree clean.

<!-- END:nextjs-agent-rules -->

# Agent Guidelines

## Code Style Rules

### Block Statements

**Block statements are preferred in this position.**

Always use block statements (`{}`) instead of single-line statements for:

- `if` / `else` / `else if`
- `for` / `while` / `do while`
- `try` / `catch` / `finally`

**Good:**

```typescript
if (condition) {
  doSomething();
}

for (const item of items) {
  process(item);
}
```

**Bad:**

```typescript
if (condition) doSomething();

for (const item of items) process(item);
```

## Commit Guidelines

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

## Vendored Repositories

External source repositories may be vendored under `repos/` with `git subtree --squash` so agents can inspect real upstream source code.

- Treat files under `repos/` as read-only reference material unless explicitly asked to update a subtree or edit vendored code.
- Prefer examples, tests, and implementation patterns from vendored repositories over guesses or fragmented web search results when working with related libraries.
- Do not import from `repos/` in application code. Application code should keep importing from normal package dependencies.
- When writing Effect code, inspect `repos/effect/` for idiomatic usage, tests, module structure, and API design if that subtree is present.
- If `repos/effect/LLMS.md` exists, read it before making non-trivial Effect changes.
