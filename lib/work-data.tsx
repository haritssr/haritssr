import Image from 'next/image';

export const framerMotionData = [
  { name: 'Animation', href: '/projects/framer-motion/animation' },
  { name: 'Gestures', href: '/projects/framer-motion/gestures' },
  { name: 'Lazy Motion', href: '/projects/framer-motion/lazy-motion' },
  { name: 'Motion Components', href: '/projects/framer-motion/motion-components' },
  { name: 'Motion Value', href: '/projects/framer-motion/motion-value' },
  { name: 'Transition', href: '/projects/framer-motion/transition' },
  { name: 'Animate Presence', href: '/projects/framer-motion/animate-presence' },
  { name: 'Motion Config', href: '/projects/framer-motion/motion-config' },
];

export const nextjsData = [
  { name: 'Image Component', href: '/projects/nextjs/image-components' },
  { name: 'Router', href: '/projects/nextjs/router' },
  { name: 'Dynamic Pages', href: '/projects/nextjs/dynamic-pages' },
  { name: 'getStaticProps', href: '/projects/nextjs/getStaticProps' },
  { name: 'getServerSideProps', href: '/projects/nextjs/getServerSideProps' },
  { name: 'Middleware', href: '/projects/nextjs/middleware' },
  { name: 'Script Component', href: '/projects/nextjs/script' },
];

export const reactData = [
  { name: 'useState', href: '/projects/react/useState' },
  { name: 'useState - form', href: '/projects/react/useState-form' },
  { name: 'useEffect', href: '/projects/react/useEffect' },
  { name: 'useContext', href: '/projects/react/useCOntext' },
  { name: 'useRef', href: '/projects/react/useRef' },
  { name: 'useMemo', href: '/projects/react/useMemo' },
  { name: 'Todo List', href: '/projects/react/TodoList' },
  { name: 'Rock Paper Scissors', href: '/projects/react/rock-paper-scissors' },
];

export const othersInternalData = [
  { name: 'Number Game', href: '/projects/others/number-game' },
  { name: 'SWR', href: '/projects/others/swr' },
];

export const othersExternalData = [
  { name: 'NextAuth', href: 'https://www.nextauth-harislab.vercel.app' },
  { name: 'Notion', href: 'https://www.notion-harislab.vercel.app' },
  { name: 'Cloudinary', href: '/projects/others/cloudinary' },
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
