import { InternalLink } from './DesignSystem';
import Link from 'next/link';

interface ExperimentsType {
  title: string;
  description: string;
  links: Array<{ name: string }>;
}

export default function ExperimentBox({ title, links, description }: ExperimentsType) {
  return (
    <div className='h-fit'>
      {/* ml-7 */}
      <section className=''>
        {/* -ml-7 */}
        <div className='mb-2 flex w-full flex-col items-center'>
          <Link href={`/experiments/${title.toLowerCase().replace(' ', '-')}`}>
            <a className='block w-full pt-1.5 text-left font-semibold text-zinc-700 hover:underline'>
              {title}
            </a>
          </Link>
          <div className='w-full border-b border-zinc-300 pb-1 text-left text-zinc-500'>
            {description}
          </div>
        </div>
        {/* list-outside list-decimal */}
        <ol className='flex flex-col space-y-2'>
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
      </section>
    </div>
  );
}
