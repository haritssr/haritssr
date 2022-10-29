import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';

export default function ExportedAccordion() {
  return (
    <LayoutToExperiments title='Accordion' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/accordion'
          name='Radix UI Accordion'
        />
        <ExplanationList>
          <li>
            A vertically stacked set of interactive headings that each reveal an associated section
            of content.
          </li>
          <li>Click the button with name and icon and the explanation box will appear</li>
        </ExplanationList>
      </SubTitle>
      <div className='space-y-2'>
        <AccordionComponents title='Yes'>asf</AccordionComponents>
        <AccordionComponents title='asd'>asdf </AccordionComponents>
      </div>
    </LayoutToExperiments>
  );
}

function AccordionComponents({ title, children }) {
  return (
    <Accordion.Root type='multiple' className='w-full sm:w-1/3'>
      <Accordion.Item value='item-1'>
        <Accordion.Header className='group'>
          <Accordion.Trigger className='flex w-full items-center justify-between rounded-t-md rounded-b-md border border-zinc-600 bg-zinc-200 px-2.5  py-2 text-left text-tiny font-medium text-zinc-900 hover:bg-zinc-200 group-rdx-state-open:rounded-b-none group-rdx-state-open:bg-zinc-300'>
            <div>{title}</div>
            <ChevronDownIcon className='h-5 w-5 text-zinc-600 group-rdx-state-open:rotate-180' />
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className='rounded-b-md border-b border-l border-r border-zinc-600 bg-white p-2.5 text-tiny text-zinc-700'>
          {children}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}
