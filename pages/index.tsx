import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const image = 'https://harislab.com/public/HarisLab.png';
  const type = 'website';
  const description = 'Harits Syah - Web & Design';

  return (
    <div className='mt-20 bg-[#f2f1f7]'>
      <Head>
        <title>{description}</title>
        <link rel='icon' href='/harislab_ico.ico' />
        <meta name='robots' content='follow, index' />
        <meta name='description' content={description} />
        <meta property='og:type' content={type} />
        <meta property='og:site_name' content='HarisLab' />
        <meta property='og:description' content={description} />
        <meta property='og:title' content={description} />
        <meta property='og:image' content={image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@haritssr' />
        <meta name='twitter:title' content={description} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
      </Head>

      <main className='w-full max-w-5xl min-h-screen px-5 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter'>
        <div className='flex flex-col items-center justify-center h-screen -mt-20 space-y-5 '>
          <Image
            src='/me.jpg'
            height='150'
            width='150'
            className='rounded-full '
            alt='Harits Syah'
            blurDataURL='/me.jpg'
            placeholder='blur'
          />

          <div className='text-4xl font-bold text-center text-gray-800 '>
            <div>Harits Syah</div>
          </div>
          <div className='w-4/5 text-xl text-center text-gray-500 sm:text-2xl xs:w-full'>
            Designing web with Figma & Developing it with Next.js
          </div>
          <div className='flex items-center justify-center mx-auto space-x-5 xs:flex-row'>
            <Link href='/work'>
              <a className='flex flex-row items-center py-2 pl-4 pr-3 space-x-1 font-medium text-gray-100 duration-100 bg-blue-600 rounded-full shadow hover:bg-blue-700 hover:shadow-none '>
                <p>My Work</p>
                <RightArrow />
              </a>
            </Link>
            <Link href='/about'>
              <a className='flex flex-row items-center py-2 pl-4 pr-3 space-x-1 font-medium text-blue-500 duration-100 bg-white border border-gray-200 rounded-full shadow hover:border-gray-400 active:ring-2 active:ring-blue-400 hover:bg-gray-50 hover:shadow-none '>
                <p>About Me</p>
                <RightArrowAbout />
              </a>
            </Link>
          </div>
        </div>

        <footer className='pb-5 mx-auto space-y-3 text-center xl:px-0'>
          <Link href='/about'>
            <a className='text-gray-500 duration-100 hover:text-gray-700 '>
              Harits Syah &copy; {new Date().getFullYear()}
            </a>
          </Link>
        </footer>
      </main>
    </div>
  );
}

const RightArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 pt-0.5 text-gray-200 sm:pt-0 sm:h-5 sm:w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};

const RightArrowAbout = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 pt-0.5 text-blue-400 sm:pt-0 sm:h-5 sm:w-5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};
