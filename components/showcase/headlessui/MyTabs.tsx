import { Tab } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';

//Tabs
export default function MyTabs() {
  // const tab = 'active:bg-gray-200 rounded-md text-tiny hover:bg-white hover:shadow-md py-2 px-4';
  return (
    <>
      <Topic name='Tabs' />
      <Tab.Group as='div'>
        <Tab.List className='grid grid-cols-3 gap-1 p-1 text-base text-gray-600 bg-gray-200 rounded-lg sm:w-1/2 sm:text-tiny'>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-white shadow-md rounded-md p-1 sm:p-0.5'
                : 'p-1 sm:p-0.5 hover:bg-gray-300 rounded-md'
            }
          >
            Tab 1
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-white shadow-md rounded-md p-1 sm:p-0.5'
                : 'p-1 sm:p-0.5 hover:bg-gray-300 rounded-md'
            }
          >
            Tab 2
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? 'bg-white shadow-md rounded-md p-1 sm:p-0.5'
                : 'p-1 sm:p-0.5 hover:bg-gray-300 rounded-md'
            }
          >
            Tab 3
          </Tab>
        </Tab.List>

        <Tab.Panels className='p-1 mt-2 bg-gray-200 rounded-md'>
          <Tab.Panel className='h-48'>Content 1</Tab.Panel>
          <Tab.Panel className='h-48'>Content 2</Tab.Panel>
          <Tab.Panel className='h-48'>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
