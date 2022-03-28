import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import * as Accordion from '@radix-ui/react-accordion';

export default function AccordionDemo() {
  return (
    <LayoutToExperiments title='Accordion' domain='Radix UI'>
      <SubTitle>
        A vertically stacked set of interactive headings that each reveal an associated section of
        content.
      </SubTitle>
      <AccordionComponents title='Yes'>asf</AccordionComponents>
      <AccordionComponents title='asd'>asdf </AccordionComponents>
    </LayoutToExperiments>
  );
}

function AccordionComponents({ title, children }) {
  return (
    <>
      {/* Root */}
      <Accordion.Root type='multiple' className='w-2/3'>
        {/* Item */}
        <Accordion.Item value='item-1'>
          <Accordion.Header className='group'>
            <Accordion.Trigger className='flex w-full items-center justify-between rounded-t-md rounded-b-md border border-gray-600 bg-gray-200 px-2.5  py-2 text-left text-tiny font-medium text-gray-900 hover:bg-gray-200 group-rdx-state-open:rounded-b-none group-rdx-state-open:bg-gray-300'>
              <div>{title}</div>
              <ChevronDown />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className='rounded-b-md border-b border-l border-r border-gray-600 bg-white p-2.5 text-tiny text-gray-700'>
            {children}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}

const ChevronDown = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`h-5 w-5 text-gray-600 group-rdx-state-open:rotate-180`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
  </svg>
);
