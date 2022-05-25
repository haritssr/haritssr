import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';

const Data = [
  {
    title: 'Lorem ipsum dolor, sit amet consectetur.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.',
  },
  {
    title: 'Lorem ipsum dolor, sit amet.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.',
  },
  {
    title: 'Lorem ipsum dolor, sit.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur atque asperiores, officiis placeat, totam deserunt aliquam exercitationem inventore, perferendis beatae obcaecati deleniti libero quibusdam alias.',
  },
];

export default function ExportedDisclosure() {
  return (
    <LayoutToExperiments title='Disclosure' domain='Headless UI'>
      <SubTitle>
        A simple, accessible foundation for building custom UIs that show and hide content, like
        togglable accordion panels.{' '}
        <ExternalLink name='Source' href='https://headlessui.dev/react/disclosure' />
      </SubTitle>
      <div className='grid grid-cols-1 gap-16 sm:grid-cols-2'>
        <DisclosureChevron />
        <DisclosurePlus />
        <DisclosureChevronNaked />
        <DisclosurePlusNaked />
      </div>
    </LayoutToExperiments>
  );
}

const Wrapper = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <div>
      <div className='mb-2 font-bold text-zinc-700'>{title}</div>
      <div className='space-y-2'>{children}</div>
    </div>
  );
};

const DisclosureChevron = () => {
  return (
    <Wrapper title='Chevron + Transitions on Panel'>
      {Data.map(({ title, description }) => (
        <Disclosure className='w-full' as='div' key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between  border bg-zinc-100 px-3 py-2 ${
                  open ? 'rounded-t-md border-zinc-500' : 'rounded-md  border-zinc-300'
                }`}
              >
                <div className='truncate text-gray-700'>{title}</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-5 w-5 ${open ? 'rotate-180 transform duration-200' : 'transform'}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                </svg>
              </Disclosure.Button>
              <Transition
                enter='transition duration-300 ease-out'
                enterFrom='transform -top-10 opacity-0'
                enterTo='transform top-0 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Disclosure.Panel
                  className={`text-zinc-600 ${
                    open ? 'border-zinc-500' : 'border-zinc-300'
                  } rounded-b-md border-r border-l border-b  px-3 py-2`}
                >
                  {description}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosureChevronNaked = () => {
  return (
    <Wrapper title='Chevron Naked'>
      {Data.map(({ title, description }) => (
        <Disclosure className='w-full' as='div' key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between border-t  pr-3 pt-2 `}
              >
                <div
                  className={`truncate hover:text-zinc-700 ${
                    open ? 'font-medium text-zinc-700' : ' text-zinc-500'
                  }`}
                >
                  {title}
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-4 w-4 ${
                    open
                      ? 'rotate-180 transform text-zinc-800 duration-200'
                      : 'transform text-zinc-500'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                </svg>
              </Disclosure.Button>
              <Transition
                enter='transition duration-300 ease-out'
                enterFrom='transform -top-10 opacity-0'
                enterTo='transform top-0 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Disclosure.Panel
                  className={` text-zinc-600 ${
                    open ? 'border-zinc-500' : 'border-zinc-300'
                  } py-2 pl-7 text-sm`}
                >
                  {description}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosurePlus = () => {
  return (
    <Wrapper title='Plus'>
      {Data.map(({ title, description }) => (
        <Disclosure className='w-full' as='div' key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between border  bg-zinc-100 px-3 py-2 ${
                  open ? 'rounded-t-md border-zinc-500' : 'rounded-md border-zinc-300'
                }`}
              >
                <div className='truncate text-gray-700'>{title}</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-4 w-4 ${open ? 'rotate-45 transform duration-200' : 'transform'}`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel
                className={` text-zinc-600 ${
                  open ? 'border-zinc-500' : 'border-zinc-300'
                } rounded-b-md border-r border-l border-b  px-3 py-2`}
              >
                {description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};

const DisclosurePlusNaked = () => {
  return (
    <Wrapper title='Plus Naked'>
      {Data.map(({ title, description }) => (
        <Disclosure className='w-full' as='div' key={title}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`flex w-full items-center justify-between border-t  pr-3 pt-2 `}
              >
                <div
                  className={`truncate hover:text-zinc-700 ${
                    open ? 'font-medium text-zinc-700' : ' text-zinc-500'
                  }`}
                >
                  {title}
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={`h-4 w-4 ${
                    open
                      ? 'rotate-45 transform text-zinc-800 duration-200'
                      : 'transform text-zinc-500'
                  }`}
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
                </svg>
              </Disclosure.Button>
              <Disclosure.Panel
                className={` text-zinc-600 ${
                  open ? 'border-zinc-500' : 'border-zinc-300'
                } py-2 pl-7 text-sm`}
              >
                {description}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </Wrapper>
  );
};
