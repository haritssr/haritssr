# 0011: Discover blog modules with Turbopack

- Status: accepted
- Date: 2026-10-03
- Confidence: high
- Supersedes the explicit registry in [0007](0007-use-nextjs-mdx-for-writing-content.md)

## Decision

Use a literal, lazy `import.meta.glob("./*.mdx")` in a server-only module
colocated with the MDX files. The blog loader looks up those relative path keys.
The installed Next.js Turbopack supports this API. Keep
frontmatter validation and source word counts in the server metadata index.

## Consequences

Adding a valid MDX file makes both its metadata and compiled content discoverable.
Each article remains lazily imported. Unknown slugs still return 404. The project
continues to require Turbopack; no generated import registry or new dependency is
needed. `bun run validate:content` checks source content and catalog consistency;
CI also compiles production routes. No test files are introduced.

## Alternatives and review

An explicit registry is portable but duplicates the content directory. Revisit
this choice if the bundler changes or content moves outside the repository.
