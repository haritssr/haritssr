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

export default VideoPlayer;
