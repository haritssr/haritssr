# 0004: Use Ultracite and Biome for code quality

- Status: superseded
- Superseded by: [0006 — Use Ultracite with Oxlint and Oxfmt for code quality](./0006-use-ultracite-and-oxlint-oxfmt-for-code-quality.md)
- Date: 2026-08-18
- Confidence: high

## Context

The repository needs one repeatable path for formatting, linting, import
organization, and JavaScript/TypeScript quality checks. It previously replaced
ESLint and Prettier with Biome and now uses Ultracite presets through
`biome.json`.

## Decision

Use Ultracite-backed Biome configuration as the primary formatting and linting
toolchain. Keep repository-specific exceptions in `biome.json`, run the
repository check through the existing package scripts, and enforce
performance-sensitive rules such as `useTopLevelRegex` at the repository level.

## Alternatives

- Use ESLint and Prettier separately, which would provide a larger plugin
  ecosystem but require multiple tools and overlapping configuration.
- Use plain Biome without Ultracite presets, which would provide more local
  control but require maintaining more rules manually.
- Leave formatting and linting to individual contributors, which would reduce
  configuration but make quality inconsistent and difficult to verify.

## Consequences

- Formatting and linting are fast, centralized, and consistent across the
  codebase.
- New rules can produce broad diffs and should be introduced with focused
  migrations and verification.
- Ultracite and Biome versions become part of the repository's upgrade surface.
- Regex declarations are kept at module scope and use descriptive names so
  their intent remains visible at the point of definition.

## Revisit when

Revisit this decision if the toolchain no longer supports the framework or
language versions used here, if its checks materially slow development, or if
the project adopts a shared organization-wide quality toolchain.
