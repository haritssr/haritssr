import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import React from 'react';

export default function CenteringDiv() {
  return (
    <LayoutToExperiments title='Centering Div' domain='Tailwind CSS'>
      <SubTitle>Methods to centering div via Tailwind CSS or inline CSS</SubTitle>

      <section className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
        <Wrapper title='flex justify-center items-center'>
          <div className='flex  aspect-square w-full items-center justify-center bg-purple-500'>
            <div className='h-20 w-20 bg-orange-400'></div>
          </div>
        </Wrapper>
        <Wrapper title='relative absolute inset-44'>
          <div className='relative aspect-square w-full bg-purple-500'>
            <div className='absolute inset-44 bg-orange-400'></div>
          </div>
        </Wrapper>
      </section>
    </LayoutToExperiments>
  );
}

const Wrapper = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div>
      <div className='font-medium text-zinc-700'>className</div>
      <div className='mb-2  text-zinc-500'>{title}</div>
      {children}
    </div>
  );
};
