# Site simplification notes

Reviewed: 2026-10-30. Focus: visitor experience and code maintenance.

These recommendations come from a source review; rendered layouts have not been
verified in a browser. Only the completed items below have been approved and
implemented.

## Main opportunity

The homepage combines a personal profile, service enquiries, a tools directory,
and six feature demonstrations. Reduce competing content so visitors can quickly
understand who Harits is and find useful work.

Recommended order: compact introduction → selected projects and writing → useful
tools. Keep personal notes collapsed and technical links in secondary navigation.

## Suggested changes

| Change | Visitor benefit | Maintenance benefit |
| --- | --- | --- |
| Shorten the profile to a role, short introduction, and contact links | Faster understanding of who you are | Less responsive layout complexity |
| Put personal notes behind one “More about me” disclosure on all screen sizes | Preserve personality with less initial content | Remove separate desktop/mobile rendering |
| Replace the six feature previews with a compact help link | Make room for actual projects and writing | Remove mock interfaces that duplicate real controls |
| Move Design to secondary navigation | Focus primary navigation on Projects, Labs, and Writing | Preserve the reference with a small navigation change |
| Give Commits and Tree secondary placement | Give practical tools more attention | Reduce homepage metadata and presentation needs |

Preserve individual tools and labs initially. Use usage evidence before deciding
which to retire. Preserve searchability and shared navigation behavior when
changing placement.

## Code simplifications

- The [homepage](../app/page.tsx) imports `TASK_LAYOUT` from Timer to style the
  profile. Move shared surface styling into site-wide UI or design tokens so the
  homepage does not depend on a tool.
- [Feature previews](../app/Features.tsx) reproduce search, contents, sharing,
  and timer interfaces. Removing the previews eliminates a second visual
  representation to maintain when those features change.

## Completed

- Removed “DB” badges from the Timer and Commits homepage cards.
- Removed the live homepage commit count and its database request.
- Removed the tools section's asynchronous wrapper and Suspense boundary; tools
  now render directly.
- Removed the unused cached count helper and database count query. Commit history
  remains available through the existing Commits functionality.

Verification passed: scoped source checks, typecheck, Knip, and production Knip.
Knip reported an existing configuration hint for the content validator entry.
