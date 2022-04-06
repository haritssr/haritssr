import LayoutGlobalNavigation from '@/components/LayoutGlobalNavigation';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../data/ExperimentsData';

export default function Experiments() {
  return (
    <LayoutGlobalNavigation
      browserTitle='Experiments'
      description='Experiments'
      domain='Experiments'
    >
      <section className='grid grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-3 sm:gap-14 '>
        {ExperimentsData.map(({ id, title, links, description }) => (
          <ExperimentsBox key={id} title={title} links={links} description={description} />
        ))}
      </section>
    </LayoutGlobalNavigation>
  );
}
