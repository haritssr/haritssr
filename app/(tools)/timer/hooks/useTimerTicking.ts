import { useSyncExternalStore } from "react";

import { prepareTaskSound } from "@/app/(tools)/timer/utils/timerSound";
import {
  getTickingEnabled,
  setTickingEnabled,
  subscribeTicking,
} from "@/app/(tools)/timer/utils/timerTicking";

function serverTickingEnabled() {
  return false;
}

function changeTickingEnabled(enabled: boolean) {
  if (enabled) {
    prepareTaskSound();
  }
  setTickingEnabled(enabled);
}

export default function useTimerTicking() {
  const tickingEnabled = useSyncExternalStore(
    subscribeTicking,
    getTickingEnabled,
    serverTickingEnabled
  );
  return { tickingEnabled, setTickingEnabled: changeTickingEnabled };
}
