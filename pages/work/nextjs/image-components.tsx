import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import Image from 'next/image';
import Link from 'next/link';

const ProductData = [
  { id: '1', src: '/new/gambir.jpg', name: 'gambier', href: '/work' },
  { id: '2', src: '/new/kemiri.png', name: 'candlenut', href: '/work' },
  { id: '3', src: '/new/kopi.png', name: 'coffee beans', href: '/work' },
  { id: '4', src: '/new/jagung.png', name: 'corn', href: '/work' },
  { id: '5', src: '/new/teh.png', name: 'tea', href: '/work' },
  { id: '6', src: '/new/pala.png', name: 'pala', href: '/work' },
  { id: '7', src: '/new/kelapa.png', name: 'coconut', href: '/work' },
  { id: '8', src: '/new/sayuran.png', name: 'sayuran', href: '/work' },
];

export default function ImageComponents() {
  return (
    <LayoutSubWorkToTopic title='Image Component' href='/work/nextjs' hrefName='Next.js'>
      <SubTitle>My implementation of Next.js Image Components </SubTitle>
      <main className='z-0 grid max-w-4xl grid-cols-1 gap-5 py-32 mx-auto xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {ProductData.map(a => (
          <ProductCard key={a.id} href={a.href} src={a.src} name={`${a.name}`} />
        ))}
      </main>
      <div>
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
    </LayoutSubWorkToTopic>
  );
}

const ProductCard = ({ href, src, name }) => {
  return (
    <Link href={href}>
      <a className='relative w-full h-52'>
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
        <div className='absolute flex items-center justify-center w-full h-full text-lg text-center text-white bg-gradient-to-b from-white/0 via-black/20 to-white/0 hover:via-black/30'>
          <div>{name}</div>
        </div>
      </a>
    </Link>
  );
};
