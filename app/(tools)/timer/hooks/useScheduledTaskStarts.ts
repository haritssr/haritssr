import { useEffect } from "react";

import { subscribeScheduledTaskStarts } from "../utils/scheduledTaskStarts";
import type { TimerController } from "../utils/timerController";

export default function useScheduledTaskStarts(controller: TimerController) {
  useEffect(() => subscribeScheduledTaskStarts(controller), [controller]);
}
