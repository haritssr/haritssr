import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function FloatingLabels() {
  return (
    <LayoutSubWorkToTopic title='Floating Labels' href='/work/tailwindcss' hrefName='Tailwind CSS'>
      <SubTitle>
        Floating Labels. This is an alternatif of label tag if you want visualy more simple. Start
        typing on the form and the labels will move up
      </SubTitle>
      <div className='relative mt-4'>
        <div className='max-w-xl'>
          <input
            type='email'
            id='email'
            placeholder='Email Address'
            className='w-full px-4 py-2 text-gray-800 placeholder-transparent border-b-2 border-gray-300 rounded-md focus:outline-none focus:border-indigo-600 peer'
          />
          <label
            htmlFor='email'
            className='absolute left-0 text-sm -top-5 peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-4'
          >
            Email Address
          </label>
        </div>
      </div>
    </LayoutSubWorkToTopic>
  );
}
