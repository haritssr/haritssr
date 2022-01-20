import { SubTopic, Topic } from '../DesignSystem';
import Link from 'next/link';

export default function Works() {
  return (
    <section>
      <h2
        id='work'
        className='z-40 block w-full h-auto pt-24 pb-3 mx-auto text-3xl font-extrabold text-gray-800 sm:pt-0 sm:text-4xl '
      >
        My Works
      </h2>

      <div className='p-5 border rounded-md border-zinc-300'>
        {/* Projects */}
        <section className='mb-20'>
          <Topic name='Projects' />
          <SubTopic>All Projects + domain</SubTopic>
          <div className='grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 skew '>
            {DataWork[1].map(d => (
              <ProjectsBox
                key={d.title}
                href={d.href}
                description={d.description}
                title={d.title}
                period={d.period}
                color={d.color}
                status={d.status}
              />
            ))}
          </div>
        </section>
        {/* Experiments */}
        <section>
          <Topic name='Experiments' />
          <SubTopic>My experiments accross my tech stack</SubTopic>
          <div className='grid grid-cols-1 gap-5 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 skew '>
            {DataWork[0].map(d => (
              <ExperimentBox
                key={d.title}
                href={d.href}
                title={d.title}
                description={d.description}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ProjectsBox({
  href,
  title,
  description,
  period,
  color,
  status,
}: {
  href: string;
  title: string;
  description: string;
  period: string | null;
  color: string;
  status: string;
}) {
  const aStyle =
    'flex flex-col overflow-hidden rounded-lg active:ring-1 active:ring-gray-500  bg-white  border border-zinc-300  hover:border-zinc-300 group hover:shadow-md shadow';
  return (
    <Link href={href}>
      <a className={aStyle} target={href.substring(0, 12) === `https://www.` ? `_blank` : '_self'}>
        <div className='flex items-center justify-between px-3 py-2 border-b border-zinc-300 bg-zinc-100 '>
          <div className='truncate text-zinc-500 group-hover:text-zinc-600'>
            {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
          </div>
          <div>
            {href.substring(0, 12) === `https://www.` ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-zinc-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between h-40 px-3 pt-2 pb-3'>
          <div>
            <div className='text-lg font-semibold text-zinc-800'>{title}</div>
            <div className='text-zinc-500'>{description}</div>
          </div>
          <div className='space-y-2'>
            <div className={`text-zinc-700 rounded  w-fit px-2 py-0.5 text-xs bg-zinc-200`}>
              {period}
            </div>
            <div className={`text-zinc-700 rounded  w-fit px-2 py-0.5 text-xs ${color}`}>
              {status}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

function ExperimentBox({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <a className='flex flex-col overflow-hidden bg-white border rounded-lg shadow active:ring-1 active:ring-gray-500 border-zinc-300 hover:shadow-md hover:border-zinc-300 '>
        <div className='px-3 py-2 font-semibold text-gray-700 bg-zinc-100'>{title}</div>
        <div className='border-b border-zinc-200' />
        <div className='px-3 py-2 text-gray-500'>{description}</div>
      </a>
    </Link>
  );
}

const DataWork = [
  [
    {
      href: '/work/react',
      title: 'React',
      description: 'A JavaScript library for building user interfaces',
      period: null,
    },
    {
      href: '/work/tailwindcss',
      title: 'Tailwind CSS',
      description: 'Rapidly build modern websites without ever leaving your HTML',
      period: null,
    },
    {
      href: '/work/nextjs',
      title: 'Next.js',
      description: 'The React Framework for Production',
      period: null,
    },
    {
      href: '/work/radix-ui',
      title: 'Radix UI',
      description: 'Unstyled, accessible components for building React app',
      period: null,
    },
    {
      href: '/work/visx',
      title: 'VisX',
      description: 'Expressive and low-level visualization primitives for React',
      period: null,
    },
    {
      href: '/work/framer-motion',
      title: 'Framer Motion',
      description: 'A production-ready motion library for React',
      period: null,
    },
    {
      href: '/work/browser',
      title: 'Browser API',
      description: 'A collection of my implementation of browser native API',
      period: null,
    },
    {
      href: '/work/students',
      title: 'Students',
      description: 'A collection of my implementation of browser native API',
      period: null,
    },
    {
      href: '/work/articles',
      title: 'Articles',
      description: 'A collection of my implementation of browser native API',
      period: null,
    },
  ],
  [
    {
      href: 'https://www.harislab.com',
      title: 'Haris Lab',
      description: 'Learn Math and Physics',
      period: 'Jun 2021 - Present',
      color: 'bg-green-100',
      status: 'Production',
    },
    {
      href: 'https://www.haritssr.com',
      title: 'Harits Syah',
      description: 'My personal site',
      period: 'Januari 2022 - Present',
      color: 'bg-green-100',
      status: 'Production',
    },
    {
      href: 'https://www.harisstudio.com',
      title: 'Haris Studio',
      description: 'Booking a aesthetic integrity Website',
      period: 'Januari 2022 - Present',
      color: 'bg-amber-100',
      status: 'Development',
    },

    {
      href: 'https://www.aka-tradingindo.com',
      title: 'AKA Trading',
      description: 'Coffee and spices from Indonesia',
      period: 'May 2021 - Des 2021',
      color: 'bg-purple-200',
      status: 'Change management',
    },
  ],
];
