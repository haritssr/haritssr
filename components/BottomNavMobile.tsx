import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function BottomNavMobile() {
  return (
    <div className='sticky bottom-0 block w-full border-t border-zinc-200 bg-white/70 backdrop-blur sm:hidden'>
      <div className='flex w-full items-center justify-around '>
        {Data.map(({ id, path }) => (
          <IkonWrapper key={id} to={`/${id}`} path={path} />
        ))}
      </div>
    </div>
  );
}

const IkonWrapper = ({ to, path }: { to: string; path: string }) => {
  const router = useRouter();
  const toN = to === '/beranda' ? '/' : to;
  const iconColor = router.asPath === toN ? 'text-blue-600' : 'text-zinc-600';
  function capitalizeFirstLetter(to: string) {
    return to.substring(1).charAt(0).toUpperCase() + to.slice(2);
  }

  return (
    <Link href={`${to === '/beranda' ? '/' : to}`}>
      <a className='block'>
        <div className='flex flex-col items-center justify-center py-1.5'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className={`${iconColor} h-6 w-6`}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d={path} />
            </svg>
          </div>
          <div className={`text-[10px] ${iconColor}`}>{capitalizeFirstLetter(to)}</div>
        </div>
      </a>
    </Link>
  );
};

const Data = [
  {
    id: 'beranda',
    path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    id: 'experiments',
    path: 'M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8',
  },
  {
    id: 'blog',
    path: 'M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2',
  },
];
