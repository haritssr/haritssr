import Layout from '@/components/Layout';
import { Title, TitleBack } from '@/components/DesignSystem';

export default function Video() {
  return (
    <Layout browserTitle='Video' description='Video'>
      <TitleBack back='work' name='Video' />

      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 '>
        <VideoPlayer src='/rgb.mp4' author='Yoasobi' title='Love Letter' />
        <VideoPlayer src='/rmc.mp4' author='Yoasobi' title='Romance' />
      </div>
    </Layout>
  );
}

const VideoPlayer = ({ src, author, title }) => {
  return (
    <figure>
      <figcaption className='mb-1 sm:mb-3'>
        <span className='font-semibold text-gray-700'>{author}</span> - {title}
      </figcaption>
      <video className='block w-full h-auto rounded-md shadow-lg' controls>
        <source src={src} type='video/mp4' />
      </video>
    </figure>
  );
};
