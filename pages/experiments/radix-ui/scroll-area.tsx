import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export default function ScrollAreaDemo() {
  return (
    <LayoutToExperiments title='Scroll Area' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/scroll-area'
          name='Radix UI Scroll Area'
        />
        <ExplanationList>
          <li>Augments native scroll functionality for custom, cross-browser styling.</li>
          <li>Try to scroll it.</li>
        </ExplanationList>
      </SubTitle>
      <ScrollArea.Root className='h-64 w-2/3 rounded border border-zinc-300'>
        <ScrollArea.Viewport className='h-full w-full rounded-md bg-white shadow-md'>
          <div className='p-4'>
            <div className='text-lg font-semibold text-purple-600'>Version</div>
            {TAGS.map(tag => (
              <div className='mt-5 rounded border border-gray-500 p-2' key={tag}>
                {tag}
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
        {/* <ScrollArea.Scrollbar orientation='horizontal'>
            <ScrollArea.Thumb />
          </ScrollArea.Scrollbar> */}
        <ScrollArea.Scrollbar orientation='vertical' className='scrollArea'>
          <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </LayoutToExperiments>
  );
}

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);
