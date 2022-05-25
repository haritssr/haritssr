import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function ExportedMenu() {
  return (
    <LayoutToExperiments title='Menu' domain='Headless UI'>
      <SubTitle>
        Menus offer an easy way to build custom, accessible dropdown components with robust support
        for keyboard navigation.{' '}
        <ExternalLink href='https://headlessui.dev/react/menu' name='Source' />
      </SubTitle>
      <MenuExample1 />
    </LayoutToExperiments>
  );
}

const MenuExample1 = () => {
  return (
    //border to identify the width of the Menu.Button
    <div className='relative w-52 text-left'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            Options
            <ChevronDownIcon
              className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-52 origin-top-right space-y-1 rounded-md bg-white p-1 shadow-lg ring-2 ring-blue-500 ring-opacity-5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
                    active ? 'bg-blue-500 text-white' : 'text-zinc-700'
                  }`}
                >
                  <div>Action</div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                </button>
              )}
            </Menu.Item>
            {/* Disabled item */}
            <Menu.Item disabled={true}>
              {({ disabled }) => (
                <button
                  className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
                    disabled ? 'text-zinc-400' : ''
                  }`}
                >
                  <div>Disabled Action</div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
                    active ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  <div>Action</div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                    />
                  </svg>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
