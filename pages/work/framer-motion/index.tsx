import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { framerMotionData } from 'lib/work-data';

export default function FramerMotion() {
  return (
    <LayoutSubWorkToTopic title='Framer Motion' href='/#work' hrefName='My Work'>
      <SubTitle>My example implementation of Framer Motion</SubTitle>
      <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4'>
        {framerMotionData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}
