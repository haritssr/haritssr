export default function Blurry() {
  return (
    <div className='relative w-full max-w-lg'>
      <div className='absolute top-0 rounded-full bg-pink-300/70 -left-4 w-72 h-72 mix-blend-multiply blur-lg animate-blob'></div>

      <div className='absolute top-0 rounded-full bg-blue-300/70 -right-4 w-72 h-72 mix-blend-multiply blur-lg animate-blob animation-delay-2000'></div>

      <div className='absolute top-0 rounded-full bg-green-300/70 -bottom-8 left-28 w-72 h-72 mix-blend-multiply blur-lg animate-blob animation-delay-4000'></div>

      <div className='relative m-8 space-y-4 rounded-md '>
        <div className='flex items-center justify-between p-5 space-x-8 bg-white rounded-lg'>
          <div className='flex-1'>
            <div className='w-48 h-4 bg-gray-300 rounded'></div>
          </div>
          <div>
            <div className='w-24 h-6 bg-pink-300 rounded-lg'></div>
          </div>
        </div>
        <div className='flex items-center justify-between p-5 space-x-8 bg-white rounded-lg'>
          <div className='flex-1'>
            <div className='w-48 h-4 bg-gray-300 rounded'></div>
          </div>
          <div>
            <div className='w-24 h-6 bg-blue-300 rounded-lg'></div>
          </div>
        </div>
        <div className='flex items-center justify-between p-5 space-x-8 bg-white rounded-lg'>
          <div className='flex-1'>
            <div className='w-48 h-4 bg-gray-300 rounded'></div>
          </div>
          <div>
            <div className='w-24 h-6 bg-green-300 rounded-lg'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
