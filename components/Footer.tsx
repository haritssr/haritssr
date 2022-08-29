import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=' relative mt-20 px-8 pt-3 pb-3 text-center text-[12px] sm:border-zinc-200 sm:text-tiny xl:px-0'>
      <section>
        <Link href='/'>
          <a className=' text-zinc-500 duration-100 hover:text-zinc-800 '>
            harits<span className='font-semibold text-zinc-700'>sr</span>.com — Harits Syah —
            <span className='text-[12px] sm:text-tiny'> 2021–{new Date().getFullYear()}</span>
          </a>
        </Link>
      </section>
    </footer>
  );
}
