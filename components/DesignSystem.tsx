import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import { useState } from 'react';

export function TitleBack({ name, href }: { name: string; href: string }) {
  return (
    <div className='py-8'>
      <button
        className='group mb-5 flex flex-row items-center sm:-ml-5'
        onClick={() => history.back()}
      >
        <ChevronLeftIcon className='h-5 w-5 text-blue-600' strokeWidth={2} />
        <div className='text-blue-500 hover:underline '>{href}</div>
      </button>
      <h1 className='z-40 mx-auto block h-auto w-full text-left text-3xl font-bold text-zinc-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return <div className='mb-8 break-words pb-5 text-zinc-600'>{children}</div>;
}

export const Topic = ({ name }: { name: string }) => {
  return <h2 className='mb-4 text-xl font-semibold text-zinc-700'>{name}</h2>;
};

export const TopicWork = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link href={href}>
      <a>
        <h2 className='mb-2 text-xl font-semibold text-zinc-700 hover:underline'>{name}</h2>
      </a>
    </Link>
  );
};

export const SubTopic = ({ children }: { children: React.ReactNode }) => {
  return <p className='mb-2 text-zinc-400 '>{children}</p>;
};

export function InternalLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href}>
      <a className='group flex w-fit cursor-pointer items-center justify-start text-[17px] text-blue-600 hover:underline sm:text-base'>
        <p>{name}</p>
        <ChevronRightIcon
          className='h-4 w-4 pt-[0.25px] text-blue-600 group-hover:underline'
          strokeWidth={2}
        />
      </a>
    </Link>
  );
}

export function InternalLinkWithoutArrow({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href}>
      <a className='inline cursor-pointer text-lg text-blue-600 hover:underline sm:text-base'>
        {name}
      </a>
    </Link>
  );
}

export function ErrorBagde({ name }: { name: string }) {
  return (
    <span className='rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm text-red-500'>
      {name}
    </span>
  );
}

export function ExternalLink({ name, href, big }: { name: string; href: string; big?: boolean }) {
  return (
    <cite className='not-italic'>
      {' '}
      <a
        title={href}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-block w-fit cursor-pointer items-center text-blue-600 hover:underline active:text-blue-600'
      >
        <span className='flex items-center'>
          <span className={`${big ? 'text-lg font-medium' : 'text-base'}`}>{name}</span>
          <ExternalLinkIcon
            className={`${
              big ? 'h-[18px] w-[18px]' : 'h-4 w-4'
            } ml-1  text-blue-600 group-hover:underline`}
            strokeWidth={`${big ? 2.2 : 2}`}
          />
        </span>
      </a>{' '}
    </cite>
  );
}

export function ExternalCodeLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a href={href} target='_blank' rel='noreferrer noopener'>
      {' '}
      <code className='rounded border border-purple-200 bg-purple-50 px-1.5 py-0.5 text-sm text-purple-500 duration-100 '>
        {children}
      </code>{' '}
    </a>
  );
}
