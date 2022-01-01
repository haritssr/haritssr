import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function DropdownMenuDemo() {
  const item =
    'px-5 py-0.25 w-full bg-white text-gray-700 hover:bg-blue-500 hover:text-white text-tiny hover:cursor-pointer';
  const group = 'mb-2';
  // const label = 'text-sm text-gray-600 pl-5';
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className='py-1.5 px-3 rounded-md font-medium hover:bg-blue-600 bg-blue-500 text-white focus:outline-none focus:ring-1 focus:ring-blue-800'>
        Option
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className='w-full bg-white border border-gray-500 divide-y divide-gray-400 rounded shadow-xl '>
        {/* <DropdownMenu.Label /> */}
        {/* <DropdownMenu.Label className={label}>Group</DropdownMenu.Label> */}
        <DropdownMenu.Group className={group}>
          <DropdownMenu.Item className={item}>New File</DropdownMenu.Item>{' '}
          <DropdownMenu.Item className={item}>New Folder</DropdownMenu.Item>
          <DropdownMenu.Item className={item}>New Page</DropdownMenu.Item>
        </DropdownMenu.Group>

        {/* <DropdownMenu.Label className={label}>Group</DropdownMenu.Label> */}
        <DropdownMenu.Group className={group}>
          <DropdownMenu.Item className={item}>Option 1</DropdownMenu.Item>
          <DropdownMenu.Item className={item}>Option 2</DropdownMenu.Item>
          <DropdownMenu.Item className={item}>Option 3</DropdownMenu.Item>

          <DropdownMenu.Root>
            <DropdownMenu.TriggerItem className={`${item} flex justify-between items-center`}>
              <div>Arrage by</div>
              <Icon />
            </DropdownMenu.TriggerItem>
            <DropdownMenu.Content className='divide-y divide-gray-500 shadow-xl'>
              <DropdownMenu.Item className={item}>List view</DropdownMenu.Item>
              <DropdownMenu.Item className={item}>Details View</DropdownMenu.Item>
              <DropdownMenu.Item className={item}>Icon view</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </DropdownMenu.Group>

        <DropdownMenu.Group className={group}>
          <DropdownMenu.Item className={item}>Action 1</DropdownMenu.Item>
          <DropdownMenu.Item className={item}>Action 2</DropdownMenu.Item>
          <DropdownMenu.Item className={item}>Action 3</DropdownMenu.Item>
        </DropdownMenu.Group>
        {/*  */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='w-3 h-3'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
  </svg>
);
