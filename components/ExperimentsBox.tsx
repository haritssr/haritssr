import { InternalLink } from './DesignSystem';
import Image from 'next/image';
import Link from 'next/link';

interface ExperimentsType {
  title: string;
  imgSrc: string;
  links: Array<{ name: string }>;
}

export default function ExperimentBox({ title, links, imgSrc }: ExperimentsType) {
  return (
    <div className='h-fit rounded-lg bg-[#fafafa] px-5 py-4'>
      <section className='ml-5'>
        <div className='-ml-5 flex items-center'>
          <Link href={`/experiments/${title.toLowerCase().replace(' ', '-')}`}>
            <a className=' mr-2 py-1.5 text-lg font-semibold text-zinc-700 hover:underline'>
              {title}
            </a>
          </Link>
          <Image src={imgSrc} alt='' height='16' width='16' />
        </div>
        <ol className='flex  list-outside list-decimal flex-col space-y-2 pt-2'>
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
