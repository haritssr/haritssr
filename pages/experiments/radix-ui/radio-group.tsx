import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function RadioGroupDemo() {
  return (
    <LayoutToExperiments title='Radio Group' domain='Radix UI'>
      <SubTitle>
        A set of checkable buttons—known as radio buttons—where no more than one of the buttons can
        be checked at a time.
      </SubTitle>
      <RadioGroup.Root defaultValue='default '>
        <RadioGroup.Item
          value='balskdjf'
          id='r1'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg'
        >
          <RadioGroup.Indicator className='relative h-full w-full after:block after:h-4 after:w-4 after:rounded-full after:bg-violet-500' />
          <label className='pl-5 text-lg text-gray-700' htmlFor='r2'>
            Comfortable
          </label>
        </RadioGroup.Item>
      </RadioGroup.Root>
    </LayoutToExperiments>
  );
}
