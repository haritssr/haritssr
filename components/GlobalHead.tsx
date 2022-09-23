import { GitHubIcon, LogoHaritssr } from './Icons';
import GlobalNavigationDesktop from './GlobalNavigationDesktop';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GlobalHead() {
  const router = useRouter();
  return (
    <nav
      className={`${
        router.asPath === '/' ? 'sticky top-0' : 'hidden sm:sticky sm:top-0 sm:block'
      } z-30 border-b border-zinc-200  bg-zinc-100/80 saturate-150 backdrop-blur`}
    >
      <div className='mx-auto flex max-w-4xl flex-row items-center justify-between px-3 py-2.5 lg:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-2 sm:w-1/4'>
            <LogoHaritssr />
            <div className='hidden text-tiny text-zinc-700 sm:block sm:text-base sm:font-semibold'>
              Harits Syah
            </div>
          </a>
        </Link>
        <GlobalNavigationDesktop />
        <div className='flex w-3/5 cursor-pointer justify-center sm:hidden'>
          <div className='group flex items-center space-x-1.5'>
            <div className='group text-base font-medium text-zinc-700'>Harits Syah</div>
          </div>
        </div>
        <a
          className='flex justify-end sm:w-1/4'
          title='Whole site source code'
          href='https://www.github.com/haritssr/haritssr'
        >
          <span className='group flex'>
            <span className='mr-2 hidden text-zinc-800 group-hover:text-zinc-400 sm:inline-block'>
              Source
            </span>{' '}
            <GitHubIcon className='h-5 w-5 cursor-pointer text-zinc-800 group-hover:text-zinc-400' />
          </span>
        </a>
      </div>
    </nav>
  );
}
