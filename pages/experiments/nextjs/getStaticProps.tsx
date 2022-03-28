import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function getStaticProps() {
  return (
    <LayoutToExperiments title='getStaticProps' domain='Next.js'>
      <SubTitle>My implementation of Next.js getStaticProps </SubTitle>
    </LayoutToExperiments>
  );
}
