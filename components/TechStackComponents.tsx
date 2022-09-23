import Image from 'next/future/image';
import { ExternalLinkIcon } from '@heroicons/react/outline';

export const TechStackComponent = ({ title, data }) => {
  return (
    <div className='h-fit overflow-hidden rounded-lg border border-zinc-300'>
      <div className='truncate border-b border-zinc-300 bg-gradient-to-b from-zinc-50 via-zinc-50/50 to-zinc-50/20 py-2 px-3 text-tiny font-medium text-zinc-600 sm:px-3 sm:text-base'>
        {title}
      </div>
      <div className='space-y-1 bg-white p-2'>
        {data.map(d => (
          <a
            key={d.name}
            title={d.href}
            href={d.href}
            target='_blank'
            rel='noreferrer noopener'
            className='group flex w-auto items-center justify-between space-x-2 rounded-md py-1.5 px-1 hover:bg-zinc-100 sm:px-2'
          >
            <section className='flex items-center space-x-2 overflow-hidden'>
              <Image src={d.imgSrc} height={20} width={20} alt={d.name} />
              <div className='truncate text-zinc-500 group-hover:text-zinc-700'>{d.name}</div>
            </section>
            <ExternalLinkIcon
              className='hidden h-5 w-5 pt-0.5 text-zinc-500 group-hover:text-zinc-700 sm:block'
              strokeWidth={1.5}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
