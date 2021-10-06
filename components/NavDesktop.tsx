import Link from 'next/link';

export default function NavDesktop() {
  return (
    <nav className='hidden bg-white border-b border-gray-300 md:block bg-opacity-90 backdrop-blur-sm'>
      <div className='flex flex-row justify-between max-w-5xl px-5 py-2.5 mx-auto xl:px-0'>
        <Link href='/'>
          <a className='text-xl font-semibold group'>
            <span className='text-gray-500 group-hover:text-gray-400'>harits</span>
            <span className='text-gray-800 underline group-hover:text-gray-400'>sr</span>
          </a>
        </Link>
        <div className='flex flex-row items-center space-x-10'>
          <DesktopLink to='/about' title='about' />
          <DesktopLink to='/blog' title='blog' />
          <DesktopLink to='/showcase' title='showcase' />
        </div>
      </div>
    </nav>
  );
}

const DesktopLink = ({ to, title }) => {
  return (
    <Link href={to}>
      <a className='text-gray-800 hover:text-gray-400'>{title}</a>
    </Link>
  );
};
