import { useTimer } from "../_components/TimerProvider";

/** The account's "6-hour timeline" preference, saved with other Timer preferences. */
export default function usePagedTimeline() {
  const { pagedTimeline, setPagedTimeline } = useTimer(
    "pagedTimeline",
    "setPagedTimeline"
  );
  return { paged: pagedTimeline, setPaged: setPagedTimeline };
}
