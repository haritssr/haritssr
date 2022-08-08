/* eslint-disable @next/next/no-img-element */
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function SnapScrolling() {
  return (
    <LayoutToExperiments domain='TailwindCSS' title='Snap Scrolling'>
      <SubTitle>
        Responsive Tailwind CSS snap scrolling on images.{' '}
        <ExternalLink name='Source' href='https://tailwindcss.com/docs/scroll-snap-type' />
      </SubTitle>
      <div className='flex w-auto snap-x overflow-hidden bg-blue-500 p-1'>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1622890806166-111d7f6c7c97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1575424909138-46b05e5919ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
        <div className=' snap-center'>
          <img
            alt='a'
            width='700'
            height='1200'
            src='https://images.unsplash.com/photo-1559333086-b0a56225a93c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80'
          />
        </div>
      </div>
    </LayoutToExperiments>
  );
}
