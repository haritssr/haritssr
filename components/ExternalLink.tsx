import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export default function ExternalLink({
  name,
  href,
  big,
}: {
  name: string;
  href: string;
  big?: boolean;
}) {
  return (
    <cite className='group not-italic'>
      {' '}
      <a
        title={href}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-block w-fit cursor-pointer items-center text-blue-600 hover:underline group-hover:text-blue-700'
      >
        <span className='flex items-center'>
          <span className={`${big ? 'text-lg font-medium' : 'text-base'}`}>{name}</span>
          <ArrowUpRightIcon
            className={`${
              big ? 'h-[18px] w-[18px]' : 'h-3 w-3'
            } ml-1  text-blue-600 group-hover:text-blue-700`}
            strokeWidth={`${big ? 2.2 : 2}`}
          />
        </span>
      </a>{' '}
    </cite>
  );
}
