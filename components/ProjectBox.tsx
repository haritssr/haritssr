import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/outline';
import Image from 'next/future/image';
import { ReactElement } from 'react';

interface ProjectBoxTypes {
  href: string;
  title: string;
  description: string;
  period: string | null;
  status: string;
  imgSrc: ReactElement;
  industry: string;
}

export default function ProjectsBox({
  href,
  title,
  description,
  period,
  status,
  imgSrc,
  industry,
}: ProjectBoxTypes) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group flex w-full flex-col justify-between overflow-hidden rounded-lg border border-apple-gray3 selection:mx-auto hover:border-apple-gray1'
    >
      <section className=' flex flex-col justify-between  bg-white p-3'>
        <div className='mb-4 flex items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            {imgSrc}
            <div className='truncate text-lg font-semibold text-zinc-600'>{title}</div>
          </div>
          <ExternalLinkIcon
            strokeWidth={1.5}
            className='h-5 w-5 text-apple-gray1 duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
          />
        </div>

        <div className='mb-2 text-zinc-600 sm:text-tiny'>{description}</div>

        <div className='text-blue-500 sm:text-tiny'>
          {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
        </div>
      </section>
      <section className='flex flex-col space-y-0.5 border-t border-zinc-300 bg-apple-gray6 px-3 py-3 text-zinc-500 sm:text-[12px]'>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-700'>Period</div>
            <div>:</div>
          </div>
          <div>{period}</div>
        </article>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-700'>Status</div>
            <div>:</div>
          </div>
          <div>{status}</div>
        </article>
        <div className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-700'>Industry</div>
            <div>:</div>
          </div>
          <div>{industry}</div>
        </div>
      </section>
    </a>
  );
}
