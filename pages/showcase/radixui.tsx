import Layout from '@/components/Layout';
import { Title } from '@/components/DesignSystem';
import ComingSoon from '@/components/comingsoon';

export default function RadixUI() {
  return (
    <Layout browserTitle='Radix UI' description='Radix UI'>
      <Title name='Radix UI' />
      <ComingSoon />
    </Layout>
  );
}
