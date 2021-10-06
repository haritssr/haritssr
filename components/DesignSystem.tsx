import Link from 'next/link';

export function Title({ name }) {
  return (
    <div className='py-5'>
      <h1 className='z-40 block w-full h-auto mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

export function SubTitle({ name }) {
  return <h2 className='mb-10 '>{name}</h2>;
}

export const Topic = ({ name }) => {
  return <h3 className='mb-2 text-xl font-semibold text-gray-800 sm:text-2xl '>{name}</h3>;
};

export function InternalLink({ name, to }) {
  return (
    <Link href={to}>
      <a className='flex items-center space-x-2 text-blue-600 cursor-pointer hover:underline'>
        {name}
        <RightArrow />
      </a>
    </Link>
  );
}

export function NAInternalLink({ name, to }) {
  return (
    <Link href={to}>
      <a className='flex items-center space-x-2 cursor-pointer text-rose-600 hover:underline'>
        {name}
        <NARightArrow />
      </a>
    </Link>
  );
}

export function ExternalLink({ name, to }) {
  return (
    <a
      href={to}
      target='_blank'
      rel='noreferrer'
      className='flex items-center text-blue-600 cursor-pointer hover:underline '
    >
      <div>{name}</div>
      <ArrowUpRight />
    </a>
  );
}

export function NAExternalLink({ name, to }) {
  return (
    <a
      href={to}
      target='_blank'
      rel='noreferrer'
      className='flex items-center cursor-pointer text-rose-600 hover:underline '
    >
      <div>{name}</div>
      <NAArrowUpRight />
    </a>
  );
}

const RightArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 pt-0.5 text-blue-600'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};

const NARightArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4 pt-0.5 text-rose-600'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
    </svg>
  );
};

const ArrowUpRight = () => {
  return (
    <svg
      className='w-5 h-5 text-blue-600 pt-0.5'
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
  );
};

const NAArrowUpRight = () => {
  return (
    <svg
      className='w-5 h-5 text-rose-600 pt-0.5'
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
  );
};
