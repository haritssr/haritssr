"use client";
import { useState } from "react";

import { SelectField } from "@/components/SelectField";

const options = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "engineering" },
];
export default function SelectDemo() {
  const [value, setValue] = useState("design");
  return (
    <SelectField
      label="Choose a discipline"
      options={options}
      value={value}
      onValueChange={setValue}
    />
  );
}
