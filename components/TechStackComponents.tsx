import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/future/image';
import { ClassAttributes, HTMLAttributes } from 'react';

export const TechStackComponent = (
  {
    domain,
    links,
  }: { domain?: string; links?: Array<{ href: string; imgSrc: string; name: string }> },
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>
) => {
  return (
    <div
      {...props}
      className='h-fit overflow-hidden rounded-md border border-apple-gray4  bg-white'
    >
      <div className='truncate border-b border-apple-gray4 px-3 py-1.5 text-tiny font-semibold text-zinc-700 sm:text-base'>
        {domain}
      </div>
      <div className='space-y-1 px-3 py-2'>
        {links?.map(({ href, imgSrc, name }) => {
          return (
            <a
              key={name}
              title={href}
              href={href}
              target='_blank'
              rel='noreferrer noopener'
              className='group flex w-auto items-center justify-between space-x-2 rounded-md py-1.5 px-1 hover:bg-apple-gray6 sm:px-2'
            >
              <section className='flex items-center space-x-2 overflow-hidden'>
                <Image src={imgSrc} height={18} width={18} alt={name} className='aspect-auto' />
                <div className='truncate text-zinc-500 group-hover:text-zinc-700'>{name}</div>
              </section>
              <ArrowUpRightIcon
                className='hidden h-4 w-4 pt-0.5 text-white group-hover:text-zinc-500 sm:block'
                strokeWidth={1.5}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};
