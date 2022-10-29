import SubTitle from '@/components/SubTitle';
import LayoutToExperiments from '@/components/LayoutToExperiments';

// Doens't work on password type

export default function FloatingLabels() {
  return (
    <LayoutToExperiments title='Floating Labels' domain='Tailwind CSS'>
      <SubTitle>Try to tap and write on input, the label will go up</SubTitle>

      <div className='relative mt-4 space-y-10 '>
        <div className='sm:w-1/3'>
          <input type='email' id='email' placeholder='Email Address' className='peer w-full' />
          <label
            htmlFor='email'
            className='absolute left-0 -top-5 cursor-text text-sm text-zinc-500 peer-placeholder-shown:top-[5.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base'
          >
            Email Address
          </label>
        </div>
        <div className='sm:w-1/3'>
          <input type='password' id='password' placeholder='Password' className='peer w-full' />
          <label
            htmlFor='password'
            className='absolute left-0 top-[55px] cursor-text text-sm  text-zinc-500 peer-placeholder-shown:top-[80.5px] peer-placeholder-shown:left-[9.5px] peer-placeholder-shown:text-base'
          >
            Password
          </label>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
