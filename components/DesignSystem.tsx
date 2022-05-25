import Link from 'next/link';
import { LeftArrow, RightArrowBlue } from './Icons';

export function TitleBack({ name, href }: { name: string; href: string }) {
  return (
    <div className='py-8'>
      <button
        className='group mb-5 flex flex-row items-center space-x-1 sm:-ml-5'
        onClick={() => history.back()}
      >
        <LeftArrow />
        <div className='text-zinc-400 hover:underline group-hover:text-zinc-800'>{href}</div>
      </button>
      <h1 className='z-40 mx-auto block h-auto w-full text-left text-3xl font-bold text-zinc-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

export function SubTitle({ children }: { children: React.ReactNode }) {
  return <div className='mb-8 break-words pb-5 text-zinc-500'>{children}</div>;
}

export const Topic = ({ name }: { name: string }) => {
  return <h2 className='text-xl font-semibold text-zinc-700'>{name}</h2>;
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
      <a className='group flex w-fit cursor-pointer items-center justify-start text-lg text-blue-600 hover:underline sm:text-base'>
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

export function ExternalLink({ name, href }: { name: string; href: string }) {
  return (
    <cite className='not-italic hover:underline'>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-block w-fit cursor-pointer items-center text-rose-500 hover:underline  active:text-rose-600'
      >
        <div className='flex items-center'>
          <div>{name}</div>
          {/* arrow upper right icon */}
          <svg
            className='-ml-0.5 h-5 w-5 pt-[0.25px] text-rose-400 group-hover:underline '
            viewBox='0 0 24 24'
            width='24'
            height='24'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
            shapeRendering='geometricPrecision'
          >
            <path d='M7 17L17 7' />
            <path d='M7 7h10v10' />
          </svg>
        </div>
      </a>
    </cite>
  );
}

export function ExternalCodeLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a href={href} target='_blank' rel='noreferrer noopener'>
      {' '}
      <code className='rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-sm text-orange-500 duration-100 hover:bg-zinc-200'>
        {children}
      </code>{' '}
    </a>
  );
}

export function BigInternalLink({ href, name }: { href: string; name: string }) {
  return (
    <Link href={href}>
      <a className='flex w-auto cursor-pointer items-center justify-center duration-300 ease-in-out'>
        <div className='text-lg font-medium text-blue-500 hover:underline'>{name}</div>
        <RightArrowBlue />
      </a>
    </Link>
  );
}
