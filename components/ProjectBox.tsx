import { ExternalLinkIcon } from '@heroicons/react/outline';
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
    <section className='mx-auto flex w-full flex-col justify-between overflow-hidden rounded-md border border-zinc-300 shadow'>
      <section className='flex flex-col justify-between px-4 pb-4 pt-5'>
        <div className='mb-2 flex items-center justify-between'>
          <div className='text-xl font-semibold text-zinc-700'>{title}</div>
          {imgSrc}
        </div>

        <div className='mb-4 text-zinc-600 sm:text-tiny'>{description}</div>
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center text-blue-500 hover:cursor-pointer hover:underline sm:text-tiny'
        >
          {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}

          <ExternalLinkIcon className='ml-1 h-4 w-4 pt-0.5 text-blue-500' />
        </a>
      </section>
      <section className='flex flex-col space-y-0.5 border-t border-zinc-400 bg-gray-100 px-4 py-3 text-zinc-700 sm:text-[12px]'>
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
    </section>
  );
}
