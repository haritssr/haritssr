import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';
import Image from 'next/image';

export default function Figure() {
  return (
    <LayoutToExperiments title='Figure' domain='Browser'>
      <SubTitle>
        Image with figcaption.
        <br />
        Unfortunately the default behavior of figcaption has been overrided by tailwindcss
        preflight, so the figcaption is not italic by default, I need to design it.
      </SubTitle>
      <div>
        <figure>
          <Image
            src='/hero.jpg'
            height='582'
            width='1007'
            blurDataURL='/hero.jpg'
            alt='Mountain with beautiful panoramic sky wadadaw'
          />
          <figcaption className='text-center italic text-zinc-500'>
            Image 1. Mountain with beautiful panoramic sky wadadaw
          </figcaption>
        </figure>
      </div>
    </LayoutToExperiments>
  );
}
