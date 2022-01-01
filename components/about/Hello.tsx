import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardedWebsite() {
  return (
    <div className='flex flex-col justify-center w-full'>
      <div className='flex justify-center my-5 rounded-md'>
        <Image
          src='/me.jpg'
          height='150'
          width='150'
          className='rounded-full '
          alt='Harits Syah'
          blurDataURL='/me.jpg'
          placeholder='blur'
        />
      </div>

      <div className='max-w-xl mx-auto mb-4 -mt-1 text-center text-gray-500'>
        I am <span className='font-bold'>Harits Syah</span> from South Tangerang, Indonesia. I
        consider myself as a react web developer and web designer, since I not only do front-end web
        engineering, I also design web layouts that fit the marketing and technical considerations.
        My internet name is <code className='font-semibold text-gray-700 underline'>haritssr</code>{' '}
        stands for{' '}
        <code>
          <b>Harits</b>
        </code>{' '}
        <code>
          <b>S</b>
        </code>
        yah{' '}
        <code>
          <b>R</b>
        </code>
        ahmatullah as it appears on my social media, email, and my website;{' '}
        <code className='text-blue-500 underline'>twitter/haritssr</code>,{' '}
        <code className='text-blue-500 underline'>haritssr@gmail.com</code>,{' '}
        <code className='text-blue-500 underline'>github/haritssr</code>, and{' '}
        <code className='text-blue-500 underline'>haritssr.com</code>
      </div>
    </div>
  );
}
