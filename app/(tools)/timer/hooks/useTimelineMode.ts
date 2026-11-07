import { useTimer } from "../_components/TimerProvider";

export type TimelineMode = "day" | "follow";

/** The account's timeline setting, saved with other Timer preferences. */
export default function useTimelineMode(): TimelineMode {
  const { followNowTimeline } = useTimer("followNowTimeline");
  return followNowTimeline ? "follow" : "day";
}

/** The "Follow now" switch and its setter. */
export function useTimelineSettings() {
  const { followNowTimeline, setFollowNowTimeline } = useTimer(
    "followNowTimeline",
    "setFollowNowTimeline"
  );
  return {
    follow: followNowTimeline,
    setFollow: setFollowNowTimeline,
  };
}
