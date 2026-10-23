import AnalogClock from "@/app/timer/_components/AnalogClock";
import PageHeader from "@/components/PageHeader";
import PageTitle from "@/components/PageTitle";
import { createPageMetadata } from "@/utils/metadata/pageMetadata";

import styles from "./Clock.module.css";

export const metadata = createPageMetadata({
  title: "Clock",
  description: "An analog clock showing Jakarta time.",
  path: "/timer/clock",
});

export default function ClockPage() {
  return (
    <>
      <PageHeader back={{ href: "/timer", name: "Timer" }} path="/timer/clock">
        <PageTitle>Clock</PageTitle>
      </PageHeader>
      <div className={styles.frame}>
        <AnalogClock className="h-full min-h-0 w-full min-w-0" />
      </div>
    </>
  );
}
