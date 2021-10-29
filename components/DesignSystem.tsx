import Link from 'next/link';

export function TitleBack({ name, href }) {
  return (
    <div className='pt-10 pb-8'>
      <button
        className='flex flex-row items-center mb-5 -ml-4 -space-x-1 sm:-ml-5 sm:-space-x-0 group'
        onClick={() => history.back()}
      >
        <LeftArrow />
        <div className='text-gray-500 group-hover:text-blue-600 '>{href}</div>
      </button>
      <h1 className='z-40 block w-full h-auto mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        {name}
      </h1>
    </div>
  );
}

export function TitleBackHome({ title }) {
  return (
    <div className='pt-10 pb-8'>
      <Link href='/'>
        <a>
          <button className='flex flex-row items-center mb-5 -ml-4 -space-x-1 sm:-ml-5 sm:-space-x-0 group'>
            <LeftArrowHome />
            <div className='text-gray-500 group-hover:text-blue-600 '>Home</div>
          </button>
        </a>
      </Link>
      <h1 className='z-40 block w-full h-auto mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        {title}
      </h1>
    </div>
  );
}

export function Title({ name }) {
  return (
    <h1 className='z-40 block w-full h-auto py-10 mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
      {name}
    </h1>
  );
}

export function SubTitle({ children }) {
  return <h2 className='mb-10 -mt-5 text-gray-500'>{children}</h2>;
}

export const Topic = ({ name }) => {
  return <h3 className='mb-2 text-xl font-semibold text-gray-700 '>{name}</h3>;
};

export const SubTopic = ({ children }) => {
  return <h3 className='mb-3 -mt-2 text-lg text-gray-500 '>{children}</h3>;
};

export function InternalLink({ name, href }) {
  return (
    <Link href={href}>
      <a className='flex items-center space-x-2 text-blue-600 cursor-pointer hover:underline active:text-purple-600'>
        {name}
        <RightArrow />
      </a>
    </Link>
  );
}

export function NAInternalLink({ name, href }) {
  return (
    <Link href={href}>
      <a className='flex items-center space-x-2 cursor-pointer text-rose-600 hover:underline'>
        {name}
        <NARightArrow />
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

export function NAExternalLink({ name, href }) {
  return (
    <a
      href={href}
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
      className='w-4 h-4 pt-0.5 text-blue-400'
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
      className='w-4 h-4 pt-0.5 text-rose-500'
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
      className='w-5 h-5 text-blue-500 pt-0.5'
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

const LeftArrowHome = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 text-gray-500 group-hover:text-blue-600'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 19l-7-7 7-7' />
    </svg>
  );
};

const LeftArrow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 text-gray-500 group-hover:text-blue-600 sm:pt-0.5'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 19l-7-7 7-7' />
    </svg>
  );
};
