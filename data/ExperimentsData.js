// The way this data works is under topic is always one level deep of content, no second level and so on.
// You can't using '-' in {name: 'Can't using '-' here'}, or the url will be like this '---'
// The system will automatically adding '-' to space inside name
// It is used in all experiments routes, for displaying and routing
// Every pages should be .tsx extentions, if not, <source/> in <LayoutToExperiments/> won't work

export const ExperimentsData = [
  {
    id: 1,
    title: 'Tailwind CSS',
    logoSrc: '/icons/tailwindcss.png',
    description:
      'These are my exploration of using atomic CSS like Tailwind CSS for building user interface. I really like Tailwind CSS because it solve separation of concern problem, the API really easy to use, the documentation is really good, and the future of the framework are promising. All projects on this website use tailwind including Haris Lab, Haris Studio, haritssr.com, and AKA Trading Indonesia.',
    links: [
      'Position',
      'Apple NavBar',
      'Blurry',
      'Floating Labels',
      'Glowing Background',
      'Grid',
      'PlanetScale NavBar',
      'Sidebar',
      'YouTube Thumbnail',
      'Newspaper',
      'Centering Div',
      'Columns',
      'Tailwind vs Apple Color',
      'Feedback',
    ],
  },
  {
    id: 2,
    title: 'React',
    logoSrc: '/icons/reactjs.ico',
    description:
      'React.js are javascript library for building user interface on web or mobile, but for me i just using it for web, whether is mobile web or desktop web. React.js have a lot of API like Hooks and component API.',
    links: [
      'useState Todo List',
      'useState Form',
      'useState Object Form',
      'useState Draggable Box',
      'useState Reacting To Input',
      'useEffect Title',
      'useContext 1',
      'useContext Dark Mode',
      'useMemo 1',
      'useImperativeHandle',
      'useReducer Todo List',
      'useReducer Todo List Immer',
      'Submit Form',
      'Generic Select',
      'Searchable Product Data',
      'Search Table',
      'Search Books',
      'Search Interpol',
      'Functional Props',
      'Edit Profile',
      'forwardRefExample',
      'Font Mixer',
    ],
  },
  {
    id: 3,
    title: 'Nextjs',
    logoSrc: '/icons/nextjs.ico',
    description:
      'These are my exploration and implementation of Next.js API, from data fetching, image optimization, rendering method, routing, and others, which usually different from just React.js',
    links: ['Image Components', 'Router', 'Dynamic Pages', 'SWR', 'Articles', 'Students', 'Posts'],
  },
  {
    id: 4,
    title: 'Browser',
    logoSrc: '/icons/chrome.svg',
    description:
      'These are my exploration of native built-in browser API, from UI, optimization, text-editing,  multimedia, and others.',
    links: [
      'Clock',
      'Number game',
      'Inputs',
      'Details',
      'Select',
      'Description List',
      'Figure',
      'Text Editing',
      'YouTube Embed',
      'Intersection Observer API',
      'Scroll Title',
      'Custom Scroll',
      'Different CSS Styling',
    ],
  },
  {
    id: 5,
    title: 'VisX',
    logoSrc: '/icons/visx.png',
    description:
      'VisX are data vizualitaion library specially made for react that made by Airbnb, used by them, and maintine by them. Below are my exploration of these library. The library are very rich and have so many combination of possibility of layout that we can made. It is actually fun to try every one of them, since Data Visualization will never be die, there are always innovation on them.',
    links: ['Bar Chart', 'Pie Chart'],
  },

  {
    id: 6,
    title: 'Framer Motion',
    logoSrc: '/icons/framermotion.png',
    description:
      'These are my exploration and implementation of web animation from library Framer Motion which is specially to react.',
    links: ['Random'],
  },
  {
    id: 7,
    title: 'Mantine',
    logoSrc: '/icons/mantine.svg',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Mantine, each pages might have more than one example since I tried manipulating one thing in many ways. My implementation using Tailwind CSS or Emotion CSS-in-JS.',
    links: ['Carousel'],
  },
  {
    id: 8,
    title: 'Headless UI',
    logoSrc: '/icons/headlessui.png',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Headless UI, each pages might have more than one example since I might tried manipulating one thing in many ways. The styling using Tailwind CSS.',
    links: [
      'Menu',
      'Listbox',
      'Switch',
      'Disclosure',
      'Dialog',
      'Popover',
      'Radio Group',
      'Tabs',
      'Combobox ExperimentsData',
      'Combobox HeadlessUIData',
    ],
  },
  {
    id: 9,
    title: 'Radix UI',
    logoSrc: '/icons/radixui.png',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Radix UI, each pages might have more than one example since I tried manipulating one thing in many ways. The styling using Tailwind CSS after changing from Stitches.',
    links: [
      'Accordion',
      'Alert Dialog',
      'Checkbox',
      'Collapsible',
      'Context Menu',
      'Dialog',
      'Dropdown Menu',
      'Hover Card',
      'Navigation Menu',
      'Popover',
      'Progress',
      'Radio Group',
      'Scroll Area',
      'Select',
      'Slider',
      'Switch',
      'Toggle',
      'Toggle Group',
      'Toolbar',
      'Tooltip',
      'Toast',
    ],
  },
  {
    id: 10,
    title: 'Sandpack',
    logoSrc: '/icons/sandpack.ico',
    description: 'Live code editor',
    links: ['Example 1'],
  },

  {
    id: 11,
    title: 'Notion API',
    logoSrc: '/icons/notion.png',
    description:
      'Notion as a Free CMS, we can connect notion app to any web service via their Notion API to built unique possible application.',
    links: ['Table'],
  },

  {
    id: 12,
    title: 'UI Explorations',
    logoSrc: '/icons/radixui.png',
    description: 'UI Explorations',
    links: ['Notion NavBar'],
  },
  {
    id: 13,
    title: 'Emotion',
    logoSrc: '/icons/emotion.png',
    description: 'Styling',
    links: ['Example 1', 'Example 2'],
  },
  {
    id: 14,
    title: 'React Aria',
    logoSrc: '/icons/react-aria.png',
    description: 'UI Components Library',
    links: ['Calendar', 'Range Calendar'],
  },
  {
    id: 15,
    title: 'KaTeX',
    logoSrc: '/icons/KaTeX.png',
    description: 'Math Symbols',
    links: ['Basic'],
  },
  {
    id: 16,
    title: 'React Table',
    logoSrc: '/icons/KaTeX.png',
    description: 'Table',
    links: [
      'Basic',
      'Column Group',
      'Column Ordering',
      'Column Ordering DnD',
      'Column Pinning',
      'Column Sizing',
      'Column Visibility',
    ],
  },
  {
    id: 17,
    title: 'React Query',
    logoSrc: '/icons/KaTeX.png',
    description:
      'Fetching, caching, synchronizing and updating server state in your React applications.',
    links: ['Basic'],
  },
  {
    id: 18,
    title: 'Haris Lab',
    logoSrc: '/icons/KaTeX.png',
    description: 'Haris Lab Components',
    links: ['Global Modal', 'Context Modal', 'Side Bar'],
  },
];

// console.log(sizeof(ExperimentsData));
