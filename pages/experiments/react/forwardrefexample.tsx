import {
  type Dispatch,
  forwardRef,
  type SetStateAction,
  useRef,
  useState,
} from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

interface propsType {
  label: string;
  otherProps?: unknown;
  data: string;
  onDataChange: Dispatch<SetStateAction<string>>;
}

const buttonStyle =
  "rounded-lg border border-zinc-400 bg-zinc-200 px-3 py-1 hover:bg-zinc-300 active:bg-zinc-200";

// biome-ignore lint/suspicious/noExplicitAny: forwardRef requires any for ref parameter type
const MyInput = forwardRef(function MyInput(props: propsType, ref: any) {
  const { label, data, onDataChange, ...otherProps } = props;

  return (
    <label>
      {label}
      <input
        {...otherProps}
        onChange={(e) => onDataChange(e.target.value)}
        ref={ref}
        type="text"
        value={data}
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
    <form action="">
      {/* the reason forwardRef exist is so <Form/> can access <input/> inside <MyInput/> */}
      <MyInput
        data={data}
        label="Enter your name: "
        onDataChange={onDataChange}
        ref={ref}
      />
      <button className={buttonStyle} onClick={handleClick} type="button">
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
    <video
      autoPlay={true}
      className="w-full"
      controls
      muted
      ref={ref}
      width={width}
    >
      <source src={src} type={type} />
    </video>
  );
});

function MyVideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null);

  function _handlePlay() {
    if (ref.current) ref.current.play();
  }
  function handlePause() {
    if (ref.current) ref.current.pause();
  }
  return (
    <>
      <button
        className={buttonStyle}
        onClick={() => ref.current?.play()}
        type="button"
      >
        Play
      </button>
      <button className={buttonStyle} onClick={handlePause} type="button">
        Pause
      </button>
      <VideoPlayer
        ref={ref}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"
        width={250}
      />
    </>
  );
}

export default function ForwardRefExample() {
  const [data, setData] = useState("");

  return (
    <LayoutToExperiments domain="React" title="forwardRefExample">
      <SubTitle>Example</SubTitle>
      <Form data={data} onDataChange={setData} />
      {data}
      <MyVideoPlayer />
    </LayoutToExperiments>
  );
}
