import ComingSoon from '@/components/comingsoon';
import { Title } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout browserTitle='About' description='About'>
      <Title name='About' />
      <ComingSoon />
    </Layout>
  );
}
