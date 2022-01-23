import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { reactData } from 'lib/work-data';

export default function React() {
  return (
    <LayoutSubWorkToTopic title='React' href='/#work' hrefName='My Work'>
      <SubTitle>My implementation of React js</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        {reactData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}
