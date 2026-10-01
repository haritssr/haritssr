# 0003: Use Effect for table-of-contents file processing

- Status: superseded by [0010](./0010-use-native-apis-for-small-utilities.md)
- Date: 2026-08-18
- Confidence: medium

## Context

The blog table of contents is derived from Markdown headings. The server-side
utility in `utils/generateTOC.ts` reads an MDX file, extracts heading titles,
and returns an empty list when the file cannot be read. The repository already
uses the Effect v4 release candidate for this utility.

## Decision

Use Effect to model the file-read boundary: wrap synchronous filesystem access
with `Effect.try`, name the operation with `Effect.fn`, compose the processing
with Effect combinators, and run the effect synchronously at the utility
boundary.

Keep the Markdown heading extraction itself as ordinary TypeScript. Effect is
used for the error-producing file operation rather than being introduced into
every function in the rendering path.

## Alternatives

- Use a direct `try`/`catch` around `fs.readFileSync`, which would be simpler
  for this small utility but would not follow the repository's current Effect
  error-handling style.
- Make the utility fully asynchronous, which would require changing its
  callers even though the data is consumed synchronously during server-side
  rendering.
- Add a Markdown AST parser for headings, which would add complexity beyond
  the utility's current requirements.

## Consequences

- File-read failures are represented and handled explicitly at the effect
  boundary.
- The utility follows the installed Effect v4 API and can grow into more
  structured processing without changing its error boundary.
- The dependency and Effect concepts add some overhead to a small helper.
- The utility must remain server-side because it accesses the filesystem.

## Revisit when

Revisit this decision if Effect is removed from the project, if TOC generation
moves to the browser, or if the Markdown pipeline requires a parser that makes
the current line-based extraction inadequate.
