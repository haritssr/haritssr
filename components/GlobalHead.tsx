import { GitHubIcon, LogoHaritssr } from './Icons';
import GlobalNavigationDesktop from './GlobalNavigationDesktop';
import Link from 'next/link';

export default function GlobalHead() {
  return (
    <nav className='sticky top-0 z-30 bg-zinc-800'>
      <div className='mx-auto flex h-12 max-w-4xl flex-row items-center justify-between px-3 py-2 lg:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-2 sm:w-1/5'>
            <LogoHaritssr />
            <div className='hidden text-tiny text-zinc-400 hover:text-white sm:block'>
              Harits Syah
            </div>
          </a>
        </Link>
        <GlobalNavigationDesktop />
        <div className='flex w-3/5 cursor-pointer justify-center sm:hidden'>
          <div className='group flex items-center space-x-1.5 py-1'>
            <div className='group text-lg text-zinc-200 hover:text-white'>Harits Syah</div>
          </div>
        </div>
        <div className='flex justify-end sm:w-1/5'>
          <a title='Whole site source code' href='https://www.github.com/haritssr/haritssr'>
            <GitHubIcon className='h-5 w-5 cursor-pointer text-zinc-200 hover:text-white' />
          </a>
        </div>
      </div>
    </nav>
  );
}
