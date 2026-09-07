# 0007: Use Next.js MDX for writing content

- Status: accepted
- Date: 2026-09-07
- Confidence: high

## Context

Writing is maintained as local MDX under `data/writing/`. Content Collections
validated frontmatter and generated a typed index, but the application then
parsed each entry as Markdown instead of compiling it as MDX. This duplicated
Next.js rendering infrastructure and silently discarded JSX embedded in posts.

## Decision

Use `@next/mdx` to compile and render writing content. Keep YAML frontmatter and
load it through a small server-only index built with `gray-matter` and Zod. Use
an explicit module registry so Turbopack can statically determine which MDX
files are reachable.

## Alternatives

- Keep Content Collections, which preserves generated types but retains a
  separate build integration and does not remove the manual rendering path.
- Export metadata as JavaScript from every MDX file, which is native to MDX but
  would require rewriting all existing content and asynchronously importing
  every post to construct the index.
- Use variable dynamic imports, which reduces registry maintenance but makes
  the set of bundled and traced files less explicit.

## Consequences

- JSX in writing files is rendered as MDX instead of being discarded.
- Frontmatter remains the single source of writing metadata and is validated
  when the server module loads.
- Adding a writing requires adding its slug to the explicit module registry;
  an automated test prevents the registry and content directory from drifting.
- Publishing remains tied to a deployment because writing stays in the
  repository.

## Revisit when

Revisit this decision if content authors need independent publishing, the
registry becomes burdensome, or writing moves to a remote content source.
