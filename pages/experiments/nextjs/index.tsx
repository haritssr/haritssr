import LayoutNodeExperiments from '@/components/LayoutNodeExperiments';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../../data/ExperimentsData';

export default function NextJs() {
  return (
    <LayoutNodeExperiments domain='Nextjs' title='Nextjs'>
      <section>
        {[ExperimentsData[2]].map(({ id, title, links, description, logoSrc }) => (
          <ExperimentsBox
            key={id}
            title={title}
            links={links}
            description={description}
            logoSrc={logoSrc}
          />
        ))}
      </section>
    </LayoutNodeExperiments>
  );
}
