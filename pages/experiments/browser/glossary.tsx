import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';

export default function Glossary() {
  return (
    <LayoutToExperiments title='Glossary with dl,dt,dd' domain='Browser'>
      <SubTitle>
        Glossary with dl, dt, dd api. The default style overrided by{' '}
        <ExternalLink name='Tailwind CSS preflight' href='https://tailwindcss.com/docs/preflight' />
      </SubTitle>
      <div>
        <dl>
          <dt>Title</dt>
          <dd>Description of title</dd>
          <dt>Title</dt>
          <dd>Description of title</dd>
          <dt>Title</dt>
          <dd>Description of title</dd>
        </dl>
      </div>
    </LayoutToExperiments>
  );
}
