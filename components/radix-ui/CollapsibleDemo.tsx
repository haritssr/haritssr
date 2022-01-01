import * as Collapsible from '@radix-ui/react-collapsible';
import { InternalLink, SubTitle } from '@/components/DesignSystem';
import { useState } from 'react';

export default function CollapsibleDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className='w-full sm:w-2/3'>
      <div className='flex flex-row items-center justify-between mb-3'>
        <div className='text-lg font-semibold text-gray-700'>Radix example</div>
        <Collapsible.Trigger className='px-2 py-0.5 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md'>
          {open ? 'less' : 'more'}
        </Collapsible.Trigger>
      </div>
      <div className='space-y-2'>
        <InternalLink name='This is Accoordion' href='/work/radix-ui/accordion' />
        <InternalLink name='This is Dropdown Menu' href='/work/radix-ui/dropdown-menu' />
        <InternalLink name='This is Blurry Effect' href='/work/tailwindcss/blurry' />
      </div>
      <Collapsible.Content className='mt-2 space-y-2'>
        <InternalLink name='Accoordion' href='/work/radix-ui/accordion' />
        <InternalLink name='Dropdown Menu' href='/work/radix-ui/dropdown-menu' />
        <InternalLink name='Blurry Effect' href='/work/tailwindcss/blurry' />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
