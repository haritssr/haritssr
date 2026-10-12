import "server-only";
import type { Metadata } from "next";

import { createPageMetadata } from "@/utils/pageMetadata";

type ExperimentGroup = "chapters" | "tools";

export interface ExperimentEntry {
  readonly group?: ExperimentGroup;
  readonly description: string;
  readonly tags: readonly string[];
  /** ISO calendar dates (YYYY-MM-DD) tracked from the route history. */
  readonly createdAt: string;
  readonly hideBackButton?: boolean;
  readonly hideTitle?: boolean;
  readonly slug: string;
  readonly title: string;
  /** Append ISO calendar dates; preserve previous updates (one entry per day). */
  readonly updatedAt: readonly string[];
}

export interface ExperimentDomain {
  readonly groups?: readonly {
    readonly id: ExperimentGroup;
    readonly title: string;
  }[];
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
        description:
          "Compare static, relative, absolute, fixed, and sticky positioning.",
        tags: ["layout", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "apple-navbar",
        title: "Apple NavBar",
        description:
          "Recreate an Apple-inspired navigation bar with Tailwind utilities.",
        tags: ["navigation", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "blurry",
        title: "Blurry",
        description: "Explore blurred layers and translucent surfaces.",
        tags: ["visual-effects", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "floating-labels",
        title: "Floating Labels",
        description: "Move form labels as fields gain focus or contain text.",
        tags: ["forms", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "glowing-background",
        title: "Glowing Background",
        description: "Layer color and blur to create a glowing background.",
        tags: ["visual-effects", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "grid",
        title: "Grid",
        description: "Arrange content with CSS Grid and Tailwind utilities.",
        tags: ["layout", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "planetscale-navbar",
        title: "PlanetScale NavBar",
        description: "Explore a PlanetScale-inspired navigation layout.",
        tags: ["navigation", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "sidebar",
        title: "Sidebar",
        description: "Build a sidebar layout with Tailwind CSS.",
        tags: ["navigation", "layout"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "scrollbar",
        title: "Scrollbar",
        description: "Compare ways to style and contain scrollbars.",
        tags: ["scrolling", "css"],
        createdAt: "2026-09-25",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "youtube-thumbnail",
        title: "YouTube Thumbnail",
        description:
          "Compose a video-thumbnail layout with Tailwind utilities.",
        tags: ["layout", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "newspaper",
        title: "Newspaper",
        description: "Arrange a newspaper-inspired page with CSS layout tools.",
        tags: ["layout", "typography"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "centering-div",
        title: "Centering Div",
        description: "Compare techniques for centering content.",
        tags: ["layout", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "columns",
        title: "Columns",
        description: "Flow content through multiple CSS columns.",
        tags: ["layout", "css"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "tailwind-vs-apple-color",
        title: "Tailwind vs Apple Color",
        description: "Compare Tailwind and Apple-inspired color palettes.",
        tags: ["color", "design"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "feedback",
        title: "Feedback",
        description: "Explore the layout and controls of a feedback interface.",
        tags: ["forms", "design"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "grid-vs-column",
        title: "Grid vs. Columns",
        description: "Compare CSS Grid with multi-column content flow.",
        tags: ["layout", "css"],
        createdAt: "2026-09-27",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
    ],
    id: 1,
    logoSrc: "/icons/tailwindcss.svg",
    slug: "tailwind-css",
    title: "Tailwind CSS",
  },
  {
    description: "JavaScript library for building user interfaces",
    experiments: [
      {
        slug: "usestate-todo-list",
        title: "useState Todo List",
        description: "Add and manage a task list using local React state.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usestate-form",
        title: "useState Form",
        description: "Capture form values with useState.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usestate-object-form",
        title: "useState Object Form",
        description: "Update object-shaped form state immutably.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usestate-draggable-box",
        title: "useState Draggable Box",
        description: "Move a box by updating its position in React state.",
        tags: ["state", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usestate-reacting-to-input",
        title: "useState Reacting To Input",
        description:
          "Model typing, submitting, error, and success states in a form.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "useeffect-title",
        title: "useEffect Title",
        description: "Synchronize the document title with React state.",
        tags: ["effects", "browser-apis"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usecontext-dark-mode",
        title: "useContext Dark Mode",
        description: "Share a theme through React context.",
        tags: ["state", "color"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usememo-1",
        title: "useMemo 1",
        description: "Observe rendering and memoization in a React example.",
        tags: ["performance", "state"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "useimperativehandle",
        title: "useImperativeHandle",
        description: "Expose a controlled imperative interface through a ref.",
        tags: ["interaction", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usereducer-todo-list",
        title: "useReducer Todo List",
        description: "Manage task updates through reducer actions.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "usereducer-todo-list-immer",
        title: "useReducer Todo List Immer",
        description: "Combine a reducer with Immer for task-list updates.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "react-use-reducer-july-2026",
        title: "React useReducer July 2026",
        description:
          "Explore a reducer-driven interaction and state transitions.",
        tags: ["state", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "submit-form",
        title: "Submit Form",
        description: "Handle form submission and inspect the submitted values.",
        tags: ["forms", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "generic-select",
        title: "Generic Select",
        description: "Build a reusable select with TypeScript generics.",
        tags: ["forms", "typescript"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03", "2026-10-04"],
      },
      {
        slug: "searchable-product-data",
        title: "Searchable Product Data",
        description: "Filter product data with a search input.",
        tags: ["search", "tables"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "search-table",
        title: "Search Table",
        description: "Search and display matching table rows.",
        tags: ["search", "tables"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "search-books",
        title: "Search Books",
        description: "Find books by filtering a local dataset.",
        tags: ["search", "data"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "search-interpol",
        title: "Search Interpol",
        description: "Explore an interface for searching Interpol notice data.",
        tags: ["search", "data-fetching"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "functional-props",
        title: "Functional Props",
        description: "Pass behavior between components using function props.",
        tags: ["composition", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "edit-profile",
        title: "Edit Profile",
        description: "Switch between viewing and editing profile information.",
        tags: ["state", "forms"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-21", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "font-mixer",
        title: "Font Mixer",
        description:
          "Compare combinations of fonts in an interactive interface.",
        tags: ["typography", "design"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "counter",
        title: "Counter",
        description: "Increment and reset a counter using React state.",
        tags: ["state", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "react-wrap-balancer",
        title: "React Wrap Balancer",
        description: "Balance text wrapping with React Wrap Balancer.",
        tags: ["typography", "layout"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "modal-inside-modal",
        title: "Modal Inside Modal",
        description: "Explore nested dialogs and their interaction.",
        tags: ["overlays", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "confetti",
        title: "Confetti",
        description:
          "Render confetti that follows the size of the browser viewport.",
        tags: ["animation", "browser-apis"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "simple-search",
        title: "Simple Search",
        description: "Filter content with a simple controlled search field.",
        tags: ["search", "state"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "activity-demo",
        title: "Activity Demo",
        description:
          "Explore how React Activity preserves state while hiding content.",
        tags: ["state", "effects"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
    ],
    id: 2,
    logoSrc: "/icons/react.svg",
    slug: "react",
    title: "React",
  },
  {
    description: "The React framework for the web",
    experiments: [
      {
        slug: "router",
        title: "Router",
        description: "Compare native links with Next.js client navigation.",
        tags: ["navigation", "routing"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "swr",
        title: "SWR",
        description:
          "Fetch people with SWR and handle loading and request failures.",
        tags: ["data-fetching", "data"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "articles",
        title: "Articles",
        description:
          "Browse article detail routes generated from a local dataset.",
        tags: ["routing", "data"],
        hideTitle: true,
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "students",
        title: "Students",
        description:
          "Browse student detail routes generated from structured data.",
        tags: ["routing", "data"],
        hideTitle: true,
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "posts",
        title: "Posts",
        description: "Render Markdown posts through data-driven detail routes.",
        tags: ["routing", "content"],
        hideTitle: true,
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "next-13-image-local",
        title: "Next 13 Image Local",
        description:
          "Explore optimized rendering of local images with Next.js Image.",
        tags: ["images", "performance"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "next-13-image-remote",
        title: "Next 13 Image Remote",
        description:
          "Explore optimized rendering of remote images with Next.js Image.",
        tags: ["images", "performance"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
    ],
    id: 3,
    logoSrc: "/icons/nextjs.svg",
    slug: "nextjs",
    title: "Nextjs",
  },
  {
    description: "Native built-in browser API utilities exploration",
    experiments: [
      {
        slug: "clock",
        title: "Clock",
        description: "Display a clock using browser time and periodic updates.",
        tags: ["time", "browser-apis"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "number-game",
        title: "Number game",
        description: "Practice addition with a stateful number guessing game.",
        tags: ["mathematics", "interaction"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "inputs",
        title: "Inputs",
        description: "Compare native HTML input types and their behavior.",
        tags: ["forms", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "details",
        title: "Details",
        description: "Use native disclosure elements for expandable content.",
        tags: ["disclosure", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03", "2026-10-04"],
      },
      {
        slug: "select",
        title: "Select",
        description: "Explore the browser’s native select control.",
        tags: ["forms", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "description-list",
        title: "Description List",
        description: "Present terms and their descriptions with semantic HTML.",
        tags: ["content", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "figure",
        title: "Figure",
        description:
          "Group an illustration with its caption using semantic HTML.",
        tags: ["content", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "text-editing",
        title: "Text Editing",
        description: "Explore editable content and browser text interactions.",
        tags: ["forms", "browser-apis"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "youtube-embed",
        title: "YouTube Embed",
        description: "Embed a YouTube player inside a page.",
        tags: ["media", "html"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "intersection-observer-api",
        title: "Intersection Observer API",
        description: "React to elements entering or leaving the viewport.",
        tags: ["scrolling", "browser-apis"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "scroll-title",
        title: "Scroll Title",
        description: "Change the document title in response to scrolling.",
        tags: ["scrolling", "browser-apis"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "custom-scroll",
        title: "Custom Scroll",
        description: "Explore a customized scrollable region.",
        tags: ["scrolling", "css"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "different-css-styling",
        title: "Different CSS Styling",
        description: "Compare different CSS styling approaches.",
        tags: ["css", "design"],
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
    ],
    id: 4,
    logoSrc: "/icons/chrome.svg",
    slug: "browser",
    title: "Browser",
  },
  {
    description: "Random user interfaces explorations",
    experiments: [
      {
        slug: "notion-navbar",
        title: "Notion NavBar",
        description: "Explore a Notion-inspired navigation bar.",
        tags: ["navigation", "design"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "times-table",
        title: "Times Table",
        description: "Explore multiplication patterns in a times table.",
        tags: ["mathematics", "tables"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "inline-maki",
        title: "Inline Maki",
        description: "Explore an inline editing interface.",
        tags: ["forms", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "masalah-to-feature",
        title: "Masalah Pelajar → HL Feature",
        description:
          "Connect student problems to possible Haris Lab features in a graph.",
        tags: ["graphs", "learning"],
        createdAt: "2026-08-25",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "task",
        title: "Task",
        description:
          "Track daily tasks and time budgets in a local SQLite database.",
        tags: ["local-data", "time"],
        hideBackButton: true,
        hideTitle: true,
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03", "2026-10-04"],
      },
      {
        slug: "yearly-interest",
        title: "Yearly Interest",
        description: "Explore how interest changes an amount over time.",
        tags: ["mathematics", "visualization"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "input-list",
        title: "Input List",
        description: "Create and edit a list through form inputs.",
        tags: ["forms", "state"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "stopwatch",
        title: "Stopwatch",
        description: "Measure elapsed time with stopwatch controls.",
        tags: ["time", "interaction"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "tools",
        title: "Tools",
        description:
          "Record tools and their quantities in a local SQLite database.",
        tags: ["local-data", "forms"],
        createdAt: "2026-08-19",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03", "2026-10-04"],
      },
      {
        slug: "emoji-groups",
        title: "Emoji Groups",
        description: "Browse an atlas of emoji organized into groups.",
        tags: ["search", "content"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "corner-smoothing",
        title: "Corner Smoothing: CSS vs Lisse",
        description:
          "Compare rounded corners, native CSS squircles, and Lisse curves.",
        tags: ["css", "design"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "external-link-icons",
        title: "External Link Icons",
        description:
          "Compare minimal arrows, chevrons, and exit markers for external links.",
        tags: ["icons", "design", "interaction"],
        createdAt: "2026-10-03",
        updatedAt: ["2026-10-03", "2026-10-11"],
      },
    ],
    id: 10,
    logoSrc: "/icons/radixui.svg",
    slug: "ui-explorations",
    title: "UI Explorations",
  },
  {
    description: "Interactive explorations of physical phenomena",
    experiments: [
      {
        slug: "physical-quantities-and-units",
        title: "Physical Quantities and Units",
        description:
          "Explore SI units, physical quantities, and the formulas that connect them.",
        tags: ["mathematics", "graphs"],
        createdAt: "2026-09-20",
        updatedAt: [
          "2026-09-27",
          "2026-10-02",
          "2026-10-03",
          "2026-10-04",
          "2026-10-06",
          "2026-10-11",
        ],
      },
      {
        slug: "electron-configuration",
        title: "Electron Configuration",
        description:
          "Build electron configurations by filling atomic orbitals.",
        tags: ["atomic-physics", "visualization"],
        createdAt: "2026-09-23",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-11",
        ],
      },
      {
        slug: "motion-diagrams",
        title: "Motion Diagrams",
        description:
          "Explore velocity-time graphs for linear and circular motion.",
        tags: ["mechanics", "visualization"],
        createdAt: "2026-09-25",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-11",
        ],
      },
      {
        slug: "atomic-orbitals",
        title: "Atomic Orbitals",
        description:
          "Explore orbital shapes, electron probability, and the nodes between them.",
        tags: ["atomic-physics", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-06", "2026-10-11"],
      },
      {
        slug: "magnetic-suspension",
        title: "Magnetic Suspension",
        description:
          "Balance magnetic attraction, string tension, and gravity.",
        tags: ["magnetism", "mechanics", "visualization"],
        createdAt: "2026-10-11",
        updatedAt: ["2026-10-11"],
      },
      {
        slug: "projectile-motion",
        title: "Projectile Motion",
        description:
          "Explore launch angles, parabolic paths, flight time, and range.",
        tags: ["mechanics", "kinematics", "visualization", "learning"],
        createdAt: "2026-10-12",
        updatedAt: ["2026-10-12"],
      },
      {
        slug: "double-slit-interference",
        title: "Double-Slit Interference",
        description:
          "See how light and slit spacing shape an interference pattern.",
        tags: ["waves", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-11",
        ],
      },
      {
        slug: "essential-physics-equations",
        hideTitle: true,
        title: "Essential Physics Equations",
        description:
          "Find key physics equations with variable meanings and SI units.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-09-30",
        updatedAt: [
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-11",
          "2026-10-12",
        ],
      },
    ],
    id: 16,
    logoSrc: "/icons/physics.svg",
    slug: "physics",
    title: "Physics",
  },
  {
    description: "Interactive math lessons and experiments",
    groups: [
      { id: "chapters", title: "Chapters" },
      { id: "tools", title: "Tools" },
    ],
    experiments: [
      {
        slug: "katex-basics",
        group: "tools",
        title: "KaTeX Basics",
        description: "Render inline and display math with KaTeX.",
        tags: ["mathematics", "typography"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "live-playground",
        group: "tools",
        title: "Live Playground",
        description: "Write TeX and preview equations as you type.",
        tags: ["mathematics", "editor"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "matrix-builder",
        group: "tools",
        title: "Matrix Builder",
        description: "Edit a matrix and generate its TeX notation.",
        tags: ["mathematics", "forms"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "derivation-stepper",
        group: "tools",
        title: "Derivation Stepper",
        description:
          "Solve a quadratic equation by completing the square, one step at a time.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "piecewise-functions",
        group: "chapters",
        title: "Piecewise Functions",
        description:
          "Explore 13 piecewise functions with interactive graphs and values.",
        tags: ["mathematics", "visualization"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "equation-annotations",
        group: "tools",
        title: "Equation Annotations",
        description:
          "Explain equation terms with color, boxes, and labels in KaTeX.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-11"],
      },
      {
        slug: "math-notation",
        group: "tools",
        title: "Math Notation",
        description:
          "Learn what KaTeX can render and when math needs other tools.",
        tags: ["notation", "katex", "learning"],
        createdAt: "2026-10-10",
        updatedAt: ["2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "high-school-symbols",
        group: "tools",
        title: "High School Symbols",
        description:
          "Cari simbol matematika dan fisika SMA, beserta arti dan contohnya.",
        tags: ["notation", "katex", "physics", "learning", "indonesia"],
        createdAt: "2026-10-10",
        updatedAt: ["2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "circle",
        group: "chapters",
        title: "Circle",
        description:
          "Explore circle measurements with an interactive diagram and worked examples.",
        tags: ["geometry", "circles", "learning", "visualization"],
        createdAt: "2026-10-10",
        updatedAt: ["2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "polinomial",
        group: "chapters",
        title: "Polinomial",
        description:
          "Latihan 27 soal polinomial dengan petunjuk dan pembahasan bertahap.",
        tags: ["algebra", "polynomials", "equations", "learning"],
        createdAt: "2026-10-08",
        updatedAt: ["2026-10-08", "2026-10-11"],
      },
      {
        slug: "euler",
        group: "chapters",
        title: "Euler",
        description:
          "Explore Euler’s identity through a rotating unit circle and a guided derivation.",
        tags: ["complex-numbers", "trigonometry", "exponents", "visualization"],
        createdAt: "2026-10-07",
        updatedAt: ["2026-10-07", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "logarithms",
        group: "chapters",
        title: "Logarithms",
        description:
          "Explore logarithm rules, graphs, and their connection to exponents.",
        tags: ["algebra", "logarithms", "exponents", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06", "2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "spltv",
        group: "chapters",
        title: "SPLTV",
        description:
          "Solve three-variable linear systems and compare their possible solutions.",
        tags: ["algebra", "equations", "linear-algebra"],
        createdAt: "2026-10-06",
        updatedAt: [
          "2026-10-06",
          "2026-10-07",
          "2026-10-10",
          "2026-10-11",
          "2026-10-12",
        ],
      },
      {
        slug: "number-systems",
        group: "chapters",
        title: "Number Systems",
        description:
          "Explore number sets, intervals, and inequalities on an interactive number line.",
        tags: ["foundations", "sets", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06", "2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "quadratic-equations",
        group: "chapters",
        title: "Quadratic Equations",
        description:
          "Solve quadratic equations and see how their roots shape a parabola.",
        tags: ["algebra", "equations", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06", "2026-10-10", "2026-10-11", "2026-10-12"],
      },
      {
        slug: "limits",
        group: "chapters",
        title: "Limits",
        description:
          "Explore one-sided limits, holes, and jumps with an interactive graph.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-10",
          "2026-10-11",
        ],
      },
      {
        slug: "derivatives",
        group: "chapters",
        title: "Derivatives",
        description:
          "See how secant lines become tangents and explore the slope of a curve.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-10",
          "2026-10-11",
        ],
      },
      {
        slug: "integrals",
        group: "chapters",
        title: "Integrals",
        description:
          "Explore definite integrals through rectangles, signed area, and antiderivatives.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: [
          "2026-09-29",
          "2026-10-02",
          "2026-10-03",
          "2026-10-06",
          "2026-10-10",
          "2026-10-11",
        ],
      },
    ],
    id: 17,
    logoSrc: "/icons/math.svg",
    slug: "mathematics",
    title: "Mathematics",
  },
];

export type ExperimentDomainData = ExperimentDomain;

/** Latest known update, regardless of history order; falls back to creation. */
export function getLatestExperimentUpdate(experiment: ExperimentEntry): string {
  let latest = experiment.createdAt;
  for (const date of experiment.updatedAt) {
    if (date > latest) {
      latest = date;
    }
  }
  return latest;
}

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
  return createPageMetadata({
    title: `${domain.title} Experiments`,
    description: domain.description,
    path: `/experiments/${domain.slug}`,
  });
}

export function getExperimentMetadata(
  domainSlug: string,
  experimentSlug: string,
  overrides: { description?: string } = {}
): ReturnType<typeof createPageMetadata> {
  const domain = getExperimentDomain(domainSlug);
  const experiment = getExperiment(domainSlug, experimentSlug);
  return createPageMetadata({
    title: `${experiment.title} | ${domain.title} Experiments`,
    description: overrides.description ?? experiment.description,
    path: `/experiments/${domainSlug}/${experimentSlug}`,
  });
}
