# 0002: Use Content Collections for blog content

- Status: accepted
- Date: 2026-02-04
- Confidence: high

## Context

Blog posts are maintained as local MDX files under `data/writing/`. The application
needs validated front matter, generated slugs, word counts, structured data,
and typed access to posts during the Next.js build. The repository previously
used Contentlayer and migrated to Content Collections.

## Decision

Use `@content-collections/core` with Zod-backed schemas and the Next.js
integration. Define the blog collection in `utils/content-collections.ts` and consume
the generated `allBlogs` collection from routes and components.

## Alternatives

- Continue using Contentlayer, which was already present but had a larger
  generated footprint and was replaced in this repository.
- Use a remote CMS, which would improve non-developer editing but add runtime
  availability, authentication, and deployment dependencies.
- Build a custom MDX loader, which would reduce dependencies but duplicate
  schema validation and content transformation work.

## Consequences

- Content remains versioned with the code and can be reviewed in the same pull
  request as its presentation changes.
- Metadata and derived values are generated in one typed transformation step.
- Publishing requires a code/content change and deployment; there is no
  separate editorial interface.
- The generated content-collections output is a build artifact and should not
  be treated as source code.

## Revisit when

Revisit this decision if content authors need independent publishing, if build
times become a material constraint, or if content must be shared across
multiple applications.
