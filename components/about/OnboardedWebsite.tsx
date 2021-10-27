import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import Image from 'next/image';
import Link from 'next/link';

export default function OnboardedWebsite() {
  return (
    <div>
      <Topic name='Onboarded Website' />
      <SubTopic>
        Websites that I have ever made and already have a domain. For other side projects, you can
        see{' '}
        <Link href='/work'>
          <a className='text-blue-500 hover:underline hover:text-blue-400'>here</a>
        </Link>
      </SubTopic>
      <div className='grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        <Box href='https://www.aka-tradingindo.com'>
          <div className='flex items-center space-x-3'>
            <Image src='/aka.PNG' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>AKA Tradingindo</div>
          </div>
        </Box>
        <Box href='https://www.harislab.com'>
          <div className='flex items-center space-x-3'>
            <Image src='/light-logo.png' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>Haris Lab</div>
          </div>
        </Box>
        <Box href='https://www.harisstudio.com'>
          <div className='flex items-center space-x-3'>
            <Image src='/light-logo.png' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>Haris Studio</div>
          </div>
        </Box>
        <Box href='https://www.harits.com'>
          <div className='flex items-center space-x-3'>
            <Image src='/light-logo.png' height={24} width={24} alt='github logo' />
            <div className='font-medium text-gray-700'>{`Harits Syah`}</div>
          </div>
        </Box>
      </div>
    </div>
  );
}
