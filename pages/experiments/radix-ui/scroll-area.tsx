import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as ScrollArea from '@radix-ui/react-scroll-area';

/*
i don't know how to add css attribute "data-orientation": {
 display: 'flex',
ensures no selection
userSelect: 'none',
disable browser handling of all panning and zooming gestures on touch devices
touchAction: 'none',
padding: 2,
background: blackA.blackA6,
transition: 'background 160ms ease-out',
'&:hover': { background: blackA.blackA8 },
'&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
'&[data-orientation="horizontal"]': {
  flexDirection: 'column',
  height: SCROLLBAR_SIZE,
},
}
to compoennts other than using stitches
*/

export default function ScrollAreaDemo() {
  return (
    <LayoutToExperiments title='Scroll Area' domain='Radix UI'>
      <SubTitle>Augments native scroll functionality for custom, cross-browser styling.</SubTitle>
      <ScrollArea.Root className='h-32 w-2/3'>
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
