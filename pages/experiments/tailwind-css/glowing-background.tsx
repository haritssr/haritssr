import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { BeakerIcon } from '@heroicons/react/outline';

export default function GlowingBackground() {
  return (
    <LayoutToExperiments title='Glowing Background' domain='Tailwind CSS'>
      <SubTitle>
        Hover on the button to see the glowing effect.{' '}
        <ExternalLink name='Source' href='https://www.youtube.com/watch?v=5W6kEP65AH4' />
      </SubTitle>

      <div className='h-auto rounded-lg bg-[#000] px-2 py-6 sm:px-8 sm:py-16'>
        <div className='grid items-start justify-center gap-8'>
          <div className='group relative'>
            <div className='animate-tilt absolute -inset-0.5 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200'></div>
            <button className='relative flex items-center divide-x divide-gray-600 rounded-lg bg-gray-800 px-3 py-3 leading-none sm:py-4 sm:px-7'>
              <span className='flex items-center space-x-2 sm:space-x-5'>
                <BeakerIcon
                  className=' h-4 w-4 -rotate-6 text-pink-600 sm:h-6 sm:w-6'
                  strokeWidth='1.5'
                />
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
