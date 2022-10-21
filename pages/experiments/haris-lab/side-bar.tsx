import LayoutToExperiments from '@/components/LayoutToExperiments';
import { fisika } from '../../../data/fisika';

export default function GlobalModal() {
  return (
    <LayoutToExperiments title='Global Modal' domain='Haris Lab'>
      <App />
    </LayoutToExperiments>
  );
}

function App() {
  return (
    <div>
      {fisika.map(a => (
        <div key={a.domain.name}>
          <div>{a.domain.name}</div>
          <div>
            {a.domain.chapters.map(a => (
              <AccordionC key={a?.name} title={a?.name}>
                <div>
                  {a?.topics.map(topic => (
                    <div key={topic}>{topic}</div>
                  ))}
                </div>
              </AccordionC>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import * as Accordion from '@radix-ui/react-accordion';

function AccordionC({ title, children }, props) {
  return (
    <Accordion.Root type='multiple' className='w-full sm:w-1/3' {...props}>
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
