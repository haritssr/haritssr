import { ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function ExperimentsIndexBox({
  title,
  imgSrc,
  href,
  sum,
  type,
}: {
  title: string;
  imgSrc: string;
  href: string;
  sum: number;
  type: string;
}) {
  return (
    <div className='flex flex-col justify-between rounded-lg border border-zinc-300 bg-white p-3 shadow'>
      <div className='space-y-1 sm:space-y-2'>
        <div className='flex items-center space-x-2'>
          <Image src={imgSrc} height={20} width={20} alt={title} />
          <div className='truncate text-lg font-semibold text-zinc-700 sm:text-xl'>{title}</div>
        </div>
        <div className='w-fit rounded-md border border-purple-500 px-2 py-0.5 text-center text-[12px] text-purple-600'>
          {type}
        </div>
        <div className='text-zinc-600'>{sum} Experiments</div>
      </div>
      <Link href={href}>
        <a className='group mt-5 flex w-full cursor-pointer items-center justify-center rounded-md border border-blue-500 bg-blue-500 px-3  pb-[4px] pt-1 text-sm text-white duration-200 hover:bg-white hover:text-blue-600'>
          <p className='xs:hidden'>See all</p>
          <p className='xs:inline hidden'>See experiments</p>
        </a>
      </Link>
    </div>
  );
}
