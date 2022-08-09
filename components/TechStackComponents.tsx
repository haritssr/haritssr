import Image from 'next/image';
import { ExternalLinkIcon } from '@heroicons/react/outline';

export const TechStackComponent = ({ title, data }) => {
  return (
    <div className='h-fit rounded-xl border border-zinc-200 overflow-hidden'>
      <div className='border-b bg-zinc-50 py-2 px-3 truncate sm:px-5 text-zinc-600 sm:text-base text-tiny'>{title}</div>
      <div className='space-y-1 p-2'>
        {data.map(d => (
          <a
            key={d.name}
            title={d.href}
            href={d.href}
            target='_blank'
            rel='noreferrer noopener'
            className='group flex w-auto items-center justify-between space-x-2 rounded-lg py-1.5 px-1 sm:px-3 hover:bg-zinc-100'
          >
            <section className='flex items-center space-x-2 overflow-hidden'>
              <Image src={d.imgSrc} height={20} width={20} alt={d.name} />
              <div className='truncate font-medium text-zinc-700'>{d.name}</div>
            </section>
            <ExternalLinkIcon
              className='h-5 w-5 pt-0.5 text-zinc-500 group-hover:text-zinc-700 hidden sm:block'
              strokeWidth={1.5}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
