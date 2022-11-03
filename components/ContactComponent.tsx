import Image from 'next/image';

export default function ContactComponent({
  href,
  imgSrc,
  name,
  title,
}: {
  href: string;
  imgSrc: string;
  name: string;
  title: string;
}) {
  return (
    <a
      title={title}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='group flex w-auto'
    >
      <section className='flex items-center space-x-2 overflow-hidden sm:space-x-3'>
        <Image src={imgSrc} height={20} width={20} alt={name} className='aspect-auto h-5 w-5' />
        <div className=' text-zinc-800 hover:text-zinc-500 hover:underline'>{name}</div>
        {/* External Link Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4 text-zinc-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      </section>
    </a>
  );
}
