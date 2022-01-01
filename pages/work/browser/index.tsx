import { SubTitle, InternalLink } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function Browser() {
  return (
    <LayoutSubWorkToTopic href='/work' hrefName='My Work' title='Browser API'>
      <SubTitle>My implementation of Native Browser API</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        <InternalLink name='Browser Title' href='/work/browser/browser-title' />
        <InternalLink name='Audio' href='/work/browser/audio' />
        <InternalLink name='Video' href='/work/browser/video' />
        <InternalLink name='Date' href='/work/browser/date' />
      </div>
    </LayoutSubWorkToTopic>
  );
}
