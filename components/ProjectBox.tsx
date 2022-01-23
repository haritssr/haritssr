import Link from 'next/link';

export default function ProjectsBox({
  href,
  title,
  description,
  period,
  color,
  status,
}: {
  href: string;
  title: string;
  description: string;
  period: string | null;
  color: string;
  status: string;
}) {
  const aStyle =
    'flex flex-col overflow-hidden rounded-lg active:ring-1 active:ring-gray-500  bg-white  border border-zinc-400  hover:border-zinc-500 group hover:shadow-md shadow';
  return (
    <Link href={href}>
      <a className={aStyle} target={href.substring(0, 12) === `https://www.` ? `_blank` : '_self'}>
        <div className='flex items-center justify-between px-3 py-2 border-b border-zinc-400 hover:border-zinc-500 bg-zinc-100 '>
          <div className='truncate text-zinc-500 group-hover:text-zinc-600'>
            {href.substring(0, 12) === `https://www.` ? href.slice(12, href.length) : href}
          </div>
          <div>
            {href.substring(0, 12) === `https://www.` ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-zinc-500'
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
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex flex-col justify-between h-40 px-3 pt-2 pb-3'>
          <div>
            <div className='text-lg font-semibold text-zinc-800'>{title}</div>
            <div className='text-zinc-500'>{description}</div>
          </div>
          <div className='space-y-2'>
            <div className={`text-zinc-700 rounded  w-fit px-2 py-0.5 text-xs bg-zinc-200`}>
              {period}
            </div>
            <div className={`text-zinc-700 rounded  w-fit px-2 py-0.5 text-xs ${color}`}>
              {status}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
