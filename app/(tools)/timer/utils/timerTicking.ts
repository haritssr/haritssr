import { createLocalSetting } from "./timerLocalSetting";

const ticking = createLocalSetting("haritssr-timer-ticking:v1");

export const getTickingEnabled = ticking.get;
export const subscribeTicking = ticking.subscribe;
export const setTickingEnabled = ticking.set;
