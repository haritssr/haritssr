import { InternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function VisX() {
  return (
    <LayoutSubWorkToTopic title='VisX' href='/work' hrefName='My Work'>
      <SubTitle>My implementation of VisX</SubTitle>
      <div className='grid grid-cols-1 gap-4 md:grid-flow-col md:grid-cols-4 sm:grid-rows-4'>
        <InternalLink href='/work/visx/bar-chart' name='Bar Chart' />
        <InternalLink href='/work/visx/pie-chart' name='Pie Chart' />
      </div>
    </LayoutSubWorkToTopic>
  );
}
