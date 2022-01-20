import { SubTopic, Topic } from '@/components/DesignSystem';

export default function GlowingBackground() {
  return (
    <div>
      <Topic name='Glowing Background' />
      <SubTopic>Hover on the button to see the effect</SubTopic>
      <div className='p-3 border border-zinc-300'>
        <div className='h-auto px-2 sm:px-8 py-6 sm:py-16 bg-[#000] rounded-lg'>
          <div className='grid items-start justify-center gap-8'>
            <div className='relative group'>
              <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition group-hover:duration-200 duration-1000 animate-tilt'></div>
              <button className='relative flex items-center px-3 py-3 leading-none bg-gray-800 divide-x divide-gray-600 rounded-lg sm:py-4 sm:px-7'>
                <span className='flex items-center space-x-2 sm:space-x-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-4 h-4 text-pink-600 sm:h-6 sm:w-6 -rotate-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
                    />
                  </svg>
                  <span className='pr-2 text-xs text-gray-100 sm:pr-6 sm:text-base'>
                    Labs Release 2021.09
                  </span>
                </span>
                <span className='pl-2 text-xs text-indigo-400 transition duration-200 sm:pl-6 group-hover:text-gray-100 sm:text-base'>
                  See what&apos;s new &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
