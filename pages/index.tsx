import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout browserTitle='welcome' description='haritssr'>
      <div className='items-center max-w-5xl mx-auto mt-32 space-y-10 text-center'>
        {/* <div className='text-xl text-gray-700'>Personal Website</div> */}
        <div className='text-5xl font-bold text-gray-700 sm:text-8xl'>Welcome to my mind</div>
        <div className='space-y-3'>
          <div className='text-xl font-semibold text-gray-600 sm:text-3xl'>
            All things about me and my works
          </div>
          <div className='flex items-center justify-center mx-auto space-x-5'>
            <Link href='/about'>
              <a className='flex items-center space-x-1.5 text-base sm:text-2xl text-blue-600 hover:underline'>
                About me
                <RightArrow />
              </a>
            </Link>
            <Link href='/showcase'>
              <a className='flex items-center space-x-1.5 text-base sm:text-2xl text-blue-600 hover:underline'>
                My works
                <RightArrow />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const RightArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 pt-0.5 sm:pt-1 text-blue-600 sm:h-6 sm:w-6'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};
