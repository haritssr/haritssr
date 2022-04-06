import Link from 'next/link';
import { ReactElement } from 'react';

interface ProjectBoxTypes {
  href: string;
  title: string;
  description: string;
  period: string | null;
  status: string;
  imgSrc: ReactElement;
  industry: string;
  hrefCaseStudy: string;
}

export default function ProjectsBox({
  href,
  title,
  description,
  period,
  status,
  imgSrc,
  industry,
  hrefCaseStudy,
}: ProjectBoxTypes) {
  return (
    <section
      className={`flex flex-col justify-between overflow-hidden rounded border border-zinc-300`}
    >
      <section className='flex flex-col justify-between space-y-2 p-4'>
        <div className='flex items-center justify-between'>
          <div className='text-xl font-semibold text-zinc-700'>{title}</div>
          {imgSrc}
        </div>

        <div className='text-zinc-600 sm:text-tiny'>{description}</div>
        <div className='flex items-center text-zinc-400 hover:cursor-pointer hover:underline sm:text-tiny'>
          {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
          <svg
            className='h-4 w-4 pt-0.5 text-zinc-400'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            shapeRendering='geometricPrecision'
          >
            <path d='M7 17L17 7' />
            <path d='M7 7h10v10' />
          </svg>
        </div>
      </section>
      <section className='flex flex-col space-y-0.5 border-t border-b border-zinc-300 bg-zinc-100 px-3 py-2.5 text-zinc-500 sm:text-[12px]'>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div>Period</div>
            <div>:</div>
          </div>
          <div>{period}</div>
        </article>
        <article className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div>Status</div>
            <div>:</div>
          </div>
          <div>{status}</div>
        </article>
        <div className='flex items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <div>Industry</div>
            <div>:</div>
          </div>
          <div>{industry}</div>
        </div>
      </section>
      <Link href={hrefCaseStudy}>
        <a className='flex w-full items-center justify-between bg-zinc-200 px-3 py-2 font-medium text-zinc-700 hover:bg-zinc-300 sm:text-[12px]'>
          <div>Read case study</div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 text-zinc-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5l7 7-7 7' />
          </svg>
        </a>
      </Link>
    </section>
  );
}
