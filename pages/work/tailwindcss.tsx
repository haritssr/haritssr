import { TitleBack, Topic } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Blurry from '@/components/work/tailwindcss/blurry';
import FloatingLabels from '@/components/work/tailwindcss/floatingLabels';
import Glowing from '@/components/work/tailwindcss/glowing';
import Grid from '@/components/work/tailwindcss/grid';
import IOS15clone from '@/components/work/tailwindcss/IOS15clone';
import YoutubeThumbnail from '@/components/work/tailwindcss/youtubeThumbnail';

export default function Tailwindcss() {
  return (
    <Layout browserTitle='Tailwindcss' description='Tailwindcss'>
      <TitleBack back='work' name='Tailwindcss' />

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
