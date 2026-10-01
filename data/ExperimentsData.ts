import type { Metadata } from "next";

interface ExperimentEntry {
  /** ISO calendar dates (YYYY-MM-DD) tracked from the route history. */
  readonly createdAt: string;
  readonly slug: string;
  readonly title: string;
  readonly updatedAt: string;
}

export interface ExperimentDomain {
  readonly description: string;
  readonly experiments: readonly ExperimentEntry[];
  readonly id: number;
  readonly logoSrc: string;
  readonly slug: string;
  readonly title: string;
}

export const ExperimentsData: readonly ExperimentDomain[] = [
  {
    description: "CSS library for styling websites",
    experiments: [
      {
        slug: "position",
        title: "Position",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "apple-navbar",
        title: "Apple NavBar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "blurry",
        title: "Blurry",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "floating-labels",
        title: "Floating Labels",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "glowing-background",
        title: "Glowing Background",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "grid",
        title: "Grid",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "planetscale-navbar",
        title: "PlanetScale NavBar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "sidebar",
        title: "Sidebar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "scrollbar",
        title: "Scrollbar",
        createdAt: "2026-09-25",
        updatedAt: "2026-09-27",
      },
      {
        slug: "youtube-thumbnail",
        title: "YouTube Thumbnail",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "newspaper",
        title: "Newspaper",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "centering-div",
        title: "Centering Div",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "columns",
        title: "Columns",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "tailwind-vs-apple-color",
        title: "Tailwind vs Apple Color",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "feedback",
        title: "Feedback",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "grid-vs-column",
        title: "Grid vs. Columns",
        createdAt: "2026-09-27",
        updatedAt: "2026-09-27",
      },
    ],
    id: 1,
    logoSrc: "/icons/tailwindcss.jpg",
    slug: "tailwind-css",
    title: "Tailwind CSS",
  },
  {
    description: "JavaScript library for building user interfaces",
    experiments: [
      {
        slug: "usestate-todo-list",
        title: "useState Todo List",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "usestate-form",
        title: "useState Form",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "usestate-object-form",
        title: "useState Object Form",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "usestate-draggable-box",
        title: "useState Draggable Box",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "usestate-reacting-to-input",
        title: "useState Reacting To Input",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "useeffect-title",
        title: "useEffect Title",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "usecontext-dark-mode",
        title: "useContext Dark Mode",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "usememo-1",
        title: "useMemo 1",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "useimperativehandle",
        title: "useImperativeHandle",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "usereducer-todo-list",
        title: "useReducer Todo List",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "usereducer-todo-list-immer",
        title: "useReducer Todo List Immer",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "react-use-reducer-july-2026",
        title: "React useReducer July 2026",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "submit-form",
        title: "Submit Form",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "generic-select",
        title: "Generic Select",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "searchable-product-data",
        title: "Searchable Product Data",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "search-table",
        title: "Search Table",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "search-books",
        title: "Search Books",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "search-interpol",
        title: "Search Interpol",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "functional-props",
        title: "Functional Props",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "edit-profile",
        title: "Edit Profile",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-21",
      },
      {
        slug: "font-mixer",
        title: "Font Mixer",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "counter",
        title: "Counter",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "react-wrap-balancer",
        title: "React Wrap Balancer",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "modal-inside-modal",
        title: "Modal Inside Modal",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "confetti",
        title: "Confetti",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "simple-search",
        title: "Simple Search",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "cmdk",
        title: "cmdk",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "activity-demo",
        title: "Activity Demo",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
    ],
    id: 2,
    logoSrc: "/icons/react.jpg",
    slug: "react",
    title: "React",
  },
  {
    description: "The React framework for the web",
    experiments: [
      {
        slug: "router",
        title: "Router",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "swr",
        title: "SWR",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "articles",
        title: "Articles",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "students",
        title: "Students",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "posts",
        title: "Posts",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "next-13-image-local",
        title: "Next 13 Image Local",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "next-13-image-remote",
        title: "Next 13 Image Remote",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
    ],
    id: 3,
    logoSrc: "/icons/nextjs.jpg",
    slug: "nextjs",
    title: "Nextjs",
  },
  {
    description: "Native built-in browser API utilities exploration",
    experiments: [
      {
        slug: "clock",
        title: "Clock",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "number-game",
        title: "Number game",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-26",
      },
      {
        slug: "inputs",
        title: "Inputs",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-26",
      },
      {
        slug: "details",
        title: "Details",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "select",
        title: "Select",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-26",
      },
      {
        slug: "description-list",
        title: "Description List",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "figure",
        title: "Figure",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "text-editing",
        title: "Text Editing",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "youtube-embed",
        title: "YouTube Embed",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "intersection-observer-api",
        title: "Intersection Observer API",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "scroll-title",
        title: "Scroll Title",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "custom-scroll",
        title: "Custom Scroll",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-20",
      },
      {
        slug: "different-css-styling",
        title: "Different CSS Styling",
        createdAt: "2026-02-04",
        updatedAt: "2026-09-26",
      },
    ],
    id: 4,
    logoSrc: "/icons/chrome.jpg",
    slug: "browser",
    title: "Browser",
  },
  {
    description: "Data visualization using React.js",
    experiments: [
      {
        slug: "bar-chart",
        title: "Bar Chart",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "pie-chart",
        title: "Pie Chart",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
    ],
    id: 5,
    logoSrc: "/icons/VisX.jpg",
    slug: "visx",
    title: "VisX",
  },
  {
    description: "A fully featured React component libray",
    experiments: [
      {
        slug: "carousel",
        title: "Carousel",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
    ],
    id: 7,
    logoSrc: "/icons/mantine.jpg",
    slug: "mantine",
    title: "Mantine",
  },
  {
    description: "Headless UI components by Tailwind CSS Team",
    experiments: [
      {
        slug: "menu",
        title: "Menu",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "listbox",
        title: "Listbox",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "switch",
        title: "Switch",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "disclosure",
        title: "Disclosure",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "dialog",
        title: "Dialog",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "popover",
        title: "Popover",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "radio-group",
        title: "Radio Group",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "tabs",
        title: "Tabs",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
    ],
    id: 8,
    logoSrc: "/icons/headlessui.jpg",
    slug: "headless-ui",
    title: "Headless UI",
  },
  {
    description: "Headless UI for design system in React.js",
    experiments: [
      {
        slug: "accordion",
        title: "Accordion",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "alert-dialog",
        title: "Alert Dialog",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "checkbox",
        title: "Checkbox",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "collapsible",
        title: "Collapsible",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "dialog",
        title: "Dialog",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "dropdown-menu",
        title: "Dropdown Menu",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "hover-card",
        title: "Hover Card",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "popover",
        title: "Popover",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "radio-group",
        title: "Radio Group",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "scroll-area",
        title: "Scroll Area",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "select",
        title: "Select",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "slider",
        title: "Slider",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "switch",
        title: "Switch",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "toggle",
        title: "Toggle",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "toggle-group",
        title: "Toggle Group",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "toolbar",
        title: "Toolbar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "tooltip",
        title: "Tooltip",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "toast",
        title: "Toast",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "tabs",
        title: "Tabs",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-21",
      },
    ],
    id: 9,
    logoSrc: "/icons/radixui.jpg",
    slug: "radix-ui",
    title: "Radix UI",
  },
  {
    description: "Haris Lab user interfaces design systems",
    experiments: [
      {
        slug: "global-modal",
        title: "Global Modal",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "context-modal",
        title: "Context Modal",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "side-bar",
        title: "Side Bar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "sidebar-hierarchy",
        title: "Sidebar Hierarchy",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
    ],
    id: 11,
    logoSrc: "/icons/harislab.svg",
    slug: "haris-lab",
    title: "Haris Lab",
  },
  {
    description: "A library of React Hooks, UI primitives, and more",
    experiments: [
      {
        slug: "calendar",
        title: "Calendar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
    ],
    id: 12,
    logoSrc: "/icons/react-aria.jpg",
    slug: "react-aria",
    title: "React Aria",
  },
  {
    description: "The math typesetting library for the web",
    experiments: [
      {
        slug: "basic",
        title: "Basic",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
    ],
    id: 13,
    logoSrc: "/icons/KaTeX.jpg",
    slug: "katex",
    title: "KaTeX",
  },
  {
    description: "Headless UI for building tables & datagrids",
    experiments: [
      {
        slug: "basic",
        title: "Basic",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "column-group",
        title: "Column Group",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
    ],
    id: 14,
    logoSrc: "/icons/tanstack.jpg",
    slug: "react-table",
    title: "React Table",
  },
  {
    description: "Asynchronous state management for TS/JS",
    experiments: [
      {
        slug: "basic",
        title: "Basic",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
    ],
    id: 15,
    logoSrc: "/icons/tanstack.jpg",
    slug: "react-query",
    title: "React Query",
  },
  {
    description: "Random user interfaces explorations",
    experiments: [
      {
        slug: "notion-navbar",
        title: "Notion NavBar",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "times-table",
        title: "Times Table",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "inline-maki",
        title: "Inline Maki",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "masalah-to-feature",
        title: "Masalah Pelajar → HL Feature",
        createdAt: "2026-08-25",
        updatedAt: "2026-09-27",
      },
      {
        slug: "task",
        title: "Task",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "yearly-interest",
        title: "Yearly Interest",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-27",
      },
      {
        slug: "input-list",
        title: "Input List",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-26",
      },
      {
        slug: "stopwatch",
        title: "Stopwatch",
        createdAt: "2026-08-18",
        updatedAt: "2026-09-20",
      },
      {
        slug: "tools",
        title: "Tools",
        createdAt: "2026-08-19",
        updatedAt: "2026-09-27",
      },
    ],
    id: 10,
    logoSrc: "/icons/radixui.jpg",
    slug: "ui-explorations",
    title: "UI Explorations",
  },
  {
    description: "Interactive explorations of physical phenomena",
    experiments: [
      {
        slug: "units",
        title: "Besaran dan Satuan",
        createdAt: "2026-09-20",
        updatedAt: "2026-09-27",
      },
      {
        slug: "electron-configuration",
        title: "Electron Configuration",
        createdAt: "2026-09-23",
        updatedAt: "2026-09-29",
      },
      {
        slug: "motion-diagrams",
        title: "Motion Diagrams",
        createdAt: "2026-09-25",
        updatedAt: "2026-09-29",
      },
    ],
    id: 16,
    logoSrc: "/icons/physics.svg",
    slug: "physics",
    title: "Physics",
  },
];

export type ExperimentDomainData = ExperimentDomain;

export function getExperimentDomain(slug: string): ExperimentDomain {
  const domain = ExperimentsData.find((entry) => entry.slug === slug);

  if (!domain) {
    throw new Error(`Unknown experiment domain: ${slug}`);
  }

  return domain;
}

function getExperiment(
  domainSlug: string,
  experimentSlug: string
): ExperimentEntry {
  const domain = getExperimentDomain(domainSlug);
  const experiment = domain.experiments.find(
    (entry) => entry.slug === experimentSlug
  );

  if (!experiment) {
    throw new Error(`Unknown experiment: ${domainSlug}/${experimentSlug}`);
  }

  return experiment;
}

export function getExperimentDomainMetadata(slug: string): Metadata {
  const domain = getExperimentDomain(slug);

  return {
    description: `${domain.title} experiments and demos`,
    title: `${domain.title} Experiments`,
  };
}

export function getExperimentMetadata(
  domainSlug: string,
  experimentSlug: string
): Metadata {
  const domain = getExperimentDomain(domainSlug);
  const experiment = getExperiment(domainSlug, experimentSlug);

  return {
    description: `${experiment.title} experiment in ${domain.title}`,
    title: `${experiment.title} | ${domain.title} Experiments`,
  };
}
