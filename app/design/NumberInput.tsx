"use client";
import { useState } from "react";

import SharedNumberInput from "@/components/NumberInput";

export default function NumberInput() {
  const [value, setValue] = useState<number | null>(1);
  return (
    <SharedNumberInput
      label="Example number"
      max={100}
      value={value}
      onValueChange={setValue}
    />
  );
}
