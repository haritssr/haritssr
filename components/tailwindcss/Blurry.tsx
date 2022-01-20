import { SubTopic, Topic } from '@/components/DesignSystem';

export default function Blurry() {
  return (
    <div>
      <Topic name='Blurry' />
      <SubTopic>Background Blurry effect</SubTopic>
      <div className='p-3 border border-zinc-300'>
        <div className='relative w-full max-w-lg'>
          <div className='absolute top-0 w-24 h-24 rounded-full bg-pink-300/70 -left-4 sm:w-72 sm:h-72 mix-blend-multiply blur-lg animate-blob'></div>

          <div className='absolute top-0 w-24 h-24 rounded-full bg-blue-300/70 -right-4 sm:w-72 sm:h-72 mix-blend-multiply blur-lg animate-blob animation-delay-2000'></div>

          <div className='absolute top-0 w-24 h-24 rounded-full bg-green-300/70 -bottom-8 left-28 sm:w-72 sm:h-72 mix-blend-multiply blur-lg animate-blob animation-delay-4000'></div>

          <div className='relative m-8 space-y-4 rounded-md '>
            <div className='flex items-center justify-between p-3 space-x-4 bg-white rounded-lg sm:space-x-8 sm:p-5'>
              <div className='flex-1'>
                <div className='w-16 h-2 bg-gray-300 rounded sm:h-4 sm:w-48'></div>
              </div>
              <div>
                <div className='w-24 h-6 bg-pink-300 rounded-lg'></div>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 space-x-4 bg-white rounded-lg sm:space-x-8 sm:p-5'>
              <div className='flex-1'>
                <div className='w-16 h-2 bg-gray-300 rounded sm:h-4 sm:w-48'></div>
              </div>
              <div>
                <div className='w-24 h-6 bg-blue-300 rounded-lg'></div>
              </div>
            </div>
            <div className='flex items-center justify-between p-3 space-x-4 bg-white rounded-lg sm:space-x-8 sm:p-5'>
              <div className='flex-1'>
                <div className='w-16 h-2 bg-gray-300 rounded sm:h-4 sm:w-48'></div>
              </div>
              <div>
                <div className='w-24 h-6 bg-green-300 rounded-lg'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
