import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ExplanationList from '@/components/ExplanationList';

export default function ExportedTooltip() {
  return (
    <LayoutToExperiments title='Tooltip' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/tooltip'
          name='Radix UI Tooltip'
        />
        <ExplanationList>
          <li>
            A popup that displays information related to an element when the element receives
            keyboard focus or the mouse hovers over it.
          </li>
          <li>Hover or click will show a tooltip above.</li>
        </ExplanationList>
      </SubTitle>
      <Tooltip.Root>
        <div className='flex space-x-1'>
          <div className='text-zinc-700'>MDN</div>
          <Tooltip.Trigger className='flex items-center rounded px-1 py-0.5 hover:bg-zinc-100 active:ring-1 active:ring-zinc-700'>
            <ExclamationCircleIcon
              className='h-4 w-4 text-zinc-600 hover:text-zinc-700'
              strokeWidth={2}
            />
          </Tooltip.Trigger>
          <Tooltip.Content
            side='top'
            align='center'
            className='rounded-md bg-zinc-700 px-2.5 py-1.5 text-white shadow-xl'
          >
            <div>Mozilla Developer Network</div>
            <Tooltip.Arrow offset={5} width={10} height={5} className='fill-[#3F3F46]' />
          </Tooltip.Content>
        </div>
      </Tooltip.Root>
    </LayoutToExperiments>
  );
}
