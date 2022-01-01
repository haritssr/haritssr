import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import img from '../../../public/pscale_logo.png';
import Image from 'next/image';

export default function PlanetScaleNavBar() {
  return (
    <LayoutSubWorkToTopic
      title='PlanetScale NavBar'
      href='/work/tailwindcss'
      hrefName='Tailwind CSS'
    >
      <SubTitle>
        <a
          rel='noreferrer noopener'
          target='_blank'
          href='https://docs.planetscale.com/'
          className='text-blue-500 underline hover:no-underline'
        >
          PlanetScale
        </a>{' '}
        navigation bar
      </SubTitle>
      <div className='bg-[#1a1b21] rounded-md py-6 md:py-4 px-6 w-full h-auto flex flex-col md:flex-row md:items-center items-start justify-between text-tiny space-y-5 md:space-y-0'>
        <div className='flex items-center w-full space-x-2 md:w-1/3'>
          <Image src={img} alt='Planet Scale Logo' width={30} height={24} priority />
          <div className='font-medium text-white'>Documentation</div>
        </div>
        <div className='flex flex-col-reverse md:justify-between justify-left md:flex-row md:space-y-0 md:w-2/3 '>
          <input
            type='text'
            className='text-gray-300 px-3 py-1.5 rounded-md bg-[#30313a] border border-gray-400 placeholder-gray-400 caret-white mt-4 md:mt-0'
            placeholder='Search documentation'
          />
          <div className='flex items-center space-x-3'>
            <button className='px-3 py-1.5 font-medium duration-100 hover:bg-[#30313a] text-white border border-gray-400 rounded-md '>
              Get started
            </button>
            <button className='px-3 py-1.5 font-medium duration-100 hover:bg-[#30313a] text-white border border-gray-400 rounded-md '>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </LayoutSubWorkToTopic>
  );
}
