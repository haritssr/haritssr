import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import { Popover, Transition } from '@headlessui/react';

export default function ExportedPopover() {
  return (
    <LayoutToExperiments title='Popover' domain='Headless UI'>
      <SubTitle>
        <ExternalLink name='Headless UI Popover' href='https://headlessui.dev/react/dialog' />
        <br />A fully-managed, renderless dialog component jam-packed with accessibility and
        keyboard features, perfect for building completely custom modal and dialog windows for your
        next application.
      </SubTitle>
      <div className='space-y-10'>
        <Wrapper title='Popover Navigation'>
          <PopoverExample1 />
        </Wrapper>
        <Wrapper title='Popover with Transition'>
          <PopoverExample2 />
        </Wrapper>
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <div className='mb-1 font-semibold text-zinc-700'>{title}</div>
      {children}
    </div>
  );
};

const PopoverExample1 = () => {
  return (
    <Popover>
      <Popover.Button className='rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700'>
        Navigation
      </Popover.Button>
      <Popover.Panel className='w-full  sm:w-fit'>
        <div className='divide-y divide-zinc-400 rounded-md bg-zinc-800 text-zinc-200'>
          <div className='px-3 py-1.5'>Experiments</div>
          <div className='px-3 py-1.5'>Blog</div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

const PopoverExample2 = () => {
  return (
    <Popover>
      <Popover.Button className='rounded border border-zinc-400 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-700'>
        Navigation
      </Popover.Button>
      <Transition
        enter='duration-300 ease-out'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='duration-200 ease-in'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <Popover.Panel className='w-full  sm:w-fit'>
          <div className='divide-y divide-zinc-400 rounded-md bg-zinc-800 text-zinc-200'>
            <div className='px-3 py-1.5'>Experiments</div>
            <div className='px-3 py-1.5'>Blog</div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
