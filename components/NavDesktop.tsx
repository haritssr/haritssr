import Link from 'next/link';

export default function NavDesktop() {
  return (
    <nav className='hidden bg-white border-b border-gray-300 md:block bg-opacity-90 backdrop-blur-sm'>
      <div className='flex flex-row justify-between max-w-5xl px-5 py-2.5 mx-auto xl:px-0'>
        <DesktopLink to='/' title='haritssr.com' />
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
