import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function getServerSideProps() {
  return (
    <LayoutSubWorkToTopic title='getServerSideProps' href='/work/nextjs' hrefName='Next.js'>
      <SubTitle>My implementation of Next.js getServerSideProps </SubTitle>
    </LayoutSubWorkToTopic>
  );
}
