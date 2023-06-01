import Link from 'next/link';

export default function Footer() {
  return (
    <footer className=' relative mt-20 px-8 pt-3 pb-10 text-center text-[12px] sm:border-zinc-200 sm:text-tiny xl:px-0'>
      <section>
        <Link passHref href='/' className='text-zinc-500'>
          harits<span className='font-semibold text-zinc-700'>sr</span>.com &#169; <span className='text-[12px] sm:text-tiny'> 2021–{new Date().getFullYear()}</span> by <span className="text-zinc-700 font-semibold">Harits Syah</span>
        </Link>
      </section>
    </footer>
  );
}
