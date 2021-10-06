import { Title, Topic } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Blurry from '@/components/showcase/tailwindcss/blurry';
import FloatingLabels from '@/components/showcase/tailwindcss/floatingLabels';
import Glowing from '@/components/showcase/tailwindcss/glowing';
import Grid from '@/components/showcase/tailwindcss/grid';
import IOS15clone from '@/components/showcase/tailwindcss/IOS15clone';
import YoutubeThumbnail from '@/components/showcase/tailwindcss/youtubeThumbnail';

export default function Tailwindcss() {
  return (
    <Layout browserTitle='Tailwindcss' description='Tailwindcss'>
      <Title name='Tailwindcss' />

      <Topic name='Blurry Animation Background' />
      <Blurry />

      <div className='mt-32'>
        <Topic name='Youtube Thumbnail' />
        <YoutubeThumbnail />
      </div>

      <div className='mt-32'>
        <Topic name='Floating Labels' />
        <FloatingLabels />
      </div>

      <div className='mt-32'>
        <Topic name='Grid Layout' />
        <Grid />
      </div>
      <div className='mt-32'>
        <Topic name='Glowing Gradient Background' />
        <Glowing />
      </div>

      <div className='mt-32'>
        <Topic name='iOS 15 notification clone' />
        <IOS15clone />
      </div>
    </Layout>
  );
}
