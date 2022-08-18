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
      <RadioGroup.Root className=''>
        <RadioGroup.Item
          value='default'
          id='r1'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg'
        >
          <RadioGroup.Indicator className='h-4 w-4 rounded-full bg-zinc-500' />
        </RadioGroup.Item>
        <RadioGroup.Item
          value='default'
          id='r1'
          className='flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg'
        >
          <RadioGroup.Indicator className='h-4 w-4 rounded-full bg-zinc-500' />
        </RadioGroup.Item>
      </RadioGroup.Root>
    </LayoutToExperiments>
  );
}
