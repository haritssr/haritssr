import { InternalLink } from './DesignSystem';
import Link from 'next/link';
import Image from 'next/future/image';

interface ExperimentsBoxType {
  title: string;
  description: string;
  links: Array<{ name: string }>;
  logoSrc: string;
}

export default function ExperimentBox({ title, links, description, logoSrc }: ExperimentsBoxType) {
  return (
    <article className='mt-12 h-fit' id={`#${title.toLowerCase().replace(' ', '-')}`}>
      <div className='mb-1 flex w-full flex-col items-center space-y-1 sm:mb-5'>
        <div className='mb-2 flex w-full items-center space-x-2'>
          <div className='text-left text-3xl font-bold text-zinc-800'>{title}</div>
          <div className='flex items-center'>
            <Image src={logoSrc} height={22} width={22} alt={title} />
          </div>
        </div>
        <p className=' w-full text-left text-[17px] leading-relaxed text-zinc-700 sm:text-base'>
          {description}
        </p>
      </div>
      <ol className='mt-5 w-full columns-1 gap-5 space-y-2 sm:columns-4'>
        {links.map(link => (
          <li key={link.name} className='text-zinc-600'>
            <InternalLink
              href={`/experiments/${title.toLowerCase().replace(' ', '-')}/${link.name
                .toLowerCase()
                // /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
                .replace(/\s/g, '-')}`}
              name={link.name}
            />
          </li>
        ))}
      </ol>
    </article>
  );
}
