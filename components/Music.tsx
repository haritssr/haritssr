import { useEffect } from 'react';

export default function Music({ src, author, title }) {
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
}
