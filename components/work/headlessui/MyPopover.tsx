import { Popover } from '@headlessui/react';
import { Topic } from '@/components/DesignSystem';
import Image from 'next/image';

//Popover
export default function MyPopover() {
  return (
    <>
      <Topic name='Popover' />
      <Popover as='div' className='relative'>
        <Popover.Button>Solutions</Popover.Button>

        <Popover.Panel as='div' className='absolute z-10'>
          <div className='grid grid-cols-2'>
            <a href='/analytics'>Analytics</a>
            <a href='/engagement'>Engagement</a>
            <a href='/security'>Security</a>
            <a href='/integrations'>Integrations</a>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
