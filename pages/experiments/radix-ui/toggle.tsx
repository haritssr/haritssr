import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Toggle from '@radix-ui/react-toggle';

export default function ToggleR() {
  return (
    <LayoutToExperiments title='Toggle' domain='Radix UI'>
      <SubTitle>A two-state button that can be either on or off.</SubTitle>
      <Toggle.Root
        onPressedChange={() => alert('Toggle being pressed!')}
        pressed={true}
        className='px-2 py-1.5 bg-white border rounded-md shadow-md active:ring-1 active:ring-zinc-400 hover:ring-1 hover:ring-500 active:shadow-none active:translate-y-0.5 duration-300 border-zinc-400'
      >
        Press this
      </Toggle.Root>
    </LayoutToExperiments>
  );
}