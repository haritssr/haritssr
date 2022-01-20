import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavDesktop() {
  return (
    <nav className='hidden border-b bg-opacity-95 md:block backdrop-blur-lg border-zinc-300'>
      <div className='flex flex-row justify-between max-w-4xl px-5 mx-auto xl:px-0'>
        <Link href='/'>
          <a className='flex items-center justify-center py-2.5 space-x-1 text-lg duration-200 group font-bold font-mw'>
            <span className='text-gray-700 group-hover:underline'>Harits</span>
            <span className='text-gray-500 group-hover:underline'>Syah</span>
          </a>
        </Link>
        <div className='flex flex-row items-center space-x-2'>
          <DesktopLink href='/#work' title='Work' />
          <DesktopLink href='/#blog' title='Blog' />
          <DesktopLink href='/#about' title='About' />
        </div>
      </div>
    </nav>
  );
}

const DesktopLink = ({ href, title }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${router.asPath === href ? ' text-gray-800 font-medium' : 'text-gray-500'}
        px-4 `}
      >
        {title}
      </a>
    </Link>
  );
};
