import Link from 'next/link';

export default function ExperimentBox({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <a className='flex flex-col overflow-hidden bg-white border rounded-lg shadow active:ring-1 active:ring-gray-500 border-zinc-400 hover:shadow-md hover:border-zinc-500 '>
        <div className='px-3 py-2 font-semibold text-gray-700 bg-zinc-100'>{title}</div>
        <div className='border-b border-zinc-400' />
        <div className='px-3 py-2 text-gray-500'>{description}</div>
      </a>
    </Link>
  );
}
