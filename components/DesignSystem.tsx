import Link from 'next/link';
import { ArrowUpRight, LeftArrow, RightArrow } from './Icons';

export function TitleBack({ name, href }) {
  return (
    <div className='py-8'>
      <button
        className='flex flex-row items-center mb-5 -ml-5 group'
        onClick={() => history.back()}
      >
        <LeftArrow />
        <div className='text-gray-500 group-hover:text-gray-700 '>{href}</div>
      </button>
      <h1 className='z-40 block w-full h-auto mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

// /work/tailwindcss/ios15.tsx -> /work/tailwindcss
export function TitleBackToTopic({ title, href, hrefName }) {
  return (
    <div className='pt-8 pb-5 '>
      <Link href={href}>
        <a className='inline-block'>
          <div className='flex flex-row items-center pl-2 pr-2.5 py-1 justify-center mb-4 group rounded-md bg-zinc-100 border border-zinc-200 hover:bg-zinc-200 hover:border-zinc-300'>
            <LeftArrow />
            <div className='text-blue-500 group-hover:text-blue-700'>Back to {hrefName}</div>
          </div>
        </a>
      </Link>
      <h1 className='z-40 block w-full h-auto mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        {title}
      </h1>
    </div>
  );
}

export function SubTitle({ children }) {
  return <p className='mb-10 -mt-3 text-lg text-gray-600'>{children}</p>;
}

export const Topic = ({ name }) => {
  return <h2 className='mb-2 text-xl font-semibold text-gray-700 '>{name}</h2>;
};

export const TopicWork = ({ name, href }) => {
  return (
    <Link href={href}>
      <a>
        <h2 className='mb-2 text-xl font-semibold text-gray-700 hover:underline'>{name}</h2>
      </a>
    </Link>
  );
};

export const SubTopic = ({ children }) => {
  return <p className='mb-4 -mt-1 text-gray-500 '>{children}</p>;
};

export function InternalLink({ name, href }) {
  return (
    <Link href={href}>
      <a className='flex items-center text-blue-600 cursor-pointer hover:underline active:text-purple-600'>
        <p className='truncate'>{name}</p>
        <RightArrow />
      </a>
    </Link>
  );
}

export function ExternalLink({ name, href }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='flex items-center text-blue-600 cursor-pointer hover:underline '
    >
      <div>{name}</div>
      <ArrowUpRight />
    </a>
  );
}
