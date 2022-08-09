import LayoutNodeExperiments from '@/components/LayoutNodeExperiments';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../../data/ExperimentsData';

export default function VisX() {
  return (
    <LayoutNodeExperiments domain='VisX' title='VisX'>
      <section>
        {[ExperimentsData[4]].map(({ id, title, links, description, logoSrc }) => (
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
