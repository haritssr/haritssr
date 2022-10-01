import { GitHubIcon, LogoHaritssr } from './Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GlobalHead() {
  const router = useRouter();
  return (
    <nav
      className={`${
        router.asPath === '/' ? 'sticky top-0' : 'hidden sm:sticky sm:top-0 sm:block'
      } z-30 border-b border-zinc-200  bg-zinc-50/50 saturate-150 backdrop-blur-lg`}
    >
      <div className='mx-auto flex max-w-4xl flex-row items-center justify-between px-3 py-2.5 sm:px-5'>
        <Link href='/'>
          <a className='flex items-center space-x-2 sm:w-1/4'>
            <LogoHaritssr />
            <div className='hidden text-zinc-700 sm:block'>Harits Syah</div>
          </a>
        </Link>
        <div className='flex w-3/5 cursor-pointer justify-center sm:hidden'>
          <div className='group flex items-center space-x-1.5'>
            <div className='group text-base text-zinc-700'>Harits Syah</div>
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
