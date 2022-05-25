import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Toggle from '@radix-ui/react-toggle';

export default function ExportedToggle() {
  return (
    <LayoutToExperiments title='Toggle' domain='Radix UI'>
      <SubTitle>A two-state button that can be either on or off.</SubTitle>
      <Toggle.Root
        onPressedChange={() => alert('Toggle being pressed!')}
        pressed={true}
        className='hover:ring-500 rounded-md border border-zinc-400 bg-white px-2 py-1.5 shadow-md duration-300 hover:ring-1 active:translate-y-0.5 active:shadow-none active:ring-1 active:ring-zinc-400'
      >
        Press this
      </Toggle.Root>
    </LayoutToExperiments>
  );
}
