import Link from 'next/link';
import { ContactData } from 'data/ContactData';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='relative mx-auto mt-20 -mb-16 max-w-5xl px-8 pt-10 pb-3 text-center xl:px-0'>
      <section className='flex items-center justify-center space-x-4'>
        {/* A list of contact (social media) */}
        {ContactData.map(d => (
          <div key={d.imgSrc}>
            <Link href={d.href}>
              <a
                // hove:sepia-[.5] not working on png, but it working on svg
                className='hover:sepia-[.5]'
                title={d.title}
                target='_blank'
                rel='noreferrer noopener'
              >
                <Image src={d.imgSrc} height={16} width={16} alt={d.name} />
              </a>
            </Link>
          </div>
        ))}
      </section>
      <section>
        <Link href='/'>
          <a className='text-zinc-500 duration-100 hover:text-zinc-700 '>
            Harits Syah (@haritssr) &copy; {new Date().getFullYear()}
          </a>
        </Link>
      </section>
    </footer>
  );
}
