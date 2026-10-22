interface WeekSummary {
  description: string;
  changes: string[];
}

interface WeeklyEntry extends WeekSummary {
  start: string;
  end: string;
  title: string;
  partial: boolean;
}

// Curated from changelog.json through e7442486deb52ebd3569aec77b6b0766f7dc702c.
// Update the cutoff and summaries together; future commits are not summarized automatically.
export const reviewedThrough = "2026-10-22";

const summaries: Record<string, WeekSummary> = {
  "2026-01-01": {
    description: "The year opened with repository and TypeScript cleanup.",
    changes: [
      "Removed the Technology page, tracked editor settings, and TypeScript build artifacts.",
      "Standardized interface declarations, formatting, and repository documentation.",
    ],
  },
  "2026-01-08": {
    description:
      "Shared links and navigation became simpler, with Bun used for development.",
    changes: [
      "Simplified internal links and experiment layouts; removed unused components and helpers.",
      "Switched the development runtime to Bun and refined contact keys and name highlighting.",
    ],
  },
  "2026-01-15": {
    description:
      "Navigation components and content layouts received a maintenance pass.",
    changes: [
      "Reorganized TopBar and BottomBar, simplified blog links, and adjusted content spacing.",
      "Updated Headless UI usage and dependencies; removed the existing sitemap implementation.",
    ],
  },
  "2026-01-22": {
    description: "The standalone About page was removed.",
    changes: ["Deleted the About page."],
  },
  "2026-02-01": {
    description:
      "Content, API endpoints, and experiments moved toward the App Router.",
    changes: [
      "Migrated Contentlayer to Content Collections and API endpoints to the App Router.",
      "Moved experiments into App Router routes and removed the comments feature.",
    ],
  },
  "2026-02-15": {
    description: "Homepage structure and writing metadata were refined.",
    changes: [
      "Extracted the AI workflow section and aligned homepage section wrappers.",
      "Added Notion page IDs to the blog schema and entries.",
    ],
  },
  "2026-02-22": {
    description:
      "Shared layouts and navigation were modernized across the site.",
    changes: [
      "Added shared UI and page descriptions; refreshed breadcrumbs, footer, and global styles.",
      "Restructured home and experiment layouts and corrected the imperative-handle demo.",
    ],
  },
  "2026-03-01": {
    description:
      "A task manager and new UI demos expanded the experiment collection.",
    changes: [
      "Added task pages, persistence, and API endpoints, then simplified tasks to a type-only model.",
      "Added UI demos and footer sharing; separated page descriptions from titles.",
    ],
  },
  "2026-05-29": {
    description:
      "Local tools, route search, and API learning examples were introduced.",
    changes: [
      "Added SQLite-backed tool management, route search, and UI exploration examples.",
      "Added an Effect-based API fetching demo and documented the vendored repository workflow.",
    ],
  },
  "2026-06-01": {
    description:
      "The API demo gained catch-all parameters alongside asset cleanup.",
    changes: [
      "Displayed catch-all API parameters, removed unused fonts, and adjusted icon paths.",
    ],
  },
  "2026-07-01": {
    description: "Small presentation changes clarified experimental pages.",
    changes: [
      "Added an experiment badge to Task and simplified profile and project card styling.",
    ],
  },
  "2026-07-22": {
    description:
      "Projects and homepage components were reorganized as React demos grew.",
    changes: [
      "Renamed Experiences to Projects and reorganized contact, CV, and database helpers.",
      "Added reducer and stopwatch demos; updated Tailwind and removed unused styles and data.",
    ],
  },
  "2026-07-29": {
    description:
      "Route discovery, fonts, and experiment organization were refreshed.",
    changes: [
      "Restored the sitemap and moved stopwatch and times-table pages into experiments.",
      "Added a local Inter font, updated Next.js, and removed unused tooling and Faker code.",
    ],
  },
  "2026-08-01": {
    description:
      "React examples and development tooling received substantial updates.",
    changes: [
      "Added React Activity and deferred-search demos; simplified navigation and route data.",
      "Adopted TypeScript 7, updated Next.js, and corrected configuration and project links.",
    ],
  },
  "2026-08-08": {
    description: "Broken imports and obsolete React examples were cleaned up.",
    changes: [
      "Fixed blog and icon imports, improved imperative-handle typing, and removed forward-ref demos.",
      "Updated SQLite dependencies and stopped tracking generated Next.js types and unused fonts.",
    ],
  },
  "2026-08-15": {
    description:
      "Installable and feed features arrived alongside a broad site reorganization.",
    changes: [
      "Added PWA installation and a writing RSS feed, with shared canonical URLs and a sitemap.",
      "Reorganized writing and experiment routes, added source links, and simplified home content.",
      "Moved Tailwind configuration into CSS and strengthened linting and unused-code checks.",
    ],
  },
  "2026-08-22": {
    description:
      "A dedicated design system brought shared controls and a clearer homepage.",
    changes: [
      "Established the Design route with Base UI controls, Heroicons, and consistent form styling.",
      "Refined profile cards, removed CV and newsletter sections, and added a problem-feature graph.",
      "Improved sharing feedback and searchable routes while reducing global client boundaries.",
    ],
  },
  "2026-09-01": {
    description:
      "Writing and design infrastructure moved to the current toolchain.",
    changes: [
      "Migrated writing to Next.js MDX and replaced Biome with Oxlint and Oxfmt.",
      "Fixed active article contents links and refined contrast, shared controls, and toast feedback.",
    ],
  },
  "2026-09-08": {
    description:
      "Recovery, accessibility, and local-data safeguards were strengthened.",
    changes: [
      "Added 404 recovery actions and responsive home previews; updated React to 19.3.",
      "Protected private responses from PWA caching and kept SQLite demos development-only.",
      "Hardened task and tool persistence and improved navigation semantics and project metadata.",
    ],
  },
  "2026-09-15": {
    description:
      "Global search and richer writing and physics references improved discovery.",
    changes: [
      "Added global site search with improved matching, feedback, and a keyboard shortcut.",
      "Published graph and transformation essays and refined writing summaries and metadata.",
      "Added physics units and prerequisite graphs; consolidated footer and semantic color styling.",
    ],
  },
  "2026-09-22": {
    description:
      "Physics visualizations expanded while shared page structure became more consistent.",
    changes: [
      "Added electron orbitals, motion diagrams, dependent formulas, and CSS layout demos.",
      "Renamed writing routes and aligned accessible markup, back links, and section spacing.",
    ],
  },
  "2026-10-01": {
    description:
      "Math and physics learning tools grew alongside search and metadata improvements.",
    changes: [
      "Added calculus, algebra, double-slit, orbital, and interactive TeX learning tools.",
      "Expanded catalog metadata and shared controls; improved search, navigation, and offline recovery.",
      "Added page-specific previews and structured data, and introduced site-wide dark mode.",
    ],
  },
  "2026-10-08": {
    description:
      "Learning content and reading navigation expanded, with commit history now browsable.",
    changes: [
      "Added geometry and physics demos, saved polynomial practice, and clearer worked solutions.",
      "Added responsive Contents and scrolling headers, reorganized Writing, and listed API endpoints.",
      "Introduced the commit explorer and dated reviews; consolidated design controls and route layouts.",
    ],
  },
  "2026-10-15": {
    description:
      "Timer became a daily activity tool as Labs and navigation were simplified.",
    changes: [
      "Added daily timers, history, statistics, task editing, autoplay, multitasking, and speed controls.",
      "Renamed Experiments to Labs, added the route tree, and moved diagrams to Pele.",
      "Removed dark mode and refined shared navigation, search commands, and design tokens.",
    ],
  },
  "2026-10-22": {
    description:
      "Timer gained authenticated storage and controls available across the site.",
    changes: [
      "Added Google sign-in, Turso storage, optimistic updates, and floating timer controls.",
      "Added a settings modal and Quartz sounds; refined timer cards, alerts, and responsive controls.",
      "Updated the profile grid, content ownership, diagrams, and dated commit reviews.",
    ],
  },
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function buildWeeks(): WeeklyEntry[] {
  const year = Number(reviewedThrough.slice(0, 4));
  const lastMonth = Number(reviewedThrough.slice(5, 7));
  const weeks: WeeklyEntry[] = [];

  for (let month = 1; month <= lastMonth; month += 1) {
    const monthKey = `${year}-${String(month).padStart(2, "0")}`;
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    for (let day = 1; day <= daysInMonth; day += 7) {
      const start = `${monthKey}-${String(day).padStart(2, "0")}`;
      if (start > reviewedThrough) {
        break;
      }
      const scheduledEnd = `${monthKey}-${String(Math.min(day + 6, daysInMonth)).padStart(2, "0")}`;
      const partial = scheduledEnd > reviewedThrough;
      const summary = summaries[start];

      weeks.push({
        start,
        end: partial ? reviewedThrough : scheduledEnd,
        title: `${monthNames[month - 1]} Week#${Math.ceil(day / 7)}`,
        partial,
        description: summary?.description ?? "No recorded changes.",
        changes: summary?.changes ?? [],
      });
    }
  }

  return weeks.toReversed();
}

export const weeklyChangelog = buildWeeks();
