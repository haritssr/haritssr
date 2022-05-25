import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as HoverCard from '@radix-ui/react-hover-card';

export default function ExportedHoverCard() {
  return (
    <LayoutToExperiments title='Hover Card' domain='Radix UI'>
      <SubTitle>For sighted users to preview content available behind a link.</SubTitle>
      <HoverCard.Root>
        <HoverCard.Trigger
          className='rounded-md bg-white px-3 py-1.5 font-medium text-gray-600 shadow-md hover:cursor-pointer hover:bg-gray-100'
          target='_blank'
          rel='noopener noreferrer'
          href='https://twitter.com/haritssr'
        >
          @haritssr
        </HoverCard.Trigger>
        <HoverCard.Content>
          <div className='w-auto rounded-md bg-white p-3 text-white shadow-xl'>
            <div className='font-semibold text-gray-700'>Harits Syah</div>
            <div className='text-blue-600'>@haritssr</div>
            <div className='text-blue-600'>haritssr.com</div>
            <div className='text-gray-600'>22</div>
            <div className='text-gray-700'>South Tangerang</div>
          </div>
          <HoverCard.Arrow offset={20} className='fill-[#fff]' />
        </HoverCard.Content>
      </HoverCard.Root>
    </LayoutToExperiments>
  );
}
