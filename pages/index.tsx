import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <Layout browserTitle='welcome' description='haritssr'>
      <div className='flex flex-col items-center justify-center h-screen -mt-32 space-y-4 sm:-mt-0'>
        <div className='text-xl text-gray-600'>Hello, I am Harits Syah</div>
        <div className='text-5xl font-bold text-center text-gray-700 sm:text-7xl'>
          Welcome to my{' '}
          <motion.span
            whileHover={{ rotate: 360 }}
            animate={{
              rotate: [30, 0, -30, 90, 0, -90, 120, 0, -120, 360, 0, -360, 0],
              scale: [1, 1.2, 5, 1],
            }}
            transition={{ duration: 1, type: 'tween' }}
            className='inline-block duration-300 rotate-6 hover:rotate-12 hover:text-blue-600 hover:underline '
          >
            mind
          </motion.span>
        </div>
        <div className='text-xl text-center text-gray-600 sm:text-3xl'>
          All things about me and my works
        </div>
        <div className='flex items-center justify-center mx-auto space-x-5'>
          <Link href='/about'>
            <a className='flex items-center space-x-1 text-lg text-blue-600 sm:text-xl hover:underline'>
              About
              <RightArrow />
            </a>
          </Link>
          <Link href='/showcase'>
            <a className='flex items-center space-x-1 text-lg text-blue-600 sm:text-xl hover:underline'>
              Showcase
              <RightArrow />
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
      className='w-4 h-4 pt-0.5 sm:pt-1 text-blue-600 sm:h-6 sm:w-6 -ml-1'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};


