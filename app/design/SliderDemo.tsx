import { Slider } from "@base-ui/react/slider";

export default function SliderDemo() {
  return (
    <Slider.Root
      className="relative flex w-full max-w-sm items-center select-none"
      defaultValue={50}
      max={100}
      step={1}
    >
      <Slider.Control className="relative flex w-full touch-none items-center">
        <Slider.Track className="relative h-2 flex-1 rounded-full bg-zinc-200">
          <Slider.Indicator className="bg-action absolute h-full rounded-full" />
          <Slider.Thumb
            aria-label="Volume"
            className="has-focus-visible:outline-action block h-5 w-5 cursor-pointer rounded-full border border-zinc-300 bg-white shadow outline-hidden hover:border-zinc-400 has-focus-visible:outline-2"
          />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
