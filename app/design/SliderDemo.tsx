"use client";

import { useState } from "react";

import Slider from "@/components/Slider";

export default function SliderDemo() {
  const [value, setValue] = useState(50);

  return (
    <Slider
      label="Volume"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}
