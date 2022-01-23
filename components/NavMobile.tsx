import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function NavMobile() {
  return (
    <nav className='flex items-center justify-between w-full h-auto bg-white border border-b md:hidden bg-opacity-90 backdrop-blur-sm border-zinc-300'>
      <Link href='/'>
        <a className='flex items-center py-2.5 space-x-1.5 pl-5'>
          <Image src='/haritssr_logo.svg' height='20' width='20' alt='Harits Syah Logo' />
          <div className='text-lg font-medium text-gray-800'>Harits Syah</div>
        </a>
      </Link>

      <Menu as='div' className='z-50'>
        {({ open }) => (
          <>
            <Menu.Button className='px-3 py-2 focus:outline-none'>
              {open ? <X /> : <TwoLines />}
            </Menu.Button>

            <Menu.Items className='absolute top-0 right-0 items-center  w-full h-screen mt-[45px] overflow-y-auto  bg-zinc-50 justify-center flex border-t border-zinc-400'>
              <section className='flex flex-col px-8 py-5 space-y-2'>
                <Navigation href='/projects' title='Projects' />
                <Navigation href='/experiments' title='Experiments' />
                <Navigation href='/blog' title='Blog' />
                <Navigation href='/about' title='About' />
              </section>
            </Menu.Items>
          </>
        )}
      </Menu>
    </nav>
  );
}

//refactor this fucking a lot of unneccesary code
const Navigation = ({ href, title }) => {
  const router = useRouter();

  return (
    <Menu.Item>
      {({ active }) => (
        <button className='w-full text-center'>
          {active ? (
            <Link href={href}>
              <a
                className={`${
                  router.asPath === href ? 'text-gray-700' : 'text-gray-400'
                } hover:text-gray-700 text-2xl block pt-2 pb-1`}
              >
                {title}
              </a>
            </Link>
          ) : (
            <Link href={href}>
              <a
                className={`${
                  router.asPath === href ? 'text-gray-700' : 'text-gray-400'
                } hover:text-gray-700 text-2xl block pt-2 pb-1`}
              >
                {title}
              </a>
            </Link>
          )}
        </button>
      )}
    </Menu.Item>
  );
};

export const X = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`text-gray-700 w-7 h-7 `}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

const TwoLines = () => {
  return (
    <svg
      className='text-gray-700 h-7 w-7'
      viewBox='0 0 24 24'
      width='24'
      height='24'
      stroke='currentColor'
      strokeWidth={1.2}
      fill='none'
    >
      <path d='M4 8h16M4 16h16' />
    </svg>
  );
};
