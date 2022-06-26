import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function BottomNavMobile() {
  return (
    <div className='sticky bottom-0 block w-full border-t border-zinc-300 bg-gray-100/80 saturate-150 backdrop-blur sm:hidden'>
      <div className='flex w-full items-center justify-around '>
        {Data.map(({ id, path }) => (
          <IconWrapper key={id} to={`/${id}`} path={path} />
        ))}
      </div>
    </div>
  );
}

const IconWrapper = ({ to, path }: { to: string; path: React.ReactNode }) => {
  const router = useRouter();
  const toN = to === '/home' ? '/' : to;
  const iconColor = router.asPath === toN ? 'text-blue-600' : 'text-zinc-500';
  function capitalizeFirstLetter(to: string) {
    return to.substring(1).charAt(0).toUpperCase() + to.slice(2);
  }

  return (
    <Link href={`${to === '/home' ? '/' : to}`}>
      <a className='block'>
        <div className='flex flex-col items-center justify-center py-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={`${iconColor} h-6 w-6`}
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            {path}
          </svg>
          <div className={`text-[10px] ${iconColor}`}>{capitalizeFirstLetter(to)}</div>
        </div>
      </a>
    </Link>
  );
};

const Data = [
  {
    id: 'home',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
      />
    ),
  },
  {
    id: 'experiments',
    path: (
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
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
