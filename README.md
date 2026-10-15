- [Projects](https://haritssr.com/projects): Portfolio and project details.
- [Experiments](https://haritssr.com/experiments): Frontend, browser APIs, mathematics, and physics.
- [Writing](https://haritssr.com/writing): Posts and notes.
- [Design](https://haritssr.com/design): Design system reference.
- [More](https://haritssr.com/more): Interests and personal notes.
- [Commits](https://haritssr.com/commits): Commit history and activity.
  Model suitability lives at `/commits/2026-10-11` and `/commits/2026-10-15`;
  the dated review at
  `/commits/2026-10-14` covers a fixed set of committed changes in Jakarta time.
  All three pages are linked below the timeline and included in search and
  the sitemap.
  The October 15 assessment covers a fixed set of committed changes; model and
  effort labels are editorial estimates, not recorded model usage.

- Built with Next.js, React, TypeScript, Tailwind CSS, MDX, and Bun.
- Subscribe to the [RSS feed](https://haritssr.com/feed.xml).

User Interface experiments live at `/experiments/user-interface` and its child
routes.

Every non-home page shows a pill back button in the top bar at every screen size,
including before scrolling. Home keeps the “Harits Syah” link. Pass the destination
through `PageHeader`'s `back={{ href, name }}` prop and set `path` to the exact route;
the header stores navigation metadata without rendering a back link or reserving
an empty navigation row above the title. Experiment headers provide their parent
destination even when the former in-content back button was hidden. The top bar
uses Home when matching header metadata is unavailable. Below 640px, the back
pill shows its destination name at the page top and becomes chevron-only as soon
as the page is scrolled. Desktop always keeps the destination name. The topbar
`BackButton` accepts `compact` for this mobile-only icon state; long labels
truncate to keep the controls on one row.

`useScrolledPageHeader` discovers back metadata independently of the title's scroll
position. `PageTitle` provides the title marker: once the title scrolls behind the
top bar, it replaces the center navigation. Returning to the title restores center
navigation while keeping the back button visible.
On mobile article pages, the scrolling title is centered between the screen
edges, with its width capped to leave room for the back and Contents pills.
Other mobile pages keep the title after the back pill. Desktop keeps the title
centered.

Nested pages with visible content headings (`h2`–`h6`, including MDX headings and
shared `SectionHeading` components) show an icon-only
Contents button in its own pill to the right of the top bar actions. Contents opens
below the trigger on desktop and in a sheet on mobile. Below 640px, once the
scrolling title appears, Search, Theme, Share, and GitHub move into their existing pill
below the sheet's grab handle. Pages without contents keep these actions in the
top bar. Search waits for the sheet to close; its shortcut remains available.
Home and first-level routes omit the Contents button. Writing and experiment
articles show their floating back-to-top control when scrolling upward. It
hides while scrolling downward and at the top of the page.

Below 640px, floating icon controls use 40px tap targets and 20px icons;
desktop controls retain their compact sizing. Text pills have a matching minimum
height, and bottom navigation links have at least 40px tap height. The top bar
stays on one row, truncating the site name or page title when space is limited.

Floating navigation pills and the back-to-top control share `floating-surface`:
fully rounded corners, a blurred 50% surface background (60% on hover), 150%
color saturation, and 98% scale while pressed. Top bar borders match content
borders at the page top and gain contrast with a tight, soft shadow around their edges while scrolling.
The back-to-top control shares that border and shadow. The Pill Material
experiment retains its adjustable opacity and blur.
Bottom navigation keeps its pill styling without scaling while pressed.

UI colors use near-white (`zinc-50`) and near-black (`zinc-900`) instead of pure
white or black, including shared color tokens, control thumbs, and shadows.

Global search opens with a single list of Home, Projects, Experiments, Writing,
and Design, followed by Share, theme choices, and GitHub. Type to filter pages
and commands. Type `share` and press Enter to copy the current page URL (including its query and fragment); the same confirmation
and clipboard behavior are shared with the top-bar Share button.

The theme button cycles System → Light → Dark → System and shows the selected
preference's icon. First visits use System; explicit choices persist locally.

The mobile BottomBar appears on Home and routes under Projects, Experiments,
Writing, and Design up to two URL segments deep, such as
`/experiments/mathematics`. Nested routes highlight their main section. Individual
writing articles, deeper routes, and other sections omit it. The design preview
remains available.

The shared layout uses a viewport-height flex layout for the whole page, so its footer fits
without extra scrolling when the content fits. Longer content still scrolls normally.
The root reserves symmetric scrollbar gutters so expanding accordions or navigating
between short and long pages keeps the centered layout in place.
