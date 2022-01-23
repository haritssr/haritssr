import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function NavDesktop() {
  return (
    <nav className='hidden bg-opacity-95 md:block backdrop-blur-lg'>
      <div className='flex flex-row justify-between max-w-4xl px-5 pt-2 mx-auto xl:px-0'>
        <Link href='/'>
          <a className='flex items-center py-2.5 space-x-1.5 '>
            <Image src='/haritssr_logo.svg' height='20' width='20' alt='Harits Syah Logo' />
            <div className='text-lg font-medium text-gray-800'>Harits Syah</div>
          </a>
        </Link>
        <div className='flex flex-row items-center space-x-10'>
          <DesktopLink href='/projects' title='Projects' />
          <DesktopLink href='/experiments' title='Experiments' />
          <DesktopLink href='/blog' title='Blog' />
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
        className={`${router.asPath === href ? ' text-gray-800' : 'text-gray-400'}
        hover:text-gray-800`}
      >
        {title}
      </a>
    </Link>
  );
};
