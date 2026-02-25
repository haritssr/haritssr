import { Suspense } from "react";
import { PageTitle } from "@/components/PageTitle";
import { IncrementButton } from "./IncrementButton";
import TimesTableComponent from "./TimesTable";

export default function TimesTable() {
  return (
    <div>
      <PageTitle
        description="Self-corrected 10x10 times table with statistics."
        title="Times Table"
      />

      <Suspense fallback="..loading">
        <IncrementButton />
      </Suspense>
      <TimesTableComponent />
    </div>
  );
}
