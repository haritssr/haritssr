import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';

export default function getStaticProps() {
  return (
    <LayoutSubWorkToTopic title='getStaticProps' href='/work/nextjs' hrefName='Next.js'>
      <SubTitle>My implementation of Next.js getStaticProps </SubTitle>
    </LayoutSubWorkToTopic>
  );
}
