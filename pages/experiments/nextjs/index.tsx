import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { nextjsData } from 'lib/work-data';

export default function Nextjs() {
  return (
    <LayoutSubWorkToTopic title='Nextjs' href='/#work' hrefName='My Work'>
      <SubTitle>My implementation of Next.js</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        {nextjsData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}
