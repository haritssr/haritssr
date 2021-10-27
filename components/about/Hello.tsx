import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardedWebsite() {
  return (
    <div>
      <Topic name='Hello' />
      <SubTopic>
        I am Harits Syah from South Tangerang, Indonesia. I consider myself as a react web developer
        and web designer, since I not only do front-end web engineering, I also design web layouts
        that fit the marketing and technical considerations. My internet name is{' '}
        <code className='underline'>haritssr</code> as it appears on almost all of my social media
        and contact ; <code className='text-[#00ACEE]'>twitter/haritssr</code>,{' '}
        <code className='text-red-500'>haritssr@gmail.com</code>,{' '}
        <code className='text-gray-800'>github/haritssr</code>, and{' '}
        <code className='text-orange-500'>haritssr.com</code>
      </SubTopic>
    </div>
  );
}
