"use client";
import { useState } from "react";

import NumberInput from "@/components/NumberInput";

export default function NumberInputDemo() {
  const [value, setValue] = useState<number | null>(1);
  return (
    <NumberInput
      label="Example number"
      max={100}
      value={value}
      onValueChange={setValue}
    />
  );
}
