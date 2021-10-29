import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';

export default function NavMobile() {
  return (
    <nav className='flex items-center justify-between w-full h-auto bg-white border-b border-gray-300 md:hidden bg-opacity-90 backdrop-blur-sm'>
      <Link href='/'>
        <a className='pl-5 space-x-1 text-lg font-semibold duration-200 hover:underline font-mw'>
          <span className='text-gray-700'>Harits</span>
          <span className='text-gray-500'>Syah</span>
        </a>
      </Link>

      <Menu as='div' className='z-50'>
        {({ open }) => (
          <>
            <Menu.Button className='px-3 py-2 focus:outline-none'>
              {open ? <X /> : <TwoLines />}
            </Menu.Button>

            <Menu.Items className='absolute top-0 right-0 items-center  w-full h-screen mt-[43px] overflow-y-auto  bg-white justify-center flex'>
              <section className='flex flex-col px-8 py-5 space-y-2 border-t border-b border-gray-400'>
                <Navigation href='/about' title='About' />
                <Navigation href='/work' title='Work' />
              </section>
            </Menu.Items>
          </>
        )}
      </Menu>
    </nav>
  );
}

//refactor this fucking a lot of code
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
                  router.asPath === href ? 'text-gray-700' : 'text-gray-500'
                } hover:text-gray-500 text-2xl block pt-2 pb-1 font-medium`}
              >
                {title}
              </a>
            </Link>
          ) : (
            <Link href={href}>
              <a
                className={`${
                  router.asPath === href ? 'text-gray-700' : 'text-gray-500'
                } hover:text-gray-500 text-2xl block pt-2 pb-1 font-medium`}
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
