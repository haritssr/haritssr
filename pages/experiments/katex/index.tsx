import LayoutNodeExperiments from '@/components/LayoutNodeExperiments';
import ExperimentsBox from '@/components/ExperimentsBox';
import { ExperimentsData } from '../../../data/ExperimentsData';

export default function KaTeX() {
  return (
    <LayoutNodeExperiments domain='KaTeX' title='KaTeX'>
      <section>
        {[ExperimentsData[14]].map(({ id, title, links, description, logoSrc }) => (
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
