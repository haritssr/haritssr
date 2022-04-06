/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

export default function Images() {
  return (
    <div className='mx-auto mb-40 h-auto bg-zinc-400 flex max-w-5xl flex-col space-y-10'>
      <div>
        <div className='py-3 text-center'>Image 1</div>
        <img
          alt=''
          src='/new/hero.jpg'
          // height={2000}
          // width={5000}
          className='h-96 w-full object-cover object-top'
          placeholder='blur'
        />
      </div>
      <div>
        <div className='py-3 text-center'>Image 2</div>
        <div className="h-96 relative">
          <Image
            alt='Image'
            src='/new/hero.jpg'
            layout='fill'
            height='582'
            width='1007'
            objectFit='cover'
            quality={75}
            className='overflow-hidden rounded-md'
            blurDataURL='/new/hero.jpg'
            placeholder='blur'
          />
        </div>
      </div>
    </div>
  );
}
