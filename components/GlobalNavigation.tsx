import Link from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from './Icons';

export default function GlobalNavigation() {
  return (
    <nav className='sticky top-0 z-30 bg-zinc-800'>
      <div className='mx-auto flex max-w-4xl flex-row justify-between px-3 py-2 xl:px-0'>
        <Link href='/'>
          <a className='group flex items-center space-x-1.5 py-1'>
            <Logo />
            <div className='font-medium text-zinc-100'>Harits Syah</div>
          </a>
        </Link>
        <section className='flex flex-row items-center space-x-5 sm:space-x-8'>
          <DesktopLink href='/experiments' title='Experiments' />
          <DesktopLink href='/blog' title='Blog' />
        </section>
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
            : 'text-zinc-400 hover:text-white'
        } rounded-md py-0.5 `}
      >
        {title}
      </a>
    </Link>
  );
};
