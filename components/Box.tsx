export default function Box({
  href,
  title,
  children,
  name,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
  name: string;
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='flex items-center justify-start w-auto py-2 space-x-2 rounded-md sm:py-2 group'
    >
      <div className='flex items-center space-x-3 overflow-hidden'>
        {children}
        <div className='font-medium text-gray-500 group-hover:text-gray-700'>{name}</div>
      </div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='w-5 h-5 text-gray-400 group-hover:text-gray-700 pt-0.5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={1.5}
          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
        />
      </svg>
    </a>
  );
}
