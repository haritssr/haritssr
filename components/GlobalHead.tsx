import { GitHubIcon, LogoHaritssr } from './Icons';
import Link from 'next/link';

export default function GlobalHead() {
  return (
    <nav className='z-30 border-b border-zinc-200  bg-apple-gray6/50 saturate-150 backdrop-blur-lg'>
      <div className='mx-auto flex max-w-4xl flex-row items-center justify-between px-3 py-2.5 lg:px-0'>
        <Link href='/'>
          <a className='flex items-center space-x-2 sm:w-1/4'>
            <LogoHaritssr />
            <div className='hidden text-zinc-700 sm:block'>Harits Syah</div>
          </a>
        </Link>
        <div className='flex w-3/5 cursor-pointer justify-center sm:hidden'>
          <div className='group flex items-center space-x-1.5'>
            <div className='group text-base text-zinc-800'>Harits Syah</div>
          </div>
        </div>
        <a
          className='flex justify-end sm:w-1/4'
          title='Whole site source code'
          href='https://www.github.com/haritssr/haritssr'
        >
          <span className='group flex items-center text-zinc-600'>
            <span className='mr-2 hidden  group-hover:text-zinc-800 sm:inline-block'>Source</span>{' '}
            <GitHubIcon className='h-5 w-5 cursor-pointer group-hover:text-zinc-800' />
          </span>
        </a>
      </div>
    </nav>
  );
}
