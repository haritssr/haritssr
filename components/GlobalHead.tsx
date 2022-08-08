import Link from 'next/link';
import { LogoHaritssr } from './Icons';
import GlobalNavigationDesktop from './GlobalNavigationDesktop';

export default function GlobalHead() {
  return (
    <nav className='sticky top-0 z-30 bg-zinc-800'>
      <div className='mx-auto flex h-12 max-w-4xl flex-row items-center justify-between px-3 py-2 xl:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-1.5 py-1'>
            {/* <LogoHaritssr /> */}
            <div className='text-[17px] text-zinc-400'>
              harits<span className='text-white'>sr</span>.com
            </div>
          </a>
        </Link>
        <div className='hidden skm:block'>
          <GlobalNavigationDesktop />
        </div>

        <div className='flex items-center space-x-2 sm:hidden'>
          <Link href='/#contacts'>
            <a className='flex items-center rounded-md border border-zinc-600 bg-zinc-700 px-3 py-1 text-[12px] font-medium text-white'>
              Contact Me
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
