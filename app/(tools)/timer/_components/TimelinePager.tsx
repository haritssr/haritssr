import Button from "@/components/Button";

import type { TimelinePagerState } from "../hooks/useTimelineWindow";

/** Floating button that scrolls the follow-now timeline back to the current time. */
export default function TimelinePager({ now }: TimelinePagerState) {
  if (now === null) {
    return null;
  }
  return (
    <Button
      variant="floating-secondary"
      className="absolute top-4 right-5 z-20 whitespace-nowrap"
      onClick={() => {
        now.select();
      }}
    >
      Back to Now
    </Button>
  );
}
