import * as Accordion from '@radix-ui/react-accordion';

export default function AccordionDemo({ title, children }) {
  return (
    <>
      {/* Root */}
      <Accordion.Root type='multiple' className='w-2/3'>
        {/* Item */}
        <Accordion.Item value='item-1'>
          <Accordion.Header className='group'>
            <Accordion.Trigger className='flex justify-between items-center w-full px-2.5 py-2 text-left text-gray-900 font-medium hover:bg-gray-200  group-rdx-state-open:bg-gray-300 bg-gray-200 border-gray-600 border rounded-t-md rounded-b-md group-rdx-state-open:rounded-b-none text-tiny'>
              <div>{title}</div>
              <ChevronDownIcon />
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className='p-2.5 text-gray-700 bg-white border-b border-l border-r border-gray-600 rounded-b-md text-tiny'>
            {children}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </>
  );
}

const ChevronDownIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={`w-5 h-5 text-gray-600 group-rdx-state-open:rotate-180`}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
  </svg>
);
