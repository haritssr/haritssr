import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogoHaritssr } from './Icons';

export default function GlobalNavigation() {
  return (
    <nav className='z-30 bg-zinc-800 sticky top-0'>
      <div className='mx-auto flex h-12 max-w-4xl flex-row items-center justify-between px-3 py-2 xl:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-1.5 py-1'>
            <LogoHaritssr />
            <div className='text-zinc-100'>Harits Syah</div>
          </a>
        </Link>
        <div className='hidden sm:block'>
          <div className='flex flex-row items-center space-x-5  sm:space-x-8'>
            <DesktopLink href='/experiments' title='Experiments' />
            <DesktopLink href='/blog' title='Blog' />
            {/* <GitHubLinkWithIcon /> */}
          </div>
        </div>

        <div className='flex items-center space-x-2 sm:hidden'>
          {/* <GitHubLinkWithIcon /> */}
          <Link href='/#contacts'>
            <a className='flex items-center rounded-md bg-zinc-100 px-3 py-1 text-[12px] font-medium text-zinc-900'>
              Contact Me
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}

const DesktopLink = ({ href, title }: { href: string; title: string }) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={`${
          // router.asPath.substring(0, href.length) === /experiments or /blog ,etc
          router.asPath.substring(0, href.length) === href
            ? 'text-white'
            : 'text-zinc-400 hover:text-zinc-300'
        } rounded-md py-0.5 `}
      >
        {title}
      </a>
    </Link>
  );
};
