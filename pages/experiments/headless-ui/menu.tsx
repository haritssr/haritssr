import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon, FireIcon } from '@heroicons/react/solid';

export default function ExportedMenu() {
  return (
    <LayoutToExperiments title='Menu' domain='Headless UI'>
      <SubTitle>
        <ExternalLink href='https://headlessui.dev/react/menu' name='Headless UI Menu (Dropdown)' />
        <br />
        Menus offer an easy way to build custom, accessible dropdown components with robust support
        for keyboard navigation.
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
          <Menu.Items className='absolute right-0 mt-2 w-52 origin-top-right space-y-1 rounded-md bg-rose-600 p-1 shadow-lg ring-2 ring-blue-500 ring-opacity-5 focus:outline-none'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`flex w-full items-center justify-between rounded-md py-1.5 px-3 ${
                    active ? 'bg-blue-500 text-white' : 'text-zinc-700'
                  }`}
                >
                  <div>Action</div>
                  <FireIcon />
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
                  <FireIcon />
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
