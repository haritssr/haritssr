import LayoutToExperiments from '@/components/LayoutToExperiments';
import VideoPlayer from '@/components/VideoPlayer';

export default function Video() {
  return (
    <LayoutToExperiments title='Video' domain="Browser API">
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 '>
        <VideoPlayer src='/rgb.mp4' author='Yoasobi' title='RGB' />
        <VideoPlayer src='/rmc.mp4' author='Yoasobi' title='Romance' />
      </div>
    </LayoutToExperiments>
  );
}
