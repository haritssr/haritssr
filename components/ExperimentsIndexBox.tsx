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
    <div className='flex flex-col justify-between rounded-lg border border-zinc-200 bg-gradient-to-bl from-zinc-50 via-white  to-white p-3 shadow'>
      <div className='space-y-1 sm:space-y-2'>
        <div className='flex items-center space-x-2'>
          <Image src={imgSrc} height={20} width={20} alt={title} />
          <div className='truncate text-lg font-semibold text-zinc-700 sm:text-xl'>{title}</div>
        </div>
        <div className='text-zinc-500'>{sum} Experiments</div>
        <div className='text-zinc-500'>Version: {ver}</div>

        <div className='w-fit rounded-full border border-zinc-400 px-3 py-0.5 text-center text-[12px] text-zinc-500'>
          {type}
        </div>
      </div>
      <Link href={href}>
        <a className='group mt-7 flex w-full cursor-pointer items-center justify-center rounded-md border border-zinc-300 bg-zinc-200/80 px-3 pb-[5px]  pt-1.5 text-sm font-medium text-zinc-800 duration-75 hover:bg-zinc-100 active:scale-95'>
          <p className='xs:hidden'>See all</p>
          <p className='hidden xs:inline'>See experiments</p>
        </a>
      </Link>
    </div>
  );
}
