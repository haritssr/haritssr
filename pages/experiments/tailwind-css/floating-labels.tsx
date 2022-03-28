import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function FloatingLabels() {
  return (
    <LayoutToExperiments title='Floating Labels' domain='Tailwind CSS'>
      <SubTitle>Try to tap and write on input, the label will go up</SubTitle>

      <div className='relative mt-4'>
        <div className='max-w-xl'>
          <input
            type='email'
            id='email'
            placeholder='Email Address'
            className='peer w-full rounded-md border border-gray-300 bg-zinc-100 px-4 py-2 text-zinc-700 placeholder-transparent focus:border-zinc-600 focus:outline-none'
          />
          <label
            htmlFor='email'
            className='absolute left-0 -top-5 text-sm text-zinc-700 peer-placeholder-shown:top-2 peer-placeholder-shown:left-4 peer-placeholder-shown:text-base'
          >
            Email Address
          </label>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
