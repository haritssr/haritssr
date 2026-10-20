"use client";

import { useState } from "react";

import SharedSlider from "@/components/Slider";

export default function Slider() {
  const [value, setValue] = useState(50);

  return (
    <SharedSlider
      label="Volume"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}
