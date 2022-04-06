import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from './Icons';

export default function GlobalNavigation() {
  return (
    <nav className='z-30 bg-zinc-800'>
      <div className='mx-auto flex h-11 max-w-4xl flex-row justify-between px-3 py-2 xl:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-1.5 py-1'>
            <Logo />
            <div className='font-medium text-zinc-400 hover:text-zinc-300'>Harits Syah</div>
          </a>
        </Link>
        <div className='hidden sm:block'>
          <section className='flex flex-row items-center space-x-5  sm:space-x-8'>
            <DesktopLink href='/experiments' title='Experiments' />
            <DesktopLink href='/blog' title='Blog' />
          </section>
        </div>
        <Link href='/#contacts'>
          <a className='flex items-center rounded-full bg-white px-2 text-[12px] font-medium text-zinc-800 sm:hidden'>
            Contact me
          </a>
        </Link>
        {/* <MobileNavigation /> */}
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
