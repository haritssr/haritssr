import Layout from '@/components/Layout';
import { Title, TitleBack } from '@/components/DesignSystem';
import { useEffect } from 'react';

export default function Audio() {
  return (
    <Layout browserTitle='Audio' description='Audio'>
      <TitleBack href='Work' name='Audio' />

      <div className='space-y-10'>
        <Music src='/yoasobi-loveletter.mp3' author='Yoasobi' title='Love Letter' />
        <Music src='/yoasobi-romance.mp3' author='Yoasobi' title='Romance' />
      </div>
    </Layout>
  );
}

const Music = ({ src, author, title }) => {
  useEffect(() => {
    const AUDIO = document.getElementById('Audio');
    AUDIO.onplay = () => {
      AUDIO.classList.add('ring-2', 'ring-blue-600');
    };
  });
  return (
    <figure>
      <figcaption className='mb-2'>
        <span className='font-semibold text-gray-700'>{author}</span> - {title}
      </figcaption>
      <audio
        id='Audio'
        controls
        src={src}
        className={` w-full border border-gray-400 rounded-full  sm:w-1/2 `}
      >
        This is {author} {title} song
      </audio>
    </figure>
  );
};
