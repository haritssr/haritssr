import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Music from '@/components/Music';

export default function Audio() {
  return (
    <LayoutToExperiments domain='Browser API' title='Audio'>
      <SubTitle>Example of Browser Audio API</SubTitle>
      <div className='space-y-10'>
        <Music src='/yoasobi-loveletter.mp3' author='Yoasobi' title='Love Letter' />
        <Music src='/yoasobi-romance.mp3' author='Yoasobi' title='Romance' />
      </div>
    </LayoutToExperiments>
  );
}
