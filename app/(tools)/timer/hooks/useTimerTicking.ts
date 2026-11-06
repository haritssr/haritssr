import { useSyncExternalStore } from "react";

import { createLocalSetting } from "@/app/(tools)/timer/utils/timerLocalSetting";
import { prepareTaskSound } from "@/app/(tools)/timer/utils/timerSound";

const ticking = createLocalSetting("haritssr-timer-ticking:v1");

export const getTickingEnabled = ticking.get;
export const subscribeTicking = ticking.subscribe;

function serverTickingEnabled() {
  return false;
}

function changeTickingEnabled(enabled: boolean) {
  if (enabled) {
    prepareTaskSound();
  }
  ticking.set(enabled);
}

export default function useTimerTicking() {
  const tickingEnabled = useSyncExternalStore(
    subscribeTicking,
    getTickingEnabled,
    serverTickingEnabled
  );
  return { tickingEnabled, setTickingEnabled: changeTickingEnabled };
}
