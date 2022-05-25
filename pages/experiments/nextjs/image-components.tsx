/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Image from 'next/image';
import Link from 'next/link';

const ProductData = [
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
];

export default function ImageComponents() {
  return (
    <LayoutToExperiments title='Image Component' domain='Next.js'>
      <SubTitle>My implementation of Next.js Image Components </SubTitle>
      <div className=' pb-2 text-center'>Grid Images</div>
      <main className='z-0 mx-auto grid max-w-4xl grid-cols-1 gap-5 pt-2 pb-20 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {ProductData.map(a => (
          <ProductCard key={a.id} href={a.href} src={a.src} name={`${a.name}`} />
        ))}
      </main>

      <div>
        <div className=' pb-2 text-center'>Large Image</div>
        <Image
          alt='Image'
          src='/new/hero.jpg'
          height='582'
          width='1007'
          objectFit='cover'
          quality={75}
          className='overflow-hidden rounded-md'
          blurDataURL='/new/hero.jpg'
          placeholder='blur'
        />
      </div>

      <div className='mx-auto mt-20 flex h-auto max-w-5xl flex-col space-y-20'>
        <div>
          <div className=' pb-2 text-center'>img tag</div>

          <img
            alt=''
            src='/new/hero.jpg'
            // height={2000}
            // width={5000}
            className='h-96 w-full rounded-md object-cover object-top'
            placeholder='blur'
          />
        </div>
        <div>
          <div className=' pb-2 text-center'>next image components</div>
          <div className='relative h-96'>
            <Image
              alt='Image'
              src='/new/hero.jpg'
              layout='fill'
              height='582'
              width='1007'
              objectFit='cover'
              quality={75}
              className='overflow-hidden rounded-md rounded-md'
              blurDataURL='/new/hero.jpg'
              placeholder='blur'
            />
          </div>
        </div>
      </div>
    </LayoutToExperiments>
  );
}

const ProductCard = ({ href, src, name }) => {
  return (
    <Link href={href}>
      <a className='relative h-52 w-full'>
        <Image
          alt='Mountains'
          src={src}
          layout='fill'
          objectFit='cover'
          quality={75}
          className='rounded-md'
          priority
          blurDataURL={src}
          placeholder='blur'
        />
        <div className='absolute flex h-full w-full items-center justify-center bg-gradient-to-b from-white/0 via-black/20 to-white/0 text-center text-lg text-white hover:via-black/30'>
          <div>{name}</div>
        </div>
      </a>
    </Link>
  );
};
