import * as RadioGroup from '@radix-ui/react-radio-group';

export default function RadioGroupDemo() {
  return (
    <RadioGroup.Root defaultValue='default '>
      <RadioGroup.Item
        value='balskdjf'
        id='r1'
        className='flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg'
      >
        <RadioGroup.Indicator className='relative w-full h-full after:block after:h-4 after:w-4 after:rounded-full after:bg-violet-500' />
        <label className='pl-5 text-lg text-gray-700' htmlFor='r2'>
          Comfortable
        </label>
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}
