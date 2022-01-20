import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { othersExternalData, othersInternalData } from 'lib/work-data';

export default function Others() {
  return (
    <LayoutSubWorkToTopic title='Others' href='/#work' hrefName='My Work'>
      <SubTitle>Other things</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        {othersExternalData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
        {othersInternalData.map(f => (
          <InternalLink key={f.name} name={f.name} href={f.href} />
        ))}
      </div>
    </LayoutSubWorkToTopic>
  );
}
