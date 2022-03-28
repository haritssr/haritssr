import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function GlowingBackground() {
  return (
    <LayoutToExperiments title='Glowing Background' domain='Tailwind CSS'>
      <SubTitle>Hover on the button to see the effect</SubTitle>

      <div className='h-auto rounded-lg bg-[#000] px-2 py-6 sm:px-8 sm:py-16'>
        <div className='grid items-start justify-center gap-8'>
          <div className='group relative'>
            <div className='absolute -inset-0.5 animate-tilt rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
            <button className='relative flex items-center divide-x divide-gray-600 rounded-lg bg-gray-800 px-3 py-3 leading-none sm:py-4 sm:px-7'>
              <span className='flex items-center space-x-2 sm:space-x-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 -rotate-6 text-pink-600 sm:h-6 sm:w-6'
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
              <span className='pl-2 text-xs text-indigo-400 transition duration-200 group-hover:text-gray-100 sm:pl-6 sm:text-base'>
                See what&apos;s new &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
