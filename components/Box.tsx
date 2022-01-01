export const Box = ({ href, children }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      className='flex items-center justify-between w-auto px-3 py-2 space-x-2 duration-100 ease-out bg-white rounded-lg shadow hover:shadow-lg active:ring-2 active:ring-blue-500 group'
    >
      {children}
      <svg
        className='w-6 h-6 text-gray-400 group-hover:text-gray-600 pt-0.5'
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
    </a>
  );
};
