"use client";

import { Suspense } from "react";
import { IncrementButton } from "../../../app/times-table/IncrementButton";
import TimesTableComponent from "../../../app/times-table/TimesTable";

export default function TimesTableDemo() {
  return (
    <Suspense fallback="..loading">
      <IncrementButton />
      <TimesTableComponent />
    </Suspense>
  );
}
