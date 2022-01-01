import Link from 'next/link';

export default function KotakWorkProjects({ href, title, description, period }) {
  const aStyle =
    'flex flex-col overflow-hidden duration-200 rounded-lg active:translate-y-0.5 active:ring-2 active:ring-gray-500  h-auto px-4 py-3 space-y-1 bg-white shadow hover:ring-2 hover:ring-blue-500';
  return (
    <Link href={href}>
      <a className={aStyle} target={href.substring(0, 12) === `https://www.` ? `_blank` : null}>
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold text-gray-700 '>{title}</div>
          <div>{href.substring(0, 12) === `https://www.` ? <GlobeIcon /> : <PuzzleIcon />}</div>
        </div>
        <div className='py-1 border-t border-b border-gray-200'>
          <div className='text-sm text-blue-500'>
            {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
          </div>
          <div className='text-sm text-orange-400'>{period}</div>
        </div>

        <div className='text-gray-600 '>{description}</div>
      </a>
    </Link>
  );
}

const GlobeIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 text-gray-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
      />
    </svg>
  );
};

const PuzzleIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 text-gray-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z'
      />
    </svg>
  );
};
