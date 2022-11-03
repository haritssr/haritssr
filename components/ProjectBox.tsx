import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
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
      className='group flex w-full flex-col justify-between overflow-hidden rounded-lg border border-apple-gray3 selection:mx-auto hover:border-zinc-800'
    >
      <section className=' flex flex-col justify-between  bg-white p-3'>
        <div className='mb-4 flex items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            {imgSrc}
            <div className='truncate text-lg font-semibold text-zinc-700 sm:text-xl'>{title}</div>
          </div>
          {/* External Link Icon */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5 text-apple-gray1 group-hover:text-zinc-800 duration-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
          </svg>
        </div>

        <div className='mb-2 text-zinc-800'>{description}</div>

        <div className='text-blue-600'>
          {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
        </div>
      </section>
      <section className='flex flex-col space-y-1.5 border-t border-zinc-300 bg-apple-gray6 px-3 py-3 text-zinc-800 sm:text-sm'>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-800'>Period</div>
            <div>:</div>
          </div>
          <div>{period}</div>
        </article>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-800'>Status</div>
            <div>:</div>
          </div>
          <div>{status}</div>
        </article>
        <div className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div className='font-semibold text-zinc-800'>Industry</div>
            <div>:</div>
          </div>
          <div>{industry}</div>
        </div>
      </section>
    </a>
  );
}
