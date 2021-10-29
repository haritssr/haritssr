import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavDesktop() {
  return (
    <nav className='hidden bg-white border-b border-gray-300 md:block bg-opacity-90 backdrop-blur-sm'>
      <div className='flex flex-row justify-between max-w-5xl px-5 py-2.5 mx-auto xl:px-0'>
        <Link href='/'>
          <a className='space-x-1 text-lg font-semibold duration-200 font-mw'>
            <span className='text-gray-700'>Harits</span>
            <span className='text-gray-500'>Syah</span>
          </a>
        </Link>
        <div className='flex flex-row items-center space-x-10'>
          <DesktopLink href='/work' title='Work' />
          <DesktopLink href='/about' title='About' />
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
        className={`${
          router.asPath === href ? 'text-gray-700 font-semibold' : 'text-gray-500'
        } hover:text-gray-800`}
      >
        {title}
      </a>
    </Link>
  );
};
