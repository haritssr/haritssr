# 0006: Use Ultracite with Oxlint and Oxfmt for code quality

- Status: accepted
- Date: 2026-09-02
- Confidence: high

## Context

The repository needs one repeatable path for formatting, linting, import organization, and JavaScript/TypeScript quality checks. It previously replaced ESLint and Prettier with Biome and now uses Ultracite presets through the Oxc toolchain.

## Decision

Use Ultracite-backed Oxlint and Oxfmt as the primary linting and formatting toolchain. Keep repository-specific exceptions in `oxlint.config.ts` and `oxfmt.config.ts`, run the repository check through the existing package scripts, and enable Oxlint's type-aware rules through `oxlint-tsgolint`.

## Alternatives

- Use ESLint and Prettier separately, which would provide a larger plugin ecosystem but require multiple tools and overlapping configuration.
- Use Biome without Ultracite presets, which would provide more local control but require maintaining more rules manually.
- Leave formatting and linting to individual contributors, which would reduce configuration but make quality inconsistent and difficult to verify.

## Consequences

- Formatting and linting are fast, centralized, and consistent across the codebase.
- New rules can produce broad diffs and should be introduced with focused migrations and verification.
- Ultracite, Oxlint, Oxfmt, and `oxlint-tsgolint` versions become part of the repository's upgrade surface.
- Type-aware linting provides stronger TypeScript diagnostics but can use more memory, so constrained environments should run checks sequentially with one Oxlint thread.

## Revisit when

Revisit this decision if the toolchain no longer supports the framework or language versions used here, if its checks materially slow development, or if the project adopts a shared organization-wide quality toolchain.
