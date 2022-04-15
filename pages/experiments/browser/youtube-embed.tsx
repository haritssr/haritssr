import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

export default function YoutubeEmbed() {
  return (
    <LayoutToExperiments title='Youtube Embed' domain='Browser'>
      <SubTitle>Youtube Embed</SubTitle>
      <iframe
        className='aspect-video w-full'
        src='https://www.youtube.com/embed/JXeJANDKwDc'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; pictureBin-picture'
        allowFullScreen={true}
      ></iframe>
    </LayoutToExperiments>
  );
}
