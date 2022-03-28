import { SubTitle, Topic } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Tabs from '@radix-ui/react-tabs';

export default function TabsDemo() {
  return (
    <LayoutToExperiments title='Tabs' domain='Radix UI'>
      <SubTitle>
        A set of layered sections of content—known as tab panels—that are displayed one at a time.
      </SubTitle>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <Topic name='Horizontal' />
          <Tabs.Root>
            <Tabs.List>
              <Tabs.Trigger value='Satu' />
            </Tabs.List>
            <Tabs.Content value='satu'>asdfaskdjfhlskajdhflkasjhskdf</Tabs.Content>
          </Tabs.Root>
        </div>
        <div>
          <Topic name='Horizontal' />
          <Tabs.Root>
            <Tabs.List>
              <Tabs.Trigger value='Dua' />
            </Tabs.List>
            <Tabs.Content value='dua'>asdfaskdjfhlskajdhflkasjhskdf</Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </LayoutToExperiments>
  );
}
