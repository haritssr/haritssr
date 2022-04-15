import { InternalLink } from './DesignSystem';
import Link from 'next/link';
import Image from 'next/image';

interface ExperimentsType {
  title: string;
  description: string;
  links: Array<{ name: string }>;
  logoSrc: string;
}

export default function ExperimentBox({ title, links, description, logoSrc }: ExperimentsType) {
  return (
    <article className='h-fit' id={`#${title.toLowerCase().replace(' ', '-')}`}>
      {/* ml-7 */}

      <div className='mb-2 flex w-full flex-col items-center'>
        <div className='flex w-full items-center space-x-2'>
          <Link href={`/experiments/${title.toLowerCase().replace(' ', '-')}`}>
            <a className='block text-left text-xl font-semibold text-zinc-700 hover:underline'>
              {title}
            </a>
          </Link>
          <div className='flex items-center'>
            <Image src={logoSrc} height={18} width={18} alt={title} />
          </div>
        </div>
        <div className='w-full border-b border-zinc-200 pb-1 text-left text-lg text-zinc-500 sm:text-base'>
          {description}
        </div>
      </div>
      {/* list-outside list-decimal */}
      <ol className='flex flex-col space-y-1.5 sm:space-y-2'>
        {links.map(link => (
          <li key={link.name} className='text-zinc-600'>
            <InternalLink
              href={`/experiments/${title.toLowerCase().replace(' ', '-')}/${link.name
                .toLowerCase()
                // /\s/g regex -> search all (g) whitespace, and replace them with '-'
                .replace(/\s/g, '-')}`}
              name={link.name}
            />
          </li>
        ))}
      </ol>
    </article>
  );
}
