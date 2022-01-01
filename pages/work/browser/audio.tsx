import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import Music from '@/components/Music';

export default function Audio() {
  return (
    <LayoutSubWorkToTopic title='Audio' href='/work/browser' hrefName='Browser API'>
      <div className='space-y-10'>
        <Music src='/yoasobi-loveletter.mp3' author='Yoasobi' title='Love Letter' />
        <Music src='/yoasobi-romance.mp3' author='Yoasobi' title='Romance' />
      </div>
    </LayoutSubWorkToTopic>
  );
}
