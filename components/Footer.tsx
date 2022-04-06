import Link from 'next/link';
import { ContactData } from 'data/ContactData';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='relative mt-20 border-t border-zinc-200 px-8 pt-3 pb-3 text-center xl:px-0'>
      <section>
        <Link href='/'>
          <a className='text-zinc-500 duration-100 hover:text-zinc-700 '>
            Harits Syah (@haritssr) &copy; 2021–{new Date().getFullYear()}
          </a>
        </Link>
      </section>
    </footer>
  );
}
