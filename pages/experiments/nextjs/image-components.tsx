/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import Topic from '@/components/Topic';
import SubTitle from '@/components/SubTitle';

import ExternalLink from '@/components/ExternalLink';

import LayoutToExperiments from '@/components/LayoutToExperiments';
import Image from 'next/image';
import Link from 'next/link';

const ProductData = [
  { id: '1', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '2', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '3', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '4', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '5', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '6', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '7', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
  { id: '8', src: '/images/street.jpg', name: 'Street Car', href: '/experiments' },
];

export default function ImageComponents() {
  return (
    <LayoutToExperiments title='Image Component' domain='Nextjs'>
      <SubTitle>
        My implementation of
        <ExternalLink
          href='https://nextjs.org/docs/api-reference/next/image'
          name='Nextjs Image Components'
        />
      </SubTitle>
      <Topic name='Grid System' />
      <main className='z-0 mx-auto grid max-w-4xl grid-cols-1 gap-5 pb-20 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {ProductData.map(a => (
          <ProductCard key={a.id} href={a.href} src={a.src} name={a.name} />
        ))}
      </main>

      <div>
        <Topic name='Large Image' />
        <Image
          alt='Image'
          src='/images/hero.jpg'
          height='582'
          width='1007'
          // objectFit='cover'
          quality={75}
          className='overflow-hidden rounded-md'
          blurDataURL='/images/hero.jpg'
          placeholder='blur'
        />
      </div>

      <div className='mx-auto mt-20 flex h-auto max-w-5xl flex-col space-y-20'>
        <div>
          <Topic name='Default <img/>' />
          <img
            alt=''
            src='/images/hero.jpg'
            // height={2000}
            // width={5000}
            className='h-96 w-full rounded-md object-cover object-top'
            placeholder='blur'
          />
        </div>
        <div>
          <Topic name='Next.js <Image/>' />
          <div className='relative h-96'>
            <Image
              alt='Image'
              src='/images/hero.jpg'
              // layout='fill'
              height='5760'
              width='3840'
              // objectFit='cover'
              quality={75}
              className='overflow-hidden rounded-md'
              blurDataURL='/images/hero.jpg'
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
    <Link passHref href={href} className='relative h-52 w-full'>
      <Image
        alt='Street with car'
        src={src}
        // layout='fill'
        // objectFit='cover'
        quality={75}
        className='rounded-md'
        priority
        blurDataURL={src}
        placeholder='blur'
        width='4493'
        height='4493'
      />
      <div className='absolute flex h-full w-full items-center justify-center bg-gradient-to-b from-white/0 via-black/20 to-white/0 text-center text-lg text-white hover:via-black/30'>
        <div>{name}</div>
      </div>
    </Link>
  );
};
