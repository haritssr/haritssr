import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function ExportedDialog() {
  return (
    <LayoutToExperiments title='Dialog' domain='Headless UI'>
      <SubTitle>
        <ExternalLink name='Headless UI Dialog' href='https://headlessui.dev/react/dialog' />
        <br />A fully-managed, renderless dialog component jam-packed with accessibility and
        keyboard features, perfect for building completely custom modal and dialog windows for your
        next application.
      </SubTitle>

      <div className='space-y-10'>
        <Wrapper title='Dialog without transition'>
          <DialogExample1 />
        </Wrapper>
        <Wrapper title='Dialog with transition'>
          <DialogExample2 />
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

const DialogExample1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className={`rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 active:ring-orange-500 ${
          isOpen ? 'ring-2 ring-orange-500' : ''
        }`}
      >
        Open dialog
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2'
      >
        <Dialog.Overlay className='fixed inset-0 bg-zinc-800/80' />

        <div className='relative z-50 rounded-md bg-white p-4 shadow-xl'>
          <Dialog.Title className='text-xl font-semibold'>Title</Dialog.Title>
          <Dialog.Description className='text-zinc-600'>
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s.
          </Dialog.Description>
          <div className='flex w-full justify-end'>
            <button
              className='rounded-md px-2 py-1 text-blue-500 hover:bg-zinc-100 hover:text-blue-600'
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const DialogExample2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className={`rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 active:ring-orange-500 ${
          isOpen ? 'ring-2 ring-orange-500' : ''
        }`}
      >
        Open dialog
      </button>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-2/3 sm:w-1/2'
        >
          <Transition.Child
            enter='duration-300 ease-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='duration-200 ease-in'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-zinc-800/80' />
          </Transition.Child>

          <div className='relative z-50 rounded-md bg-white p-4 shadow-xl'>
            <Dialog.Title className='text-xl font-semibold'>Title</Dialog.Title>
            <Dialog.Description className='text-zinc-600'>
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry&apos;s standard dummy text ever since the 1500s.
            </Dialog.Description>
            <div className='flex w-full justify-end'>
              <button
                className='rounded-md px-2 py-1 text-blue-500 hover:bg-zinc-100 hover:text-blue-600'
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
