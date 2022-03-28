import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function getServerSideProps() {
  return (
    <LayoutToExperiments title='getServerSideProps' domain='Next.js'>
      <SubTitle>My implementation of Next.js getServerSideProps </SubTitle>
    </LayoutToExperiments>
  );
}
