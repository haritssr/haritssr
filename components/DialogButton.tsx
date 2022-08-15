import { Dialog, Transition } from '@headlessui/react';
import React, { useState, Fragment } from 'react';
import ExplanationList from '@/components/ExplanationList';
import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline';

export default function DialogButton({
  children,
  titleDescription,
  titleButton,
}: {
  children: React.ReactNode;
  titleDescription: string;
  titleButton: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='my-5'>
      {/* <button
        type='button'
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-1 rounded-md border border-zinc-300 py-2 px-3 text-sm font-medium text-zinc-600 duration-200 hover:border-blue-600 hover:ring-2 hover:ring-blue-200 active:ring-2 active:ring-blue-600 ${
          isOpen ? 'ring-2 ring-blue-600' : ''
        }`}
      >
        <ExclamationCircleIcon className='h-5 w-5   text-zinc-600' />
        <span>{titleButton}</span>
      </button> */}
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className={`flex items-center space-x-1 rounded-md bg-blue-500 py-2 px-3 text-sm font-medium text-white duration-200 hover:bg-blue-600 ${
          isOpen ? 'ring-2 ring-orange-300' : ''
        }`}
      >
        <ExclamationCircleIcon className='text-white-600 h-5   w-5' />
        <span>{titleButton}</span>
      </button>
      {/* <Transition.Root show={isOpen} as={Fragment}> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='fixed inset-x-0 top-[25vh] z-40 mx-auto h-fit w-[90%] sm:w-1/3'
      >
        {/* <Transition.Child
            enter='duration-300 ease-out'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='duration-200 ease-in'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          > */}
        <Dialog.Overlay className='fixed inset-0 bg-zinc-800/80' />
        {/* </Transition.Child> */}

        <Dialog.Panel className='relative z-50 rounded-xl bg-white p-5 shadow-xl'>
          <div className='mb-3 flex items-center justify-between  '>
            <div className='w-fit rounded-full bg-blue-100 px-3 pb-1 pt-1.5 text-[13px] font-medium text-blue-700'>
              Reading
            </div>
            <div className='flex w-fit justify-end'>
              <button
                className='rounded-full bg-zinc-200 p-2 ring-inset hover:bg-zinc-300 active:ring-1 active:ring-zinc-600'
                onClick={() => setIsOpen(false)}
              >
                <XIcon className='h-4 w-4 text-zinc-700 hover:text-zinc-800' strokeWidth={3} />
              </button>
            </div>
          </div>
          <Dialog.Title as='div' className='mb-2 text-xl font-semibold'>
            <div className=''>{titleDescription}</div>
          </Dialog.Title>
          <Dialog.Description as='div' className='text-zinc-600'>
            <ExplanationList>{children}</ExplanationList>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
      {/* </Transition.Root> */}
    </div>
  );
}
