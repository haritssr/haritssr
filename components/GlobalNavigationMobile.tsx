import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function GlobalNavigationMobile() {
  return (
    <div className='sticky bottom-0 block w-full border-t border-zinc-300 bg-gray-100/80 saturate-150 backdrop-blur sm:hidden'>
      <div className='flex w-full items-center justify-around '>
        {Data.map(({ id, path }) => (
          <IconWrapper key={id} to={`${id}`} path={path} />
        ))}
      </div>
    </div>
  );
}

const IconWrapper = ({ to, path }: { to: string; path: React.ReactNode }) => {
  const router = useRouter();
  const iconColor = router.asPath === to ? 'text-blue-600' : 'text-zinc-500';
  function capitalizeFirstLetter(to: string) {
    return to.substring(1).charAt(0).toUpperCase() + to.slice(2);
  }

  return (
    <Link href={`#${to}`}>
      <a className='flex flex-col items-center justify-center py-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${iconColor} h-6 w-6`}
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
        >
          {path}
        </svg>
        <div className={`text-[11px] ${iconColor}`}>{capitalizeFirstLetter(to)}</div>
      </a>
    </Link>
  );
};

const Data = [
  {
    id: 'contacts',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    ),
  },
  {
    id: 'projects',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z'
      />
    ),
  },
  {
    id: 'experiments',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      />
    ),
  },
  {
    id: 'tech stack',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
      />
    ),
  },
  {
    id: 'blog',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      />
    ),
  },
];
