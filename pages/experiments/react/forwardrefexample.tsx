import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import { Dispatch, forwardRef, SetStateAction, useRef, useState } from 'react';

interface propsType {
  label: string;
  otherProps?: any;
  data: string;
  onDataChange: Dispatch<SetStateAction<string>>;
}

const buttonStyle =
  'rounded-lg border border-zinc-400 bg-zinc-200 px-3 py-1 hover:bg-zinc-300 active:bg-zinc-200';

const MyInput = forwardRef(function MyInput(props: propsType, ref: any) {
  const { label, data, onDataChange, ...otherProps } = props;

  return (
    <label>
      {label}
      <input
        {...otherProps}
        ref={ref}
        type='text'
        value={data}
        onChange={e => onDataChange(e.target.value)}
      />
    </label>
  );
});

function Form({ data, onDataChange }) {
  const ref = useRef<HTMLInputElement>(null);
  function handleClick() {
    if (ref.current !== null) {
      ref.current.focus();
    }
  }

  return (
    <form action=''>
      {/* the reason forwardRef exist is so <Form/> can access <input/> inside <MyInput/> */}
      <MyInput onDataChange={onDataChange} data={data} label='Enter your name: ' ref={ref} />
      <button type='button' onClick={handleClick} className={buttonStyle}>
        Edit
      </button>
    </form>
  );
}

interface videoType {
  src: string;
  type: string;
  width: number;
}

const VideoPlayer = forwardRef(function VideoPlayer(
  { src, type, width }: videoType,
  ref: React.LegacyRef<HTMLVideoElement>
) {
  return (
    <video autoPlay={true} controls className='w-full' width={width} ref={ref}>
      <source src={src} type={type} />
    </video>
  );
});

function MyVideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    if (ref.current) ref.current.play();
  }
  function handlePause() {
    if (ref.current) ref.current.pause();
  }
  return (
    <>
      <button className={buttonStyle} onClick={() => ref.current?.play()}>
        Play
      </button>
      <button className={buttonStyle} onClick={handlePause}>
        Pause
      </button>
      <VideoPlayer
        src='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
        type='video/mp4'
        width={250}
        ref={ref}
      />
    </>
  );
}

export default function ForwardRefExample() {
  const [data, setData] = useState('');

  return (
    <LayoutToExperiments domain='React' title='forwardRefExample'>
      <SubTitle>Example</SubTitle>
      <Form data={data} onDataChange={setData} />
      {data}
      <MyVideoPlayer />
    </LayoutToExperiments>
  );
}
