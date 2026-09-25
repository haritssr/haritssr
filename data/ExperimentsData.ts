import type { Metadata } from "next";

interface ExperimentEntry {
  readonly slug: string;
  readonly title: string;
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
      { slug: "position", title: "Position" },
      { slug: "apple-navbar", title: "Apple NavBar" },
      { slug: "blurry", title: "Blurry" },
      { slug: "floating-labels", title: "Floating Labels" },
      { slug: "glowing-background", title: "Glowing Background" },
      { slug: "grid", title: "Grid" },
      { slug: "planetscale-navbar", title: "PlanetScale NavBar" },
      { slug: "sidebar", title: "Sidebar" },
      { slug: "youtube-thumbnail", title: "YouTube Thumbnail" },
      { slug: "newspaper", title: "Newspaper" },
      { slug: "centering-div", title: "Centering Div" },
      { slug: "columns", title: "Columns" },
      { slug: "tailwind-vs-apple-color", title: "Tailwind vs Apple Color" },
      { slug: "feedback", title: "Feedback" },
    ],
    id: 1,
    logoSrc: "/icons/tailwindcss.jpg",
    slug: "tailwind-css",
    title: "Tailwind CSS",
  },
  {
    description: "JavaScript library for building user interfaces",
    experiments: [
      { slug: "usestate-todo-list", title: "useState Todo List" },
      { slug: "usestate-form", title: "useState Form" },
      { slug: "usestate-object-form", title: "useState Object Form" },
      { slug: "usestate-draggable-box", title: "useState Draggable Box" },
      {
        slug: "usestate-reacting-to-input",
        title: "useState Reacting To Input",
      },
      { slug: "useeffect-title", title: "useEffect Title" },
      { slug: "usecontext-dark-mode", title: "useContext Dark Mode" },
      { slug: "usememo-1", title: "useMemo 1" },
      { slug: "useimperativehandle", title: "useImperativeHandle" },
      { slug: "usereducer-todo-list", title: "useReducer Todo List" },
      {
        slug: "usereducer-todo-list-immer",
        title: "useReducer Todo List Immer",
      },
      {
        slug: "react-use-reducer-july-2026",
        title: "React useReducer July 2026",
      },
      { slug: "submit-form", title: "Submit Form" },
      { slug: "generic-select", title: "Generic Select" },
      {
        slug: "searchable-product-data",
        title: "Searchable Product Data",
      },
      { slug: "search-table", title: "Search Table" },
      { slug: "search-books", title: "Search Books" },
      { slug: "search-interpol", title: "Search Interpol" },
      { slug: "functional-props", title: "Functional Props" },
      { slug: "edit-profile", title: "Edit Profile" },
      { slug: "font-mixer", title: "Font Mixer" },
      { slug: "counter", title: "Counter" },
      { slug: "react-wrap-balancer", title: "React Wrap Balancer" },
      { slug: "modal-inside-modal", title: "Modal Inside Modal" },
      { slug: "confetti", title: "Confetti" },
      { slug: "simple-search", title: "Simple Search" },
      { slug: "cmdk", title: "cmdk" },
      { slug: "activity-demo", title: "Activity Demo" },
    ],
    id: 2,
    logoSrc: "/icons/react.jpg",
    slug: "react",
    title: "React",
  },
  {
    description: "The React framework for the web",
    experiments: [
      { slug: "router", title: "Router" },
      { slug: "swr", title: "SWR" },
      { slug: "articles", title: "Articles" },
      { slug: "students", title: "Students" },
      { slug: "posts", title: "Posts" },
      { slug: "next-13-image-local", title: "Next 13 Image Local" },
      { slug: "next-13-image-remote", title: "Next 13 Image Remote" },
    ],
    id: 3,
    logoSrc: "/icons/nextjs.jpg",
    slug: "nextjs",
    title: "Nextjs",
  },
  {
    description: "Native built-in browser API utilities exploration",
    experiments: [
      { slug: "clock", title: "Clock" },
      { slug: "number-game", title: "Number game" },
      { slug: "inputs", title: "Inputs" },
      { slug: "details", title: "Details" },
      { slug: "select", title: "Select" },
      { slug: "description-list", title: "Description List" },
      { slug: "figure", title: "Figure" },
      { slug: "text-editing", title: "Text Editing" },
      { slug: "youtube-embed", title: "YouTube Embed" },
      {
        slug: "intersection-observer-api",
        title: "Intersection Observer API",
      },
      { slug: "scroll-title", title: "Scroll Title" },
      { slug: "custom-scroll", title: "Custom Scroll" },
      { slug: "different-css-styling", title: "Different CSS Styling" },
    ],
    id: 4,
    logoSrc: "/icons/chrome.jpg",
    slug: "browser",
    title: "Browser",
  },
  {
    description: "Data visualization using React.js",
    experiments: [
      { slug: "bar-chart", title: "Bar Chart" },
      { slug: "pie-chart", title: "Pie Chart" },
    ],
    id: 5,
    logoSrc: "/icons/VisX.jpg",
    slug: "visx",
    title: "VisX",
  },
  {
    description: "A fully featured React component libray",
    experiments: [{ slug: "carousel", title: "Carousel" }],
    id: 7,
    logoSrc: "/icons/mantine.jpg",
    slug: "mantine",
    title: "Mantine",
  },
  {
    description: "Headless UI components by Tailwind CSS Team",
    experiments: [
      { slug: "menu", title: "Menu" },
      { slug: "listbox", title: "Listbox" },
      { slug: "switch", title: "Switch" },
      { slug: "disclosure", title: "Disclosure" },
      { slug: "dialog", title: "Dialog" },
      { slug: "popover", title: "Popover" },
      { slug: "radio-group", title: "Radio Group" },
      { slug: "tabs", title: "Tabs" },
    ],
    id: 8,
    logoSrc: "/icons/headlessui.jpg",
    slug: "headless-ui",
    title: "Headless UI",
  },
  {
    description: "Headless UI for design system in React.js",
    experiments: [
      { slug: "accordion", title: "Accordion" },
      { slug: "alert-dialog", title: "Alert Dialog" },
      { slug: "checkbox", title: "Checkbox" },
      { slug: "collapsible", title: "Collapsible" },
      { slug: "dialog", title: "Dialog" },
      { slug: "dropdown-menu", title: "Dropdown Menu" },
      { slug: "hover-card", title: "Hover Card" },
      { slug: "popover", title: "Popover" },
      { slug: "radio-group", title: "Radio Group" },
      { slug: "scroll-area", title: "Scroll Area" },
      { slug: "select", title: "Select" },
      { slug: "slider", title: "Slider" },
      { slug: "switch", title: "Switch" },
      { slug: "toggle", title: "Toggle" },
      { slug: "toggle-group", title: "Toggle Group" },
      { slug: "toolbar", title: "Toolbar" },
      { slug: "tooltip", title: "Tooltip" },
      { slug: "toast", title: "Toast" },
      { slug: "tabs", title: "Tabs" },
    ],
    id: 9,
    logoSrc: "/icons/radixui.jpg",
    slug: "radix-ui",
    title: "Radix UI",
  },
  {
    description: "Random user interfaces explorations",
    experiments: [
      { slug: "notion-navbar", title: "Notion NavBar" },
      { slug: "times-table", title: "Times Table" },
      { slug: "inline-maki", title: "Inline Maki" },
      {
        slug: "masalah-to-feature",
        title: "Masalah Pelajar → HL Feature",
      },
      { slug: "task", title: "Task" },
      { slug: "yearly-interest", title: "Yearly Interest" },
      { slug: "input-list", title: "Input List" },
      { slug: "stopwatch", title: "Stopwatch" },
      { slug: "tools", title: "Tools" },
    ],
    id: 10,
    logoSrc: "/icons/radixui.jpg",
    slug: "ui-explorations",
    title: "UI Explorations",
  },
  {
    description: "Haris Lab user interfaces design systems",
    experiments: [
      { slug: "global-modal", title: "Global Modal" },
      { slug: "context-modal", title: "Context Modal" },
      { slug: "side-bar", title: "Side Bar" },
      { slug: "sidebar-hierarchy", title: "Sidebar Hierarchy" },
    ],
    id: 11,
    logoSrc: "/icons/harislab.svg",
    slug: "haris-lab",
    title: "Haris Lab",
  },
  {
    description: "A library of React Hooks, UI primitives, and more",
    experiments: [{ slug: "calendar", title: "Calendar" }],
    id: 12,
    logoSrc: "/icons/react-aria.jpg",
    slug: "react-aria",
    title: "React Aria",
  },
  {
    description: "The math typesetting library for the web",
    experiments: [{ slug: "basic", title: "Basic" }],
    id: 13,
    logoSrc: "/icons/KaTeX.jpg",
    slug: "katex",
    title: "KaTeX",
  },
  {
    description: "Headless UI for building tables & datagrids",
    experiments: [
      { slug: "basic", title: "Basic" },
      { slug: "column-group", title: "Column Group" },
    ],
    id: 14,
    logoSrc: "/icons/tanstack.jpg",
    slug: "react-table",
    title: "React Table",
  },
  {
    description: "Asynchronous state management for TS/JS",
    experiments: [{ slug: "basic", title: "Basic" }],
    id: 15,
    logoSrc: "/icons/tanstack.jpg",
    slug: "react-query",
    title: "React Query",
  },
  {
    description: "Interactive explorations of physical phenomena",
    experiments: [
      { slug: "units", title: "Besaran dan Satuan" },
      { slug: "electron-configuration", title: "Electron Configuration" },
      { slug: "motion-diagrams", title: "Diagram Kartesius Gerak" },
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
