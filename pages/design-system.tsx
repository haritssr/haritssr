import { ExternalLink, InternalLink, Topic } from '@/components/DesignSystem';
import { LogoHaritssr } from '@/components/Icons';
import Layout from '@/components/Layout';
import React from 'react';
import { color } from '../data/DesignSystemData';

export default function DesignSystem() {
  return (
    <Layout browserTitle='DesignSystem' description='DesignSystem'>
      <div className='mt-5 space-y-20 sm:mt-10 '>
        <A />
      </div>
    </Layout>
  );
}

const Wrapper = ({
  topic,
  className,
  children,
  id,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id}>
      <div className='mb-6 space-y-2'>
        <span className='text-2xl font-bold text-zinc-800 sm:text-3xl'>{topic}</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const A = () => {
  return (
    <Wrapper topic='Design System' className='' id='DesignSystem'>
      <Topic name='Color' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        {color.map(data => (
          <div className='space-y-1' key={data.name}>
            <div style={{ backgroundColor: data.hex }} className={` h-16 w-16 rounded-md border`} />
            <div className='text-zinc-700'>{data.hex}</div>
            <div className='text-zinc-500'>{data.name}</div>
          </div>
        ))}
      </section>
      <Topic name='Button' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <ExternalLink href='/' name='ExternalLink' />
          <div className='text-zinc-500'>External Link</div>
        </div>
        <div className='space-y-1'>
          <InternalLink href='/' name='InternalLink' />
          <div className='text-zinc-500'>Internal Link</div>
        </div>
        <div className='space-y-1'>
          <button className='rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-500'>
            Button
          </button>
          <div className='text-zinc-500'>Primary Button</div>
        </div>
        <div className='space-y-1'>
          <button className='rounded-md border border-blue-600 bg-white px-4 py-1 text-blue-600 hover:bg-blue-100'>
            Button
          </button>
          <div className='text-zinc-500'>Secondary Button</div>
        </div>
      </section>
      <Topic name='Typography' />
      <section className='mb-10 -mt-2  grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <div className='text-2xl font-bold text-zinc-800 sm:text-3xl'>Heading</div>
          <div className='text-zinc-500'>Heading</div>
        </div>
        <div className='space-y-1'>
          <div className='text-xl font-semibold text-zinc-700'>Heading 2</div>
          <div className='text-zinc-500'>Heading 2</div>
        </div>
        <div className='space-y-1'>
          <div className='text-[17px] leading-relaxed text-zinc-700 sm:text-base'>
            Short paragraph example
          </div>
          <div className='text-zinc-500'>Paragraph</div>
        </div>
      </section>
      <Topic name='Icon' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <LogoHaritssr />
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>Mobile</div>
        </div>
        <div className='space-y-1'>
          <LogoHaritssr />
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>Desktop</div>
        </div>
        <div className='space-y-1'>
          <div className='w-fit rounded-md border bg-zinc-800 p-2'>
            <LogoHaritssr />
          </div>
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>On dark background</div>
        </div>
        <div className='space-y-1'>
          <div className='w-fit rounded-md border bg-white p-2'>
            <LogoHaritssr />
          </div>
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>On light background</div>
        </div>
      </section>
      <Topic name='Box' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <div className='h-40 overflow-hidden rounded-md border border-zinc-300 bg-gradient-to-bl from-zinc-50 via-white to-white' />
          <div className='text-zinc-500'>Box</div>
        </div>
      </section>
    </Wrapper>
  );
};
