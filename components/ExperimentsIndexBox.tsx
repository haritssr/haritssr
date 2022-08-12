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
    <div className='flex flex-col justify-between rounded-lg border border-zinc-300 bg-gradient-to-bl from-zinc-50 via-white to-white px-4 pt-4 pb-3 shadow'>
      <div className='mb-5 space-y-1 sm:space-y-1.5'>
        <Image src={imgSrc} height={30} width={30} alt={title} />
        <div className='text-lg font-semibold text-zinc-700 sm:text-xl'>{title}</div>
        <div className='w-fit rounded-md border border-zinc-200  bg-zinc-100 px-2 py-0.5 text-center text-[12px] font-medium text-zinc-600'>
          {type}
        </div>
        <div className='text-zinc-500'>{sum} Experiments</div>
      </div>
      <Link href={href}>
        <a className='group flex w-fit cursor-pointer items-center justify-start text-[17px] text-blue-600 hover:underline sm:text-base'>
          <p className='xs:hidden'>See all</p>
          <p className='xs:inline hidden'>See all exploration</p>
          <ChevronRightIcon
            className='h-4 w-4 pt-[0.25px] text-blue-600 group-hover:underline'
            strokeWidth={2}
          />
        </a>
      </Link>
    </div>
  );
}
