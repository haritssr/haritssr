import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';
import Image from 'next/image';

export default function Figure() {
  return (
    <LayoutToExperiments title='Figure' domain='Browser'>
      <SubTitle>Image with figcaption</SubTitle>
      <div>
        {/* Unfortunately the default behavior of figcaption has been overrided by tailwindcss preflight, so the figcaption is not italic by default */}
        <figure>
          <Image src='/new/hero.jpg' height='582' width='1007' alt='' />
          <figcaption>Image of woman looking at leaf</figcaption>
        </figure>
      </div>
    </LayoutToExperiments>
  );
}
