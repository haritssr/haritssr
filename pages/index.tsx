import Link from 'next/link';
import Head from 'next/head';
import NavDesktop from '@/components/NavDesktop';
import NavMobile from '@/components/NavMobile';
import { useRouter } from 'next/router';

export default function Home() {
  const image = 'https://harislab.com/public/HarisLab.png';
  const type = 'website';
  const description = 'Harits Syah - Web Developer & Designer';
  return (
    <div className='bg-[#f2f1f7]'>
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

      <section className='sticky top-0 z-50 '>
        <nav className='bg-white border-b border-gray-300 bg-opacity-90 backdrop-blur-sm'>
          <div className='text-center max-w-5xl px-5 py-2.5 mx-auto xl:px-0'>
            <Link href='/'>
              <a className='space-x-1 text-base font-semibold duration-200'>
                <span className='text-gray-500 font-inter'>{`Hi, I'm`}</span>
                <span className='text-gray-600 font-mw'>Harits Syah</span>
              </a>
            </Link>
          </div>
        </nav>
        {/* <NavMobile /> */}
      </section>

      <main className='w-full max-w-5xl min-h-screen px-5 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter'>
        <div className='flex flex-col items-center justify-center h-screen -mt-20 space-y-7 '>
          <div className='flex flex-col text-5xl font-bold text-center text-gray-700 lg:flex-row sm:text-7xl'>
            <div>Welcome to&nbsp;</div>
            <div>the world of</div>
          </div>
          <div className='text-xl text-center text-gray-600 sm:text-3xl'>
            Web Developer & Web Designer
          </div>
          <div className='flex items-center justify-center mx-auto space-x-5 lg:space-x-8 xs:flex-row'>
            <Link href='/work'>
              <a className='flex flex-row items-center py-2 pl-4 pr-3 space-x-2 font-medium text-gray-100 duration-300 bg-blue-500 rounded-full shadow active:ring-2 active:ring-blue-400 hover:bg-blue-600 hover:shadow-none'>
                My Work
                <RightArrow />
              </a>
            </Link>
            <Link href='/about'>
              <a className='flex flex-row items-center py-2 pl-4 pr-3 space-x-2 font-medium text-blue-500 duration-300 bg-white border border-gray-300 rounded-full shadow active:ring-2 active:ring-blue-400 hover:bg-gray-50 hover:shadow-none'>
                About Me
                <RightArrowAbout />
              </a>
            </Link>
          </div>
        </div>
      </main>
      <footer className='max-w-5xl px-5 pt-10 pb-5 mx-auto mt-20 text-center xl:px-0'>
        <Link href='/'>
          <a className='text-gray-700 duration-200 hover:text-emerald-500 '>
            Harits Syah &copy; {new Date().getFullYear()}
          </a>
        </Link>
      </footer>
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

const DesktopLink = ({ href, title }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${
          router.asPath === href ? 'text-gray-700 font-semibold' : 'text-gray-500'
        } hover:text-gray-800`}
      >
        {title}
      </a>
    </Link>
  );
};
