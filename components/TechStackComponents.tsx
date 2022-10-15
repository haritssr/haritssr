import Image from 'next/future/image';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

export const TechStackComponent = ({ title, data }) => {
  return (
    <div className='h-fit overflow-hidden rounded-md border border-apple-gray5 bg-white'>
      <div className='truncate px-3 pt-2 text-tiny font-semibold text-zinc-700 sm:px-3 sm:text-base'>
        {title}
      </div>
      <div className='space-y-1 p-2'>
        {data.map(d => (
          <a
            key={d.name}
            title={d.href}
            href={d.href}
            target='_blank'
            rel='noreferrer noopener'
            className='group flex w-auto items-center justify-between space-x-2 rounded-md py-1.5 px-1 hover:bg-zinc-50 sm:px-2'
          >
            <section className='flex items-center space-x-2 overflow-hidden'>
              <Image src={d.imgSrc} height={18} width={18} alt={d.name} className='aspect-auto' />
              <div className='truncate text-zinc-500 group-hover:text-zinc-700'>{d.name}</div>
            </section>
            <ArrowTopRightOnSquareIcon
              className='hidden h-5 w-5 pt-0.5 text-white group-hover:text-zinc-500 sm:block'
              strokeWidth={1.5}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
