import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function InternalLink({ name, href }: { name: string; href: string }) {
  return (
    <Link
      passHref
      href={href}
      className='group flex w-fit cursor-pointer items-center justify-start py-0.5 text-[17px] text-blue-600 hover:text-blue-700 hover:underline sm:text-base'
    >
      <p>{name}</p>
      <ChevronRightIcon
        className='h-3.5 w-3.5 pt-[0.25px] text-blue-600 duration-200 group-hover:translate-x-1 group-hover:text-blue-700 group-hover:underline'
        strokeWidth={2}
      />
    </Link>
  );
}
