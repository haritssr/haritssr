import Image from 'next/image';
import Link from 'next/link';

export default function Hello() {
  return (
    <section className='flex flex-col justify-center w-full gap-10 px-5 mt-16 mb-5 sm:my-16 sm:px-0 rounded-xl sm:justify-between sm:flex-row-reverse'>
      <div className='flex justify-center sm:flex sm:items-center sm:jusitfy-center sm:pb-5'>
        <Image
          src='/me.jpg'
          height='200'
          width='200'
          className='border-2 border-gray-700 rounded-full'
          alt='Harits Syah'
          blurDataURL='/me.jpg'
          placeholder='blur'
        />
      </div>

      <div className='space-y-2.5 text-center sm:text-left sm:my-auto'>
        <div className='text-3xl font-bold text-zinc-800 sm:text-5xl'>Harits Syah</div>
        <div className='text-xl font-medium text-zinc-800 sm:text-2xl'>
          Front End Engineer & Web Designer
          {/* &#123;design&#125; */}
        </div>
        <div className='text-lg text-zinc-600'>
          At{' '}
          <a
            href='www.harislab.com'
            target='_blank'
            rel='noopener norefferer'
            className='underline decoration-dotted hover:text-white-500 hover:text-blue-800'
          >
            Haris Lab
          </a>{' '}
          &{' '}
          <a
            href='www.harislab.com'
            target='_blank'
            rel='noopener norefferer'
            className='underline decoration-dotted hover:text-white-500 hover:text-blue-800'
          >
            Haris Studio
          </a>
        </div>{' '}
        <div className='flex flex-col w-full pt-4 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <Link href='/#work'>
            <a className='w-full px-3 py-2 text-center text-white bg-blue-700 border border-blue-800 rounded cursor-pointer hover:bg-blue-800'>
              See my works
            </a>
          </Link>
          <Link href='/#blog'>
            <a className='w-full px-3 py-2 text-center border rounded cursor-pointer text-zinc-700 hover:bg-zinc-100 border-zinc-600 bg-zinc-50'>
              Read blog
            </a>
          </Link>
        </div>
        <Link href='/#about'>
          <a className='block pt-3 mx-auto text-center underline cursor-pointer sm:mx-0 text-zinc-400 w-fit decoration-dotted hover:text-zinc-700'>
            More about me
          </a>
        </Link>
      </div>
    </section>
  );
}
