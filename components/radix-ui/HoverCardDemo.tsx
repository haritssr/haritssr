import * as HoverCard from '@radix-ui/react-hover-card';
import Link from 'next/link';

export default function HoverCardDemo() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger className='px-3 py-1.5 font-medium text-gray-600 bg-white rounded-md shadow-md hover:cursor-pointer hover:bg-gray-100'>
        <Link href='https://twitter.com/haritssr'>
          <a target='_blank' rel='noopener noreferrer'>
            @haritssr
          </a>
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <div className='w-auto p-3 text-white bg-white rounded-md shadow-xl'>
          <div className='font-semibold text-gray-700'>Harits Syah</div>
          <div className='text-blue-600'>@haritssr</div>
          <div className='text-blue-600'>haritssr.com</div>
          <div className='text-gray-600'>22</div>
          <div className='text-gray-700'>South Tangerang</div>
        </div>
        <HoverCard.Arrow offset={20} className='fill-[#fff]' />
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
