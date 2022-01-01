import * as ScrollArea from '@radix-ui/react-scroll-area';

//i don't know how to add css attribute "data-orientation": {
//  display: 'flex',
// ensures no selection
// userSelect: 'none',
// disable browser handling of all panning and zooming gestures on touch devices
// touchAction: 'none',
// padding: 2,
// background: blackA.blackA6,
// transition: 'background 160ms ease-out',
// '&:hover': { background: blackA.blackA8 },
// '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
// '&[data-orientation="horizontal"]': {
//   flexDirection: 'column',
//   height: SCROLLBAR_SIZE,
// },
// }
// to compoennts other than using stitches

export default function ScrollAreaDemo() {
  return (
    <ScrollArea.Root className='w-2/3 h-32'>
      <ScrollArea.Viewport className='w-full h-full bg-white rounded-md shadow-md'>
        <div className='p-4'>
          <div className='text-lg font-semibold text-purple-600'>Version</div>
          {TAGS.map(tag => (
            <div className='p-2 mt-5 border border-gray-500 rounded' key={tag}>
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
  );
}

const TAGS = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

const data = [
  { id: 1, urutan: 'pertama' },
  { id: 2, urutan: 'kedua' },
  { id: 3, urutan: 'ketiga' },
  { id: 4, urutan: 'keempat' },
  { id: 5, urutan: 'kelima' },
  { id: 6, urutan: 'keenam' },
  { id: 7, urutan: 'ketujuh' },
  { id: 8, urutan: 'kedelapan' },
  { id: 9, urutan: 'kesembilan' },
  { id: 10, urutan: 'kesepuluh' },
  { id: 11, urutan: 'kesebelas' },
  { id: 12, urutan: 'keduabelas' },
];
