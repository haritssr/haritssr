import Link from 'next/link';
import { ChevronLeftIcon, ExternalLinkIcon } from '@heroicons/react/outline';

export function TitleBack({ name, href }: { name: string; href: string }) {
  return (
    <div className='py-8'>
      <button
        className='group mb-5 flex flex-row items-center space-x-1 sm:-ml-5'
        onClick={() => history.back()}
      >
        <ChevronLeftIcon
          className='h-5 w-5 text-blue-600 group-hover:text-blue-600'
          strokeWidth={2}
        />
        <div className='text-blue-500 hover:underline  group-hover:text-blue-600'>{href}</div>
      </button>
      <h1 className='z-40 mx-auto block h-auto w-full text-left text-3xl font-bold text-zinc-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return <div className='mb-8 break-words pb-5 text-zinc-600'>{children}</div>;
}

export const Topic = ({ name }: { name: string }) => {
  return <h2 className='mb-4 text-xl font-semibold text-zinc-700'>{name}</h2>;
};

export const TopicWork = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link href={href}>
      <a>
        <h2 className='mb-2 text-xl font-semibold text-zinc-700 hover:underline'>{name}</h2>
      </a>
    </Link>
  );
};

export const SubTopic = ({ children }: { children: React.ReactNode }) => {
  return <p className='mb-2 text-zinc-400 '>{children}</p>;
};

export function InternalLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href}>
      <a className='group flex w-fit cursor-pointer items-center justify-start text-[17px] text-blue-600 hover:underline sm:text-base'>
        <p>{name}</p>
        {/* arrow right icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 pt-[0.25px] text-blue-600 group-hover:underline'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      </a>
    </Link>
  );
}

export function InternalLinkWithoutArrow({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href}>
      <a className='inline cursor-pointer text-lg text-blue-600 hover:underline sm:text-base'>
        {name}
      </a>
    </Link>
  );
}

export function ErrorBagde({ name }: { name: string }) {
  return (
    <span className='rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm text-red-500'>
      {name}
    </span>
  );
}

export function ExternalLink({ name, href }: { name: string; href: string }) {
  return (
    <cite className='not-italic'>
      {' '}
      <a
        title={href}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-block w-fit cursor-pointer items-center text-blue-500 hover:underline active:text-blue-500'
      >
        <div className='flex items-center'>
          <div>{name}</div>
          {/* arrow upper right icon */}
          <ExternalLinkIcon
            className='ml-1 h-4 w-4 text-blue-500 group-hover:underline '
            strokeWidth={2}
          />
        </div>
      </a>{' '}
    </cite>
  );
}

export function ExternalCodeLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a href={href} target='_blank' rel='noreferrer noopener'>
      {' '}
      <code className='rounded border border-purple-200 bg-purple-50 px-1.5 py-0.5 text-sm text-purple-500 duration-100 '>
        {children}
      </code>{' '}
    </a>
  );
}

/*
export const inputStyle =
  'rounded-md border-[1.4px] border-zinc-500 hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 px-2 py-1 placeholder:text-zinc-500 w-full ';

export const buttonStyle =
  'px-3 bg-blue-600 hover:bg-blue-600/90 text-white rounded-md py-1.5 text-center cursor-pointer';
*/
