import Link from 'next/link';
import { Menu } from '@headlessui/react';

export default function NavMobile() {
  return (
    <nav className='flex items-center justify-between w-full h-auto bg-white md:hidden bg-opacity-90 backdrop-blur-sm'>
      <Link href='/'>
        <a className='flex items-center pl-5 text-gray-700'>haritssr.com</a>
      </Link>

      <Menu as='div' className='z-50'>
        {({ open }) => (
          <>
            <Menu.Button className='px-3 py-2 focus:outline-none'>
              {open ? <X /> : <TwoLines />}
            </Menu.Button>

            <Menu.Items className='absolute top-0 right-0  w-full h-screen mt-[43px] overflow-y-auto  bg-white'>
              <section className='flex flex-col px-8 py-5 space-y-2 border-t border-gray-600 divide-y divide-gray-600 '>
                <Navigation to='about' title='about' />
                <Navigation to='blog' title='blog' />
                <Navigation to='showcase' title='showcase' />
              </section>
            </Menu.Items>
          </>
        )}
      </Menu>
    </nav>
  );
}

const Navigation = ({ to, title }) => {
  const style = ' text-lg block text-gray-700 pt-2 pb-1';
  return (
    <Menu.Item>
      {({ active }) => (
        <button className='w-full text-left'>
          {active ? (
            <Link href={`/${to}`}>
              <a className={style}>{title}</a>
            </Link>
          ) : (
            <Link href={`/${to}`}>
              <a className={style}>{title}</a>
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
