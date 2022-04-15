import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Audio() {
  return (
    <LayoutToExperiments domain='Browser' title='Audio'>
      <SubTitle>Example of Browser Audio API</SubTitle>
      <div className='space-y-10'>
        <Music
          src='/yoasobi-loveletter.mp3'
          author='Yoasobi'
          title='Love Letter'
          autoplay={false}
        />
        <Music
          src='/kurzgesagt_tail-end.mp3'
          author='Epic Mountain'
          title='The Tail End'
          autoplay={true}
        />
      </div>
    </LayoutToExperiments>
  );
}

function Music({
  src,
  author,
  title,
  autoplay,
}: {
  src: string;
  author: string;
  title: string;
  autoplay: boolean;
}) {
  return (
    <figure>
      <figcaption className='mb-2'>
        <span className='font-semibold text-gray-700'>{author}</span> - {title}
      </figcaption>
      <audio
        id='Audio'
        controls
        autoPlay={autoplay}
        loop
        // muted
        src={src}
        className={` w-full rounded-full border border-gray-400  sm:w-1/2 `}
      >
        This is {author} {title} song. Your browser does not support the
        <code>audio</code> element.
      </audio>
    </figure>
  );
}
