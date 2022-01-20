import { SubTitle, SubTopic, Topic } from '@/components/DesignSystem';

export default function FloatingLabels() {
  return (
    <div>
      <Topic name='Floating Labels' />
      <SubTopic>Try to tap and write on input, the label will go up</SubTopic>
      <div className='p-3 border border-zinc-300'>
        <div className='relative mt-4'>
          <div className='max-w-xl'>
            <input
              type='email'
              id='email'
              placeholder='Email Address'
              className='w-full px-4 py-2 placeholder-transparent border border-gray-300 rounded-md text-zinc-700 bg-zinc-100 focus:outline-none focus:border-zinc-600 peer'
            />
            <label
              htmlFor='email'
              className='absolute left-0 text-sm -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 text-zinc-700'
            >
              Email Address
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
