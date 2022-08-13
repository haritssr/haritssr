import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import ExplanationList from '@/components/ExplanationList';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ChevronDownIcon } from '@heroicons/react/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function ExportedDropdownMenu() {
  const item =
    'px-5 py-0.25 w-full bg-white text-gray-700 hover:bg-blue-500 hover:text-white text-tiny hover:cursor-pointer';
  const group = 'mb-2';
  return (
    <LayoutToExperiments title='Dropdown Menu' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/dropdown-menu'
          name='Radix UI Dropdown Menu'
        />
        <ExplanationList>
          <li>
            Displays a menu to the user—such as a set of actions or functions—triggered by a button.
          </li>
          <li>Click the button and the set of action or nested set of action will appear.</li>
        </ExplanationList>
      </SubTitle>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className='rounded-md bg-blue-500 py-1.5 px-3 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-800'>
          Option
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='w-full divide-y divide-gray-400 rounded border border-gray-500 bg-white shadow-xl '>
          <DropdownMenu.Arrow className='fill-white stroke-zinc-500 shadow' />
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
              <DropdownMenu.TriggerItem className={`${item} flex items-center justify-between`}>
                <div>Arrage by</div>
                <ChevronDownIcon className='h-3 w-3' />
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
    </LayoutToExperiments>
  );
}
