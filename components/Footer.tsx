import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='max-w-5xl px-8 pt-10 pb-5 mx-auto mt-20 space-y-3 text-center xl:px-0'>
      <Link href='/about'>
        <a className='text-gray-500 duration-100 hover:text-gray-700 '>
          Harits Syah &copy; {new Date().getFullYear()}
        </a>
      </Link>
    </footer>
  );
}
