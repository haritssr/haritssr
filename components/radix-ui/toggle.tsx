import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import * as Toggle from '@radix-ui/react-toggle';

export default function ToggleR() {
  return (
    <LayoutSubWorkToTopic title='Toggle' href='/work/radix-ui' hrefName='Radix UI'>
      <SubTitle>A two-state button that can be either on or off.</SubTitle>
      <Toggle.Root
        onPressedChange={() => console.log('Toggle being pressed!')}
        pressed={true}
        className='p-2 bg-white rounded-md shadow-md'
      >
        Press this
      </Toggle.Root>
    </LayoutSubWorkToTopic>
  );
}
