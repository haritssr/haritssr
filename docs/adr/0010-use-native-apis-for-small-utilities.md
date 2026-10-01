# 0010: Use native APIs for small utilities

- Status: accepted
- Date: 2026-10-01
- Confidence: high
- Supersedes: [0003](./0003-use-effect-for-toc-file-processing.md)

## Context

Several dependencies each support a single small utility. Effect wraps one
synchronous MDX file read, date-fns formats one date label, react-use supplies
one window-size hook, and the corner-shape plugin supplies one CSS utility.
The Forms plugin is configured for opt-in classes that the site does not use.

## Decision

Use ordinary try/catch for TOC file-read failures, preserving the logged error
and empty-list fallback. Keep Markdown parsing outside the catch so parser
errors still propagate, and retain remark and github-slugger for heading
extraction and IDs.

Format post dates with Intl.DateTimeFormat using an explicit English locale
and UTC timezone. Keep confetti viewport sizing local to its demo, initialize
dimensions after mounting, batch resize updates with requestAnimationFrame,
and remove the listener and pending frame on unmount.

Define corner-squircle as a Tailwind CSS utility and remove the unused Forms
plugin. Retain libraries demonstrated by dedicated experiments and required
peer dependencies.

## Alternatives

Keep the dependencies for their broader APIs. Their current usages do not
need those APIs, so the extra dependency surface is unnecessary.

## Consequences

- Five direct dependencies are removed while preserving the demonstrations.
- The small utilities use built-in APIs and straightforward local code.
- The site owns cleanup and initial state for the window-size hook.
- Bundle and installation savings depend on remaining transitive dependencies.

## Revisit when

Revisit this decision if structured Effect workflows, date arithmetic,
additional corner utilities, or shared viewport subscriptions become necessary.
