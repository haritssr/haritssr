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
        <Slider.Track className="bg-border relative h-2 flex-1 rounded-full">
          <Slider.Indicator className="bg-action absolute h-full rounded-full" />
          <Slider.Thumb
            aria-label="Volume"
            className="has-focus-visible:outline-action border-border hover:border-action-hover block h-5 w-5 cursor-pointer rounded-full border bg-white shadow outline-hidden has-focus-visible:outline-2"
          />
        </Slider.Track>
      </Slider.Control>
    </Slider.Root>
  );
}
