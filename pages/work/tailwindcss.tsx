import { TitleBack, Topic } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Blurry from '@/components/work/tailwindcss/Blurry';
import FloatingLabels from '@/components/work/tailwindcss/FloatingLabels';
import Glowing from '@/components/work/tailwindcss/Glowing';
import Grid from '@/components/work/tailwindcss/Grid';
import IOS15clone from '@/components/work/tailwindcss/IOS15clone';
import YoutubeThumbnail from '@/components/work/tailwindcss/YoutubeThumbnail';

export default function Tailwindcss() {
  return (
    <Layout browserTitle='Tailwindcss' description='Tailwindcss'>
      <TitleBack href='Work' name='Tailwindcss' />

      <div className='space-y-32'>
        <div>
          <Topic name='Blurry Animation Background' />
          <Blurry />
        </div>
        <div>
          <Topic name='Youtube Thumbnail' />
          <YoutubeThumbnail />
        </div>
        <div>
          <Topic name='Floating Labels' />
          <FloatingLabels />
        </div>
        <div>
          <Topic name='Grid Layout' />
          <Grid />
        </div>
        <div>
          <Topic name='Glowing Gradient Background' />
          <Glowing />
        </div>
        <div>
          <Topic name='iOS 15 notification clone' />
          <IOS15clone />
        </div>
      </div>
    </Layout>
  );
}
