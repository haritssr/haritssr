import Link from 'next/link';

export default function KotakWork({ href, title, description }) {
  return (
    <Link href={href}>
      <a className='flex flex-col overflow-hidden duration-200 rounded-lg active:translate-y-0.5 active:ring-2 active:ring-gray-500  h-auto px-4 py-3 space-y-1 bg-white shadow hover:ring-2 hover:ring-blue-500  '>
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold text-gray-700 '>{title}</div>
          <ListIcon />
        </div>
        <div className='border-b border-gray-200' />
        <div className='text-gray-600 '>{description}</div>
      </a>
    </Link>
  );
}

const ListIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-5 h-5 text-gray-500'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
      />
    </svg>
  );
};
