// The way this data works is under topic is always one level deep of content, no second level and so on.
// You can't using '-' in {name: 'Can't using '-' here'}, or the url will be like this '---'
// The system will automatically adding '-' to space inside name
// It is used in all experiments routes, for displaying and routing
// Every pages should be .tsx extentions, if not, <source/> in <LayoutToExperiments/> won't work

export const ExperimentsData = [
  {
    id: 1,
    title: "Tailwind CSS",
    logoSrc: "/icons/tailwindcss.jpg",
    description: "CSS library for styling websites",
    links: [
      "Position",
      "Apple NavBar",
      "Blurry",
      "Floating Labels",
      "Glowing Background",
      "Grid",
      "PlanetScale NavBar",
      "Sidebar",
      "YouTube Thumbnail",
      "Newspaper",
      "Centering Div",
      "Columns",
      "Tailwind vs Apple Color",
      "Feedback",
    ],
  },
  {
    id: 2,
    title: "React",
    logoSrc: "/icons/react.jpg",
    description: "JavaScript library for building user interfaces",
    links: [
      "useState Todo List",
      "useState Form",
      "useState Object Form",
      "useState Draggable Box",
      "useState Reacting To Input",
      "useEffect Title",
      "useContext Dark Mode",
      "useMemo 1",
      "useImperativeHandle",
      "useReducer Todo List",
      "useReducer Todo List Immer",
      "Submit Form",
      "Generic Select",
      "Searchable Product Data",
      "Search Table",
      "Search Books",
      "Search Interpol",
      "Functional Props",
      "Edit Profile",
      "forwardRefExample",
      "Font Mixer",
      "Counter",
      "React Wrap Balancer",
      "Modal Inside Modal",
      "Confetti",
    ],
  },
  {
    id: 3,
    title: "Nextjs",
    logoSrc: "/icons/nextjs.jpg",
    description: "The React framework for the web",
    links: [
      "Router",
      "SWR",
      "Articles",
      "Students",
      "Posts",
      "Next 13 Image Local",
      "Next 13 Image Remote",
      "Learn API Route",
    ],
  },
  {
    id: 4,
    title: "Browser",
    logoSrc: "/icons/chrome.jpg",
    description: "Native built-in browser API utilities exploration",
    links: [
      "Clock",
      "Number game",
      "Inputs",
      "Details",
      "Select",
      "Description List",
      "Figure",
      "Text Editing",
      "YouTube Embed",
      "Intersection Observer API",
      "Scroll Title",
      "Custom Scroll",
      "Different CSS Styling",
    ],
  },
  {
    id: 5,
    title: "VisX",
    logoSrc: "/icons/VisX.jpg",
    description: "Data visualization using React.js",
    links: ["Bar Chart", "Pie Chart"],
  },
  {
    id: 7,
    title: "Mantine",
    logoSrc: "/icons/mantine.jpg",
    description: "A fully featured React component libray",
    links: ["Carousel"],
  },
  {
    id: 8,
    title: "Headless UI",
    logoSrc: "/icons/headlessui.jpg",
    description: "Headless UI components by Tailwind CSS Team",
    links: ["Menu", "Listbox", "Switch", "Disclosure", "Dialog", "Popover", "Radio Group", "Tabs"],
  },
  {
    id: 9,
    title: "Radix UI",
    logoSrc: "/icons/radixui.jpg",
    description: "Headless UI for design system in React.js",
    links: [
      "Accordion",
      "Alert Dialog",
      "Checkbox",
      "Collapsible",
      "Dialog",
      "Dropdown Menu",
      "Hover Card",
      "Popover",
      "Radio Group",
      "Scroll Area",
      "Select",
      "Slider",
      "Switch",
      "Toggle",
      "Toggle Group",
      "Toolbar",
      "Tooltip",
      "Toast",
      "Tabs",
    ],
  },

  {
    id: 10,
    title: "UI Explorations",
    logoSrc: "/icons/radixui.jpg",
    description: "Random user interfaces explorations",
    links: [
      "Notion NavBar",
      "Pure",
      "Times Table",
      "Inline Maki",
      "Task",
      "Yearly Interest",
      "Input List",
      "Stopwatch",
    ],
  },
  {
    id: 11,
    title: "Haris Lab",
    logoSrc: "/icons/harislab.svg",
    description: "Haris Lab user interfaces design systems",
    links: ["Global Modal", "Context Modal", "Side Bar", "Sidebar Hierarchy"],
  },
  {
    id: 12,
    title: "React Aria",
    logoSrc: "/icons/react-aria.jpg",
    description: "A library of React Hooks, UI primitives, and more",
    links: ["Calendar"],
  },
  {
    id: 13,
    title: "KaTeX",
    logoSrc: "/icons/KaTeX.jpg",
    description: "The math typesetting library for the web",
    links: ["Basic"],
  },
  {
    id: 14,
    title: "React Table",
    logoSrc: "/icons/tanstack.jpg",
    description: "Headless UI for building tables & datagrids",
    links: ["Basic", "Column Group"],
  },
  {
    id: 15,
    title: "React Query",
    logoSrc: "/icons/tanstack.jpg",
    description: "Asynchronous state management for TS/JS",
    links: ["Basic"],
  },
];

// console.log(sizeof(ExperimentsData));

export type ExperimentsData = (typeof ExperimentsData)[0];

export const TailwindCSSData = ExperimentsData[0];
export const ReactData = ExperimentsData[1];
export const NextjsData = ExperimentsData[2];
export const BrowserData = ExperimentsData[3];
export const VisXData = ExperimentsData[4];
export const MantineData = ExperimentsData[5];
export const HeadlessUIData = ExperimentsData[6];
export const RadixUIData = ExperimentsData[7];
export const UIExplorationData = ExperimentsData[8];
export const HarisLabData = ExperimentsData[9];
export const ReactAriaData = ExperimentsData[10];
export const KaTeXData = ExperimentsData[11];
export const ReactTableData = ExperimentsData[12];
export const ReactQueryData = ExperimentsData[13];
