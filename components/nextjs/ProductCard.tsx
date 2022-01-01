import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ href, image, productName }) {
  return (
    <Link href={`${href}`}>
      <a className='relative block text-center cursor-pointer '>
        <div className='relative overflow-hidden'>
          <Image
            src={`${image}`}
            width={1000}
            height={1000}
            // layout='fill'
            // objectFit='cover'
            // quality={100}
            // priority
            // className='absolute z-0 object-cover w-full h-full rounded-md'
            alt='Product Image'
          />
          <p className='absolute z-10 m-0 text-center text-harislab'>{productName}</p>
        </div>
        {/* <div className='relative z-10 flex items-center justify-center h-full text-center'>
          {productName}
        </div> */}
      </a>
    </Link>
  );
}
