import { Menu } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';

//Menu (Dropdown)
export default function MyDropdown() {
  return (
    <>
      <Topic name='Dropdown' />
      <Menu as='div'>
        <Menu.Button>More</Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href='/account-settings'>
                Account settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && 'bg-blue-500'}`} href='/account-settings'>
                Documentation
              </a>
            )}
          </Menu.Item>
          <Menu.Item disabled>
            <span className='opacity-75'>Invite a friend (coming soon!)</span>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </>
  );
}
