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
      { name: 'Position' },
      { name: 'Apple NavBar' },
      { name: 'Blurry' },
      { name: 'Dark Mode' },
      { name: 'Floating Labels' },
      { name: 'Glowing Background' },
      { name: 'Grid' },
      { name: 'PlanetScale NavBar' },
      { name: 'Sidebar' },
      { name: 'YouTube Thumbnail' },
      { name: 'Newspaper' },
      { name: 'Centering Div' },
      { name: 'Columns' },
    ],
  },
  {
    id: 2,
    title: 'React',
    logoSrc: '/icons/reactjs.ico',
    description:
      'React.js are javascript library for building user interface on web or mobile, but for me i just using it for web, whether is mobile web or desktop web. React.js have a lot of API like Hooks and component API.',
    links: [
      { name: 'useState Form' },
      { name: 'useEffect Title' },
      { name: 'Object State Form' },
      { name: 'Submit Form' },
      { name: 'Generic Select' },
      { name: 'Searchable Product Data' },
      { name: 'Search Table' },
      { name: 'Search Books' },
      { name: 'Search Interpol' },
      { name: 'Functional Props' },
      { name: 'TodoList useState' },
      { name: 'TodoList useReducer' },
      { name: 'useState Draggable Box' },
      { name: 'useContext Dark Mode' },
      { name: 'Reacting To Input' },
      { name: 'Edit Profile' },
      { name: 'useContextExample' },
      { name: 'forwardRefExample' },
      { name: 'useImperativeHandle' },
      { name: 'useMemoExample' },
      { name: 'Font Mixer' },
    ],
  },
  {
    id: 3,
    title: 'Nextjs',
    logoSrc: '/icons/nextjs.ico',
    description:
      'These are my exploration and implementation of Next.js API, from data fetching, image optimization, rendering method, routing, and others, which usually different from just React.js',
    links: [
      { name: 'Image Components' },
      { name: 'Router' },
      { name: 'Dynamic Pages' },
      { name: 'SWR' },
      { name: 'Articles' },
      { name: 'Students' },
      { name: 'Posts' },
    ],
  },
  {
    id: 4,
    title: 'Browser',
    logoSrc: '/icons/chrome.svg',
    description:
      'These are my exploration of native built-in browser API, from UI, optimization, text-editing,  multimedia, and others.',
    links: [
      { name: 'Clock' },
      { name: 'Number game' },
      { name: 'Inputs' },
      { name: 'Details' },
      { name: 'Select' },
      { name: 'Description List' },
      { name: 'Figure' },
      { name: 'Text Editing' },
      { name: 'YouTube Embed' },
      { name: 'Intersection Observer API' },
      { name: 'Scroll Title' },
    ],
  },
  {
    id: 5,
    title: 'VisX',
    logoSrc: '/icons/visx.png',
    description:
      'VisX are data vizualitaion library specially made for react that made by Airbnb, used by them, and maintine by them. Below are my exploration of these library. The library are very rich and have so many combination of possibility of layout that we can made. It is actually fun to try every one of them, since Data Visualization will never be die, there are always innovation on them.',
    links: [{ name: 'Bar Chart' }, { name: 'Pie Chart' }],
  },

  {
    id: 6,
    title: 'Framer Motion',
    logoSrc: '/icons/framermotion.png',
    description:
      'These are my exploration and implementation of web animation from library Framer Motion which is specially to react.',
    links: [{ name: 'Random' }],
  },
  {
    id: 7,
    title: 'Mantine',
    logoSrc: '/icons/mantine.svg',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Mantine, each pages might have more than one example since I tried manipulating one thing in many ways. My implementation using Tailwind CSS or Emotion CSS-in-JS.',
    links: [{ name: 'Carousel' }],
  },
  {
    id: 8,
    title: 'Headless UI',
    logoSrc: '/icons/headlessui.png',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Headless UI, each pages might have more than one example since I might tried manipulating one thing in many ways. The styling using Tailwind CSS.',
    links: [
      { name: 'Menu' },
      { name: 'Listbox' },
      { name: 'Switch' },
      { name: 'Disclosure' },
      { name: 'Dialog' },
      { name: 'Popover' },
      { name: 'Radio Group' },
      { name: 'Tabs' },
      { name: 'Combobox ExperimentsData' },
      { name: 'Combobox HeadlessUIData' },
    ],
  },
  {
    id: 9,
    title: 'Radix UI',
    logoSrc: '/icons/radixui.png',
    description:
      'These are my exploration of headless user interface components (components UI without bound to any styling) of Radix UI, each pages might have more than one example since I tried manipulating one thing in many ways. The styling using Tailwind CSS after changing from Stitches.',
    links: [
      { name: 'Accordion' },
      { name: 'Alert Dialog' },
      { name: 'Checkbox' },
      { name: 'Collapsible' },
      { name: 'Context Menu' },
      { name: 'Dialog' },
      { name: 'Dropdown Menu' },
      { name: 'Hover Card' },
      { name: 'Navigation Menu' },
      { name: 'Popover' },
      { name: 'Progress' },
      { name: 'Radio Group' },
      { name: 'Scroll Area' },
      { name: 'Select' },
      { name: 'Slider' },
      { name: 'Switch' },
      { name: 'Toggle' },
      { name: 'Toggle Group' },
      { name: 'Toolbar' },
      { name: 'Tooltip' },
      { name: 'Toast' },
    ],
  },
  {
    id: 10,
    title: 'Sandpack',
    logoSrc: '/icons/sandpack.ico',
    description: 'Live code editor',
    links: [{ name: 'Example 1' }],
  },

  {
    id: 11,
    title: 'Notion API',
    logoSrc: '/icons/notion.png',
    description:
      'Notion as a Free CMS, we can connect notion app to any web service via their Notion API to built unique possible application.',
    links: [{ name: 'Table' }],
  },

  {
    id: 12,
    title: 'UI Explorations',
    logoSrc: '/icons/radixui.png',
    description: 'UI Explorations',
    links: [{ name: 'Notion NavBar' }],
  },
  {
    id: 13,
    title: 'Emotion',
    logoSrc: '/icons/emotion.png',
    description: 'Styling',
    links: [{ name: 'Example 1' }, { name: 'Example 2' }],
  },
  {
    id: 14,
    title: 'React Aria',
    logoSrc: '/icons/react-aria.png',
    description: 'UI Components Library',
    links: [{ name: 'Calendar' }, { name: 'Range Calendar' }],
  },
];
