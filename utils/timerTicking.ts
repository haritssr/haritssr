const STORAGE_KEY = "haritssr-timer-ticking:v1";
const listeners = new Set<() => void>();
let ticking: boolean | undefined;

function readTicking() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return ticking ?? false;
  }
}

function publish() {
  for (const listener of listeners) {
    listener();
  }
}

function storageChanged(event: StorageEvent) {
  if (event.key !== null && event.key !== STORAGE_KEY) {
    return;
  }
  try {
    if (event.storageArea !== window.localStorage) {
      return;
    }
  } catch {
    return;
  }
  ticking = readTicking();
  publish();
}

export function getTickingEnabled() {
  if (typeof window === "undefined") {
    return false;
  }
  ticking ??= readTicking();
  return ticking;
}

export function subscribeTicking(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", storageChanged);
    ticking = readTicking();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", storageChanged);
    }
  };
}

export function setTickingEnabled(enabled: boolean) {
  ticking = enabled;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // Keep the toggle usable when browser storage is unavailable.
  }
  publish();
}
