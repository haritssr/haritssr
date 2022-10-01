import { ChevronRightIcon } from '@heroicons/react/outline';
import Image from 'next/future/image';
import Link from 'next/link';

export default function ExperimentsIndexBox({
  title,
  imgSrc,
  href,
  sum,
  type,
  ver,
}: {
  title: string;
  imgSrc: string;
  href: string;
  sum: number;
  type: string;
  ver: string;
}) {
  return (
    <Link href={href}>
      <a className='group flex flex-col justify-between space-y-1 rounded-md border border-zinc-300 bg-gradient-to-bl from-zinc-50 via-white to-white py-3 pl-3 pr-2 hover:border-zinc-500 sm:space-y-2'>
        <div className='flex items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            <Image src={imgSrc} height={18} width={18} alt={title} />
          </div>
          <div className='flex items-center'>
            <div className='text-zinc-400'>{sum}</div>
            <ChevronRightIcon className='h-5 w-5 text-zinc-400 duration-100 group-hover:translate-x-0.5' />
          </div>
        </div>
        <div className='truncate text-lg font-semibold text-zinc-700'>{title}</div>
        <div className='flex w-full flex-col items-start space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
          <div className='w-fit rounded border border-dashed border-zinc-400 px-2 py-0.5 text-center text-[12px] text-zinc-500'>
            {type}
          </div>
          <div className='w-fit rounded border border-dashed border-zinc-400 px-2 py-0.5 text-center text-[12px] text-zinc-500'>
            v{ver}
          </div>
        </div>
      </a>
    </Link>
  );
}
