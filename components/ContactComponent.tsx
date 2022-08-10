import { ExternalLinkIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export default function ContactComponent({
  href,
  imgSrc,
  name,
  title,
}: {
  href: string;
  imgSrc: string;
  name: string;
  title: string;
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='group flex w-auto items-center justify-between space-x-2 rounded-lg  border border-zinc-300 bg-white py-2 px-3 shadow  hover:border-zinc-800 hover:ring-2 hover:ring-zinc-300 sm:px-4'
    >
      <section className='flex items-center space-x-2 overflow-hidden sm:space-x-3'>
        <Image src={imgSrc} height={20} width={20} alt={name} />
        <div className='truncate font-medium text-zinc-700'>{name}</div>
      </section>
      <ExternalLinkIcon
        className='h-5 w-5 pt-0.5 text-zinc-500 group-hover:stroke-2 group-hover:text-zinc-700'
        strokeWidth={1.5}
      />
    </a>
  );
}
