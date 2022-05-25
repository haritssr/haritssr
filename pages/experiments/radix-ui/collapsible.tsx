import * as Collapsible from '@radix-ui/react-collapsible';
import { InternalLink, SubTitle, Topic } from '@/components/DesignSystem';
import { useState } from 'react';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function ExportedCollapsible() {
  const [open, setOpen] = useState(false);
  return (
    <LayoutToExperiments title='Collapsible' domain='Radix UI'>
      <SubTitle>An interactive component which expands/collapses a panel.</SubTitle>{' '}
      <Collapsible.Root open={open} onOpenChange={setOpen} className='w-full sm:w-2/3'>
        <div className='mb-3 flex flex-row items-center justify-between'>
          <Topic name="Try to click more"/>
          <Collapsible.Trigger className='rounded-md bg-gray-200 px-2 py-0.5 text-gray-700 hover:bg-gray-300'>
            {open ? 'less' : 'more'}
          </Collapsible.Trigger>k
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
    </LayoutToExperiments>
  );
}
