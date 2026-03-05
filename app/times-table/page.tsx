import { Suspense } from "react";
import PageDescription from "@/components/PageDescription";
import PageTitle from "@/components/PageTitle";
import { IncrementButton } from "./IncrementButton";
import TimesTableComponent from "./TimesTable";

export default function TimesTable() {
  return (
    <div>
      <PageTitle title="Times Table" />
      <PageDescription description="Self-corrected 10x10 times table with statistics." />

      <Suspense fallback="..loading">
        <IncrementButton />
      </Suspense>
      <TimesTableComponent />
    </div>
  );
}
