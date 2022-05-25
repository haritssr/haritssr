import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='text-tiny relative mt-20 border-t border-zinc-200 px-8 pt-3 pb-3 text-center xl:px-0'>
      <section>
        <Link href='/'>
          <a className=' text-zinc-400 duration-100 hover:text-zinc-800 '>
            Copyright &copy; Harits Syah{' '}
            <span className='text-sm'>2021–{new Date().getFullYear()}</span>
          </a>
        </Link>
      </section>
    </footer>
  );
}
