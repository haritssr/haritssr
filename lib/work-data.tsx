import Image from 'next/image';

export const framerMotionData = [
  { name: 'Animation', href: '/work/framer-motion/animation' },
  { name: 'Gestures', href: '/work/framer-motion/gestures' },
  { name: 'Lazy Motion', href: '/work/framer-motion/lazy-motion' },
  { name: 'Motion Components', href: '/work/framer-motion/motion-components' },
  { name: 'Motion Value', href: '/work/framer-motion/motion-value' },
  { name: 'Transition', href: '/work/framer-motion/transition' },
  { name: 'Animate Presence', href: '/work/framer-motion/animate-presence' },
  { name: 'Motion Config', href: '/work/framer-motion/motion-config' },
];

export const nextjsData = [
  { name: 'Image Component', href: '/work/nextjs/image-components' },
  { name: 'Router', href: '/work/nextjs/router' },
  { name: 'Dynamic Pages', href: '/work/nextjs/dynamic-pages' },
  { name: 'getStaticProps', href: '/work/nextjs/getStaticProps' },
  { name: 'getServerSideProps', href: '/work/nextjs/getServerSideProps' },
  { name: 'Middleware', href: '/work/nextjs/middleware' },
  { name: 'Script Component', href: '/work/nextjs/script' },
];

export const reactData = [
  { name: 'useState', href: '/work/react/useState' },
  { name: 'useState - form', href: '/work/react/useState-form' },
  { name: 'useEffect', href: '/work/react/useEffect' },
  { name: 'useContext', href: '/work/react/useCOntext' },
  { name: 'useRef', href: '/work/react/useRef' },
  { name: 'useMemo', href: '/work/react/useMemo' },
  { name: 'Todo List', href: '/work/react/TodoList' },
  { name: 'Rock Paper Scissors', href: '/work/react/rock-paper-scissors' },
];

export const othersInternalData = [
  { name: 'Number Game', href: '/work/others/number-game' },
  { name: 'SWR', href: '/work/others/swr' },
];

export const othersExternalData = [
  { name: 'NextAuth', href: 'https://www.nextauth-harislab.vercel.app' },
  { name: 'Notion', href: 'https://www.notion-harislab.vercel.app' },
  { name: 'Cloudinary', href: '/work/others/cloudinary' },
];


export const onboardedWebsiteData = [
  {
    id: '1',
    name: 'AKA Trading',
    href: 'https://www.aka-tradingindo.com',
    logo: <Image src='/aka.PNG' height={24} width={24} alt='github logo' />,
  },
  {
    id: '2',
    name: 'Haris Lab',
    href: 'https://www.harislab.com',
    logo: <Image src='/light-logo.png' height={24} width={24} alt='harits corp logo' />,
  },
  {
    id: '3',
    name: 'Haris Studio',
    href: 'https://www.harisstudio.com',
    logo: <Image src='/light-logo.png' height={24} width={24} alt='harits corp logo' />,
  },
  {
    id: '4',
    name: 'Harits Syah',
    href: 'https://www.haritssr.com',
    logo: <Image src='/light-logo.png' height={24} width={24} alt='harits corp logo' />,
  },
];
