"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";
import { SelectField } from "@/components/SelectField";

import styles from "./FontPreview.module.css";

const fonts = [
  { value: "inter", label: "Inter" },
  { value: "geist", label: "Geist Sans" },
  { value: "geist-mono", label: "Geist Mono" },
  { value: "geist-serif", label: "Geist Serif" },
  { value: "maple", label: "Maple Mono" },
  { value: "maple-nf", label: "Maple Mono NF" },
] as const;

type Font = (typeof fonts)[number]["value"];

export default function FontPreview({
  children,
  header,
}: {
  children: ReactNode;
  header: ReactNode;
}) {
  const [font, setFont] = useState<Font>("inter");

  return (
    <div className={styles.preview} data-preview-font={font}>
      {header}
      <div className="@container mb-12 space-y-2">
        <p className="text-muted text-sm">Preview font</p>
        <div className="max-w-56 @min-[36rem]:hidden [&_label]:sr-only">
          <SelectField
            label="Preview font"
            options={fonts}
            value={font}
            onValueChange={(value) => {
              const selected = fonts.find((item) => item.value === value);
              if (selected) {
                setFont(selected.value);
              }
            }}
          />
        </div>
        <div className="hidden @min-[36rem]:block">
          <ButtonGroup aria-label="Preview font">
            {fonts.map(({ value, label }) => (
              <ButtonGroupItem
                aria-pressed={font === value}
                key={value}
                onClick={() => {
                  setFont(value);
                }}
              >
                {label}
              </ButtonGroupItem>
            ))}
          </ButtonGroup>
        </div>
      </div>
      {children}
    </div>
  );
}
