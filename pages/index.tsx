import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <section className='flex flex-col justify-center gap-10 px-8 pt-16 pb-10 mx-auto xl:px-0 rounded-xl sm:justify-between sm:flex-row-reverse'>
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
        <div className='space-y-3 text-center sm:text-left sm:my-auto'>
          <div className='text-3xl font-bold text-zinc-800 sm:text-5xl'>Harits Syah</div>
          <div className='text-xl font-medium text-zinc-800 sm:text-2xl'>
            Frontend Engineer & Web Designer
          </div>
          <div className='text-lg text-zinc-600'>
            At{' '}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Lab
            </a>{' '}
            &{' '}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Studio
            </a>
          </div>{' '}
          <div className='flex flex-col w-full pt-2 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <Link href='/projects'>
              <a className='w-full px-3 py-2 text-center text-white bg-blue-700 border border-blue-800 rounded cursor-pointer hover:bg-blue-800'>
                See my projects
              </a>
            </Link>
            <Link href='/#blog'>
              <a className='w-full px-3 py-2 text-center text-blue-500 bg-white border border-blue-500 rounded cursor-pointer hover:bg-blue-50'>
                Read blog
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
