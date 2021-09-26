import Layout from '@/components/Layout';
import { Title, Topic } from '@/components/DesignSystem';
import Gradient from '@/components/showcase/framer-motion/gradient';
import Box from '@/components/showcase/framer-motion/box';
import Card from '@/components/showcase/framer-motion/card';

export default function FramerMotion() {
  return (
    <Layout browserTitle='Framer Motion' description='Framer Motion'>
      <Title name='Framer Motion' />
      <div>
        <Topic name='Card' />
        <Card />
      </div>

      <div className='mt-20'>
        <Topic name='Box' />
        <Box />
      </div>

      <div className='mt-20'>
        <Topic name='Gradient' />
        <Gradient />
      </div>
    </Layout>
  );
}
