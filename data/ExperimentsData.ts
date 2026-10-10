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
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
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
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "students",
        title: "Students",
        description:
          "Browse student detail routes generated from structured data.",
        tags: ["routing", "data"],
        hideTitle: true,
        createdAt: "2026-02-04",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
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
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
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
    description: "Data visualization using React.js",
    experiments: [
      {
        slug: "bar-chart",
        title: "Bar Chart",
        description:
          "Explore letter frequencies with an interactive Visx bar chart.",
        tags: ["charts", "visualization"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-27", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "pie-chart",
        title: "Pie Chart",
        description: "Render proportional data as a Visx pie chart.",
        tags: ["charts", "visualization"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
    ],
    id: 5,
    logoSrc: "/icons/visx.svg",
    slug: "visx",
    title: "VisX",
  },
  {
    description: "Haris Lab user interfaces design systems",
    experiments: [
      {
        slug: "global-modal",
        title: "Global Modal",
        description: "Explore a shared modal interface for Haris Lab.",
        tags: ["overlays", "composition"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "context-modal",
        title: "Context Modal",
        description: "Control a modal through shared context.",
        tags: ["overlays", "state"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "side-bar",
        title: "Side Bar",
        description: "Explore the Haris Lab sidebar navigation.",
        tags: ["navigation", "layout"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "sidebar-hierarchy",
        title: "Sidebar Hierarchy",
        description: "Navigate a hierarchy of nested sidebar items.",
        tags: ["navigation", "trees"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
      },
    ],
    id: 11,
    logoSrc: "/icons/harimaki.svg",
    slug: "haris-lab",
    title: "Haris Lab",
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
        updatedAt: ["2026-09-26", "2026-10-02", "2026-10-03"],
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
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "corner-smoothing",
        title: "Corner Smoothing: CSS vs Lisse",
        description:
          "Compare rounded corners, native CSS squircles, and Lisse curves.",
        tags: ["css", "design"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "external-link-icons",
        title: "External Link Icons",
        description:
          "Compare minimal arrows, chevrons, and exit markers for external links.",
        tags: ["icons", "design", "interaction"],
        createdAt: "2026-10-03",
        updatedAt: ["2026-10-03"],
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
          "Explore SI quantities, units, formulas, and their prerequisite graph.",
        tags: ["mathematics", "graphs"],
        createdAt: "2026-09-20",
        updatedAt: [
          "2026-09-27",
          "2026-10-02",
          "2026-10-03",
          "2026-10-04",
          "2026-10-06",
        ],
      },
      {
        slug: "electron-configuration",
        title: "Electron Configuration",
        description:
          "Fill atomic orbitals and inspect electron configurations and quantum numbers.",
        tags: ["atomic-physics", "visualization"],
        createdAt: "2026-09-23",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "motion-diagrams",
        title: "Motion Diagrams",
        description:
          "Compare motion through interactive position and velocity diagrams.",
        tags: ["mechanics", "visualization"],
        createdAt: "2026-09-25",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "atomic-orbitals",
        title: "Atomic Orbitals",
        description:
          "Explore atomic wavefunctions, probability distributions, and orbital shapes.",
        tags: ["atomic-physics", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "double-slit-interference",
        title: "Double-Slit Interference",
        description:
          "Change wavelength and slit geometry to explore interference fringes.",
        tags: ["waves", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "essential-physics-equations",
        title: "Essential Physics Equations",
        description:
          "Read key physics equations with variable definitions, units, and sources.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-09-30",
        updatedAt: ["2026-10-02", "2026-10-03", "2026-10-06"],
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
        description:
          "Render standalone and inline mathematical notation with KaTeX.",
        tags: ["mathematics", "typography"],
        createdAt: "2026-08-18",
        updatedAt: ["2026-09-20", "2026-10-02", "2026-10-03"],
      },
      {
        slug: "live-playground",
        group: "tools",
        title: "Live TeX Playground",
        description:
          "Edit TeX, try templates, and preview mathematical notation live.",
        tags: ["mathematics", "editor"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "matrix-builder",
        group: "tools",
        title: "Matrix Builder",
        description: "Edit matrix entries and generate the corresponding TeX.",
        tags: ["mathematics", "forms"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "derivation-stepper",
        group: "chapters",
        title: "Step-by-Step Derivation",
        description:
          "Follow a quadratic equation through completing-the-square steps.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "piecewise-functions",
        group: "chapters",
        title: "Piecewise Functions",
        description:
          "Compare thirteen piecewise functions and their evaluated graphs.",
        tags: ["mathematics", "visualization"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "equation-annotations",
        group: "tools",
        title: "Equation Annotations",
        description:
          "Annotate terms in Newton’s second law using TeX decorations.",
        tags: ["mathematics", "learning"],
        createdAt: "2026-10-02",
        updatedAt: ["2026-10-02", "2026-10-03"],
      },
      {
        slug: "math-notation",
        group: "tools",
        title: "Math Notation on the Web",
        description:
          "See which high-school math expressions KaTeX can typeset, and when graphs, diagrams, or calculations need other tools.",
        tags: ["notation", "katex", "learning"],
        createdAt: "2026-10-10",
        updatedAt: ["2026-10-10"],
      },
      {
        slug: "circle",
        group: "chapters",
        title: "Circle",
        description:
          "Explore radius, diameter, circumference, area, arcs, and sectors with an interactive circle and worked examples.",
        tags: ["geometry", "circles", "learning", "visualization"],
        createdAt: "2026-10-10",
        updatedAt: ["2026-10-10"],
      },
      {
        slug: "polinomial",
        group: "chapters",
        title: "Polinomial",
        description:
          "Latihan 27 soal polinomial dengan tabel koefisien, pengelompokan suku, petunjuk bertahap, pembahasan, dan progres yang tersimpan di browser.",
        tags: ["algebra", "polynomials", "equations", "learning"],
        createdAt: "2026-10-08",
        updatedAt: ["2026-10-08"],
      },
      {
        slug: "euler-s-identity",
        group: "chapters",
        title: "Euler’s Identity",
        description:
          "Connect exponential growth, circle geometry, and imaginary numbers through Euler’s formula, an interactive unit circle, and a step-by-step derivation of Euler’s identity.",
        tags: ["complex-numbers", "trigonometry", "exponents", "visualization"],
        createdAt: "2026-10-07",
        updatedAt: ["2026-10-07"],
      },
      {
        slug: "logarithms",
        group: "chapters",
        title: "Logarithms",
        description:
          "Understand logarithms, derive their rules, and explore logarithmic graphs and their exponential inverses.",
        tags: ["algebra", "logarithms", "exponents", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06"],
      },
      {
        slug: "system-of-linear-equations-in-three-variables",
        group: "chapters",
        title: "System of Linear Equations in Three Variables",
        description:
          "Solve three-variable linear systems with elimination, explore exact row operations, and distinguish unique, infinite, and no-solution cases.",
        tags: ["algebra", "equations", "linear-algebra"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06", "2026-10-07"],
      },
      {
        slug: "number-systems",
        group: "chapters",
        title: "Number Systems",
        description:
          "Explore number sets with a Venn diagram and connect inequalities, interval notation, and an interactive number line.",
        tags: ["foundations", "sets", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06"],
      },
      {
        slug: "quadratic-equations",
        group: "chapters",
        title: "Quadratic Equations",
        description:
          "Learn factoring, completing the square, and the quadratic formula with an interactive root graph.",
        tags: ["algebra", "equations", "visualization"],
        createdAt: "2026-10-06",
        updatedAt: ["2026-10-06"],
      },
      {
        slug: "limits",
        group: "chapters",
        title: "Limits",
        description:
          "Explore how a function behaves as its input approaches a value.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "derivatives",
        group: "chapters",
        title: "Derivatives",
        description: "Connect the derivative to the slope of a curve.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
      },
      {
        slug: "integrals",
        group: "chapters",
        title: "Integrals",
        description: "Explore accumulation and the area beneath a curve.",
        tags: ["calculus", "visualization"],
        createdAt: "2026-09-29",
        updatedAt: ["2026-09-29", "2026-10-02", "2026-10-03", "2026-10-06"],
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
