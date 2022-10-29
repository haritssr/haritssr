import SubTitle from '@/components/SubTitle';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Blurry() {
  return (
    <LayoutToExperiments title='Apple NavBar' domain='Tailwind CSS'>
      <SubTitle>Background Blurry Effect</SubTitle>
      <div>
        <div className='border border-zinc-300 p-3'>
          <div className='relative w-full max-w-lg'>
            <div className='animate-blob absolute top-0 -left-4 h-24 w-24 rounded-full bg-pink-300/70 mix-blend-multiply blur-lg sm:h-72 sm:w-72'></div>

            <div className='animation-delay-2000 animate-blob absolute top-0 -right-4 h-24 w-24 rounded-full bg-blue-300/70 mix-blend-multiply blur-lg sm:h-72 sm:w-72'></div>

            <div className='animation-delay-4000 animate-blob absolute top-0 -bottom-8 left-28 h-24 w-24 rounded-full bg-green-300/70 mix-blend-multiply blur-lg sm:h-72 sm:w-72'></div>

            <div className='relative m-8 space-y-4 rounded-md '>
              <div className='flex items-center justify-between space-x-4 rounded-lg bg-white p-3 sm:space-x-8 sm:p-5'>
                <div className='flex-1'>
                  <div className='h-2 w-16 rounded bg-gray-300 sm:h-4 sm:w-48'></div>
                </div>
                <div>
                  <div className='h-6 w-24 rounded-lg bg-pink-300'></div>
                </div>
              </div>
              <div className='flex items-center justify-between space-x-4 rounded-lg bg-white p-3 sm:space-x-8 sm:p-5'>
                <div className='flex-1'>
                  <div className='h-2 w-16 rounded bg-gray-300 sm:h-4 sm:w-48'></div>
                </div>
                <div>
                  <div className='h-6 w-24 rounded-lg bg-blue-300'></div>
                </div>
              </div>
              <div className='flex items-center justify-between space-x-4 rounded-lg bg-white p-3 sm:space-x-8 sm:p-5'>
                <div className='flex-1'>
                  <div className='h-2 w-16 rounded bg-gray-300 sm:h-4 sm:w-48'></div>
                </div>
                <div>
                  <div className='h-6 w-24 rounded-lg bg-green-300'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
