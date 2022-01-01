import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { SubTitle } from '@/components/DesignSystem';
import * as Tooltip from '@radix-ui/react-tooltip';

export default function TooltipR() {
  return (
    <LayoutSubWorkToTopic title='Tooltip' href='/work/radix-ui' hrefName='Radix UI'>
      <SubTitle>
        A popup that displays information related to an element when the element receives keyboard
        focus or the mouse hovers over it.
      </SubTitle>
      <Tooltip.Root>
        <Tooltip.Trigger className='flex items-center px-2 py-1 space-x-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300'>
          <div className='text-rose-500'>MDN</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-4 h-4 text-gray-600 hover:text-gray-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </Tooltip.Trigger>
        <Tooltip.Content
          side='top'
          align='center'
          className='px-2.5 py-1.5 text-white bg-gray-700 rounded-md shadow-xl'
        >
          <div>Mozilla Developer Network</div>
          <Tooltip.Arrow offset={5} width={11} height={5} className='fill-[#3F3F46]' />
        </Tooltip.Content>
      </Tooltip.Root>
    </LayoutSubWorkToTopic>
  );
}
