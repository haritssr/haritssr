import ComingSoon from '@/components/comingsoon';
import { Title } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

export default function Blog() {
  return (
    <Layout browserTitle='blog' description='Blog'>
      <Title name='Blog' />
      <ComingSoon />
    </Layout>
  );
}
