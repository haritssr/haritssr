import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import Image from 'next/image';

export default function Contact() {
  return (
    <div>
      <Topic name='Contact' />
      <SubTopic>Reach me here</SubTopic>
      <div className='grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        <Box href='https://www.github.com/haritssr'>
          <div className='flex items-center space-x-3'>
            <Image src='/github.png' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>github/haritssr</div>
          </div>
        </Box>
        <Box href='https://www.twitter.com/haritssr'>
          <div className='flex items-center space-x-3'>
            <svg
              version='1.1'
              id='Logo'
              xmlns='http://www.w3.org/2000/svg'
              x='0px'
              y='0px'
              viewBox='0 0 248 204'
              className='w-6 h-6'
              fill='#00ACEE'
            >
              <style type='text/css'></style>
              <g id='Logo_1_'>
                <path
                  id='white_background'
                  d='M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z'
                />
              </g>
            </svg>
            <div className='font-medium text-gray-700'>@haritssr</div>
          </div>
        </Box>
        <a
          href='mailto:haritssr@gmail.com'
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-between w-auto px-3 py-2.5 sm:py-2 space-x-2 duration-200 ease-out bg-white rounded-lg shadow hover:shadow-lg  '
        >
          <div className='flex items-center space-x-3'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='52 42 88 66' className='w-6 h-6'>
              <path fill='#4285f4' d='M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6' />
              <path fill='#34a853' d='M120 108h14c3.32 0 6-2.69 6-6V59l-20 15' />
              <path fill='#fbbc04' d='M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2' />
              <path fill='#ea4335' d='M72 74V48l24 18 24-18v26L96 92' />
              <path fill='#c5221f' d='M52 51v8l20 15V48l-5.6-4.2c-5.94-4.45-14.4-.22-14.4 7.2' />
            </svg>
            <div className='font-medium text-gray-700'>haritssr@gmail.com</div>
          </div>
          {/* tanda panah manual ke atas kanan */}
          <svg
            className='w-6 h-6 text-gray-600 pt-0.5'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            shapeRendering='geometricPrecision'
          >
            <path d='M7 17L17 7' />
            <path d='M7 7h10v10' />
          </svg>
        </a>
        <Box href='https://www.haritssr.com'>
          <div className='flex items-center space-x-3'>
            <Image src='/light-logo.png' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>haritssr.com</div>
          </div>
        </Box>
      </div>
    </div>
  );
}
