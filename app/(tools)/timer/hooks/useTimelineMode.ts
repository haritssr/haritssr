import { useTimer } from "../_components/TimerProvider";

export type TimelineMode = "day" | "paged" | "follow";

/** The account's timeline setting, saved with other Timer preferences. */
export default function useTimelineMode(): TimelineMode {
  const { pagedTimeline, followNowTimeline } = useTimer(
    "pagedTimeline",
    "followNowTimeline"
  );
  if (followNowTimeline) {
    return "follow";
  }
  return pagedTimeline ? "paged" : "day";
}

/** The "6-hour timeline" and "Follow now" switches and their setters. */
export function useTimelineSettings() {
  const {
    pagedTimeline,
    setPagedTimeline,
    followNowTimeline,
    setFollowNowTimeline,
  } = useTimer(
    "pagedTimeline",
    "setPagedTimeline",
    "followNowTimeline",
    "setFollowNowTimeline"
  );
  return {
    paged: pagedTimeline,
    setPaged: setPagedTimeline,
    follow: followNowTimeline,
    setFollow: setFollowNowTimeline,
  };
}
