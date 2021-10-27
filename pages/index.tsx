import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout browserTitle='Home' description='Home'>
      <div className='flex flex-col items-center justify-center h-screen -mt-20 space-y-7 '>
        <div className='flex flex-col text-5xl font-bold text-center text-gray-700 lg:flex-row sm:text-7xl'>
          <div>Welcome to&nbsp;</div>
          <div>my world</div>
        </div>
        <div className='text-xl text-center text-gray-600 sm:text-3xl'>
          Web Developer & Web Designer
        </div>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4 xs:space-y-0 xs:space-x-5 lg:space-x-8 xs:flex-row'>
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
    </Layout>
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
