- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Experiments](https://haritssr.com/experiments): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [More](https://haritssr.com/more): Interests and personal notes.
- [Commits](https://haritssr.com/commits): Commit history and activity.
  Model suitability lives at `/commits/2026-10-11`; the dated review at
  `/commits/2026-10-14` covers a fixed set of committed changes in Jakarta time.
  Both pages are linked below the timeline and included in search and the sitemap.

- Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.
- Subscribe to the [RSS feed](https://haritssr.com/feed.xml).

User Interface experiments live at `/experiments/user-interface` and its child
routes.

Pages with a title and back button inside `PageHeader` show that back button
and title in the top bar once the title scrolls behind it. Set the header's
`path` to the exact route; `PageTitle` and `BackButton` provide the discovery
markers used by `useScrolledPageHeader`. Returning to the title restores the
normal navigation. Nested pages with visible content headings (`h2`–`h6`, including
MDX headings and shared `SectionHeading` components) show an icon-only
Contents button in its own pill to the right of the top bar actions. Contents opens
below the trigger on desktop and in a sheet on mobile. Below 640px, once the
scrolling title appears, Search, Theme, and GitHub move into their existing pill
below the sheet's grab handle. Pages without contents keep these actions in the
top bar. Search waits for the sheet to close; its shortcut remains available.
Home and first-level routes omit the Contents button. Writing and experiment
articles show their floating back-to-top control when scrolling upward. It
hides while scrolling downward and at the top of the page.

The theme button cycles System → Light → Dark → System and shows the selected
preference's icon. First visits use System; explicit choices persist locally.

The mobile BottomBar appears only on `/projects`, `/experiments`, `/writing`,
and `/design`, matching its destinations exactly. Home keeps it hidden;
nested pages and other routes omit it. The design preview remains available.

The shared layout uses a viewport-height flex layout for the whole page, so its footer fits
without extra scrolling when the content fits. Longer content still scrolls normally.
The root reserves symmetric scrollbar gutters so expanding accordions or navigating
between short and long pages keeps the centered layout in place.
