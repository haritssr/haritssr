import Image from 'next/image';
import ios15 from 'public/ios15.jpg';
import Forest from 'public/Forest.jpg';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
export default function Ios15() {
  return (
    <LayoutSubWorkToTopic title='Ios 15 Clone' href='/work/tailwindcss' hrefName='Tailwind CSS'>
      <div className='relative h-[700px] w-[320px] bg-gray-800 rounded-[50px] drop-shadow-xl overflow-hidden border-[10px] border-gray-800'>
        <div className='absolute'>
          <Image
            src={ios15}
            alt='ios15'
            height={740}
            width={320}
            // layout='responsive'
            // className='inset-0 object-cover w-full h-full'
          />
        </div>
        <div className='absolute inset-x-0 top-0'>
          <div className='w-40 h-6 mx-auto bg-gray-800 rounded-b-xl'></div>
        </div>
        <div className='relative'>
          <div className='flex justify-end mt-1.5 mr-3 space-x-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z'
                clipRule='evenodd'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4 h-4 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z' />
            </svg>
          </div>
          <div className='h-0.5 w-12 bg-white mr-4 ml-auto mt-1 rounded-full'></div>
          <div className='flex flex-col items-center mt-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-8 h-8 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z' />
            </svg>
            <p className='mt-3 text-6xl text-white font-extralight'>9:41</p>
            <p className='mt-1 text-lg font-light text-white'>Monday, June 7</p>
          </div>
          <div className='relative mx-2 mt-4'>
            <div className='absolute inset-x-0 h-full origin-bottom scale-[0.85] -bottom-4 bg-white/10 rounded-2xl backdrop-blur-sm'></div>
            <div className='absolute inset-x-0 h-full origin-bottom scale-95 shadow-sm -bottom-2 bg-white/30 rounded-3xl backdrop-blur-sm'></div>

            <div className='p-4 shadow-sm bg-white/40 rounded-3xl backdrop-blur-sm'>
              <div className='flex justify-between'>
                <div className='text-gray-800'>
                  <p className='text-xs font-bold'>9:30 AM</p>
                  <h2 className='text-lg font-bold'>Your Morning Summary</h2>
                </div>
                <span className='flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-full'>
                  11
                </span>
              </div>
              <div className='grid grid-cols-2 gap-2 mt-2 text-gray-800'>
                <div>
                  <Image src={Forest} alt='Forest' className='rounded-lg' />
                  <h3 className='mt-1 text-xs font-semibold leading-tight '>
                    Heals your soul in your original place
                  </h3>
                  <p className='mt-1 text-xs '>The place is fun and humiliating at the same time</p>
                </div>
                <div>
                  <Image src={Forest} alt='Forest' className='rounded-lg' />
                  <h3 className='mt-1 text-xs font-semibold leading-tight '>
                    Heals your soul in your original place
                  </h3>
                  <p className='mt-1 text-xs '>The place is fun and humiliating at the same time</p>
                </div>
              </div>
              <hr className='mt-4 border-black/20' />
              <div className='grid items-end grid-cols-2 gap-1 mt-3'>
                <div className='cols-span-2'>
                  <h3 className='text-sm font-bold text-gray-800'>More updates</h3>
                  <p className='mt-0.5 text-xs'>Polywork, keystone 6, and Sarah Drasner</p>
                </div>
                <ul className='flex flex-row-reverse -space-x-4 space-x-reverse'>
                  <li>
                    <Image
                      src={Forest}
                      height={30}
                      width={30}
                      className='object-cover w-8 h-8 rounded-full'
                      alt='Forest'
                    />
                  </li>
                  <li>
                    <Image
                      src={Forest}
                      height={30}
                      width={30}
                      className='object-cover w-8 h-8 rounded-full'
                      alt='Forest'
                    />
                  </li>
                  <li>
                    <Image
                      src={Forest}
                      height={30}
                      width={30}
                      className='object-cover w-8 h-8 rounded-full'
                      alt='Forest'
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className='absolute inset-x-0 bottom-0 h-20'>
          <div className='flex justify-between px-10'>
            <button className='p-2 rounded-full bg-gray-800/40 backdrop-blur-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 text-white'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path d='M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z' />
              </svg>
            </button>
            <button className='p-2 rounded-full bg-gray-800/40 backdrop-blur-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-6 h-6 text-white'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='absolute inset-x-0 bottom-1'>
          <div className='h-1 mx-auto bg-white rounded w-28'></div>
        </div>
      </div>
    </LayoutSubWorkToTopic>
  );
}
