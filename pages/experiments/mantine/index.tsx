import LayoutNodeExperiments from '@/components/LayoutNodeExperiments';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../../data/ExperimentsData';

export default function Mantine() {
  return (
    <LayoutNodeExperiments domain='Mantine' title='Mantine'>
      <section>
        {[ExperimentsData[6]].map(({ id, title, links, description, logoSrc }) => (
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
