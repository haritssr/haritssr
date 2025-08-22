// The way this data works is under topic is always one level deep of content, no second level and so on.
// You can't using '-' in {name: 'Can't using '-' here'}, or the url will be like this '---'
// The system will automatically adding '-' to space inside name
// It is used in all experiments routes, for displaying and routing
// Every pages should be .tsx extentions, if not, <source/> in <LayoutToExperiments/> won't work

export const ExperimentsData = [
	{
		id: 1,
		title: "Tailwind CSS",
		logoSrc: "/Icons/tailwindcss.jpg",
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
		logoSrc: "/Icons/react.jpg",
		description: "JavaScript library for building user interfaces",
		links: [
			"useState Todo List",
			"useState Form",
			"useState Object Form",
			"useState Draggable Box",
			"useState Reacting To Input",
			"useEffect Title",
			"useContext 1",
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
		logoSrc: "/Icons/nextjs.jpg",
		description: "The React framework for the web",
		links: [
			"Router",
			"SWR",
			"Articles",
			"Students",
			"Posts",
			"Next 13 Image Local",
			"Next 13 Image Remote",
		],
	},
	{
		id: 4,
		title: "Browser",
		logoSrc: "/Icons/chrome.jpg",
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
		logoSrc: "/Icons/VisX.jpg",
		description: "Data visualization using React.js",
		links: ["Bar Chart", "Pie Chart"],
	},
	{
		id: 7,
		title: "Mantine",
		logoSrc: "/Icons/mantine.jpg",
		description: "A fully featured React component libray",
		links: ["Carousel"],
	},
	{
		id: 8,
		title: "Headless UI",
		logoSrc: "/Icons/headlessui.jpg",
		description: "Headless UI components by Tailwind CSS Team",
		links: [
			"Menu",
			"Listbox",
			"Switch",
			"Disclosure",
			"Dialog",
			"Popover",
			"Radio Group",
			"Tabs",
			"Combobox ExperimentsData",
			"Combobox HeadlessUIData",
		],
	},
	{
		id: 9,
		title: "Radix UI",
		logoSrc: "/Icons/radixui.jpg",
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
		logoSrc: "/Icons/radixui.jpg",
		description: "Random user interfaces explorations",
		links: ["Notion NavBar"],
	},
	{
		id: 11,
		title: "Haris Lab",
		logoSrc: "/Icons/harislab.svg",
		description: "Haris Lab user interfaces design systems",
		links: ["Global Modal", "Context Modal", "Side Bar", "Sidebar Hierarchy"],
	},
	{
		id: 12,
		title: "React Aria",
		logoSrc: "/Icons/react-aria.jpg",
		description: "A library of React Hooks, UI primitives, and more",
		links: ["Calendar"],
	},
	{
		id: 13,
		title: "KaTeX",
		logoSrc: "/Icons/KaTeX.jpg",
		description: "The math typesetting library for the web",
		links: ["Basic"],
	},
	{
		id: 14,
		title: "React Table",
		logoSrc: "/Icons/tanstack.jpg",
		description: "Headless UI for building tables & datagrids",
		links: [
			"Basic",
			"Column Group",
			"Column Ordering",
			"Column Ordering DnD",
			"Column Pinning",
			"Column Visibility",
		],
	},
	{
		id: 15,
		title: "React Query",
		logoSrc: "/Icons/tanstack.jpg",
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
export const FramerMotionData = ExperimentsData[5];
export const MantineData = ExperimentsData[6];
export const HeadlessUIData = ExperimentsData[7];
export const RadixUIData = ExperimentsData[8];
export const UIExplorationData = ExperimentsData[9];
export const HarisLabData = ExperimentsData[10];
export const ReactAriaData = ExperimentsData[11];
export const KaTeXData = ExperimentsData[12];
export const ReactTableData = ExperimentsData[13];
export const ReactQueryData = ExperimentsData[14];
