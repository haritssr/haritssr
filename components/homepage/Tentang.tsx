import { SubTopic, Topic } from '../DesignSystem';
import Image from 'next/image';

import { VercelLogoIcon } from '@radix-ui/react-icons';

import Box from '../Box';

export default function Tentang() {
  return (
    <section>
      <h2
        id='about'
        className='z-40 block w-full h-auto pt-24 pb-3 mx-auto text-3xl font-extrabold text-gray-800 sm:text-4xl '
      >
        About Me
      </h2>
      <div className='p-5 border rounded-md border-zinc-300'>
        <div className='grid grid-cols-1 gap-y-14 sm:gap-x-10 sm:grid-cols-2'>
          {/* Contact */}
          <section>
            <Topic name='Contacts' />
            <SubTopic>Reach me here</SubTopic>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {ContactsData.map(c => (
                <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                  <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
                </Box>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <Topic name='Tools' />
            <SubTopic>Main apps on my computer</SubTopic>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              {ToolsData.map(c => (
                <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                  <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
                </Box>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <Topic name='Web Stack' />
            <SubTopic>My stack to make a website or webapps</SubTopic>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 '>
              {WebStacksData.map(c => (
                <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                  <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
                </Box>
              ))}

              <Box
                title='This link will go to Framer Motion website'
                name='Framer Motion'
                href='https://www.framer.com/motion/'
              >
                <FramerMotionLogo />
              </Box>
              <Box
                title='This link will go to Vercel website'
                name='Vercel'
                href='https://vercel.com/'
              >
                <VercelLogoIcon />
              </Box>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

const WebStacksData = [
  {
    title: 'This link will go to Turborepo website',
    href: 'https://www.turborepo.org/',
    imgSrc: '/turborepo.png',
    name: 'Turborepo',
  },
  {
    title: 'This link will go to PlanetScale website',
    href: 'https://www.planetscale.com/',
    imgSrc: '/planet-scale.png',
    name: 'PlanetScale',
  },
  {
    title: 'This link will go to Tailwind CSS website',
    href: 'https://www.tailwindcss.com/',
    imgSrc: '/tailwindcss.svg',
    name: 'Tailwind CSS',
  },
  {
    title: 'This link will go to Git website',
    href: 'https://git-scm.com/',
    imgSrc: '/git.svg',
    name: 'Git',
  },
  {
    title: 'This link will go to Next.js website',
    href: 'https://nextjs.org/',
    imgSrc: '/nextjs.svg',
    name: 'Next.js',
  },
  {
    title: 'This link will go to React.js website',
    href: 'https://beta.reactjs.org/',
    imgSrc: '/react.svg',
    name: 'React',
  },
  {
    title: 'This link will go to TypeScript website',
    href: 'https://www.typescriptlang.org/',
    imgSrc: '/typescript.svg',
    name: 'TypeScript',
  },
];

const ToolsData = [
  {
    title: 'This link will go to VLC website',
    href: 'https://www.videolan.com',
    imgSrc: '/vlc.svg',
    name: 'VLC',
  },
  {
    title: 'This link will go to Google Chrome website',
    href: 'https://www.google.com/chrome/',
    imgSrc: '/chrome.svg',
    name: 'Chrome',
  },
  {
    title: 'This link will go to Figma website',
    href: 'https://www.figma.com/',
    imgSrc: '/figma.svg',
    name: 'Figma',
  },
  {
    title: 'This link will go to Notion website',
    href: 'https://www.notion.so/',
    imgSrc: '/notion.png',
    name: 'Notion',
  },
  {
    title: 'This link will go to Node JS website',
    href: 'https://nodejs.org/',
    imgSrc: '/vscode.svg',
    name: 'VS COde',
  },
  {
    title: 'This link will go to VS Code website',
    href: 'https://code.visualstudio.com/',
    imgSrc: '/node.svg',
    name: 'Node JS',
  },
  {
    title: 'This link will go to Git website',
    href: 'https://git-scm.com/',
    imgSrc: '/git.svg',
    name: 'Git',
  },
];

const ContactsData = [
  {
    title: 'This link will open your dial',
    href: 'tel:0895-3311-0340-1',
    imgSrc: '/WhatsApp.svg',
    name: '+62895331103401',
  },
  {
    title: 'This link will go to Harits Syah website, haritssr.com',
    href: 'https://www.haritssr.com',
    imgSrc: '/light-logo.png',
    name: 'haritssr.com',
  },
  {
    title:
      'This link will open your email application, and setting haritssr@outlook.co.id as default destination email',
    href: 'mailto:haritssr@outlook.co.id',
    imgSrc: '/outlook.svg',
    name: 'haritssr@outlook.co.id',
  },
  {
    title:
      'This link will open your email application, and setting haritssr@gmail.com as default destination email',
    href: 'mailto:haritssr@gmail.com',
    imgSrc: '/gmail.svg',
    name: 'haritssr@gmail.com',
  },
  {
    title: 'This link will go to Harits Syah Twitter page',
    href: 'https://www.twitter.com/haritssr',
    imgSrc: '/twitter.svg',
    name: '@haritssr',
  },
  {
    title: 'This link will go to Harits Syah GitHub page',
    href: 'https://www.github.com/haritssr',
    imgSrc: '/github.png',
    name: '/haritssr',
  },
];

const FramerMotionLogo = () => {
  return (
    <svg
      className='w-6 h-6 rounded-full'
      version='1.0'
      xmlns='http://www.w3.org/2000/svg'
      width='560.000000pt'
      height='560.000000pt'
      viewBox='0 0 560.000000 560.000000'
      preserveAspectRatio='xMidYMid meet'
    >
      <g
        transform='translate(0.000000,560.000000) scale(0.100000,-0.100000)'
        fill='#EC4899'
        stroke='none'
      >
        <path
          d='M0 2800 l0 -2800 2800 0 2800 0 0 2800 0 2800 -2800 0 -2800 0 0
            -2800z m2808 92 c5 -1 287 276 627 617 340 341 622 618 627 615 10 -7 9 -2381
            -1 -2452 l-6 -42 -305 305 c-168 168 -308 304 -312 302 -4 -1 -144 -138 -311
            -304 -167 -167 -309 -303 -317 -303 -7 0 -150 136 -317 302 -167 167 -306 305
            -308 307 -2 2 -143 -134 -312 -302 -169 -168 -311 -303 -315 -301 -10 6 -11
            2478 -1 2488 4 4 285 -271 625 -611 340 -340 621 -619 626 -621z'
        />
      </g>
    </svg>
  );
};
