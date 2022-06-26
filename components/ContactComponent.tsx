import { ExternalLinkIcon } from '@heroicons/react/outline';
import Image from 'next/image';

//this componenets used in tech stack, and contact section

export default function ContactComponent({
  href,
  imgSrc,
  name,
}: {
  href: string;
  imgSrc: string;
  name: string;
}) {
  return (
    <a
      // title={title} it's nice but adding to much complexity due to lot of typing of unnecesary description of the link, the icon and name already deescribe the destination of the link
      title={name}
      href={href}
      target='_blank'
      rel='noreferrer noopener'
      className='group flex w-auto items-center justify-between space-x-2 rounded-md border border-zinc-200 bg-gray-50 py-2 px-4 shadow-sm hover:bg-gray-100'
    >
      <section className='flex items-center space-x-2 overflow-hidden'>
        <Image src={imgSrc} height={20} width={20} alt={name} />
        <div className='truncate font-medium text-zinc-700'>{name}</div>
      </section>
      <ExternalLinkIcon className='h-5 w-5 pt-0.5 text-zinc-600 group-hover:text-zinc-700' />
    </a>
  );
}

// const ExternalLinkIcon = () => {
//   return (
//     <svg
//       xmlns='http://www.w3.org/2000/svg'
//       className='h-5 w-5 pt-0.5 text-zinc-600 group-hover:text-zinc-700'
//       fill='none'
//       viewBox='0 0 24 24'
//       stroke='currentColor'
//     >
//       <path
//         strokeLinecap='round'
//         strokeLinejoin='round'
//         strokeWidth={1.5}
//         d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
//       />
//     </svg>
//   );
// };
