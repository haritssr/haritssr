/**
 * A boolean preference kept in this browser's localStorage, shared across tabs
 * and readable with `useSyncExternalStore`.
 */
export function createLocalSetting(storageKey: string) {
  const listeners = new Set<() => void>();
  let value: boolean | undefined;

  function read() {
    try {
      return window.localStorage.getItem(storageKey) === "true";
    } catch {
      return value ?? false;
    }
  }

  function publish() {
    for (const listener of listeners) {
      listener();
    }
  }

  function storageChanged(event: StorageEvent) {
    if (event.key !== null && event.key !== storageKey) {
      return;
    }
    try {
      if (event.storageArea !== window.localStorage) {
        return;
      }
    } catch {
      return;
    }
    value = read();
    publish();
  }

  return {
    get: () => {
      if (typeof window === "undefined") {
        return false;
      }
      value ??= read();
      return value;
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      if (listeners.size === 1) {
        window.addEventListener("storage", storageChanged);
        value = read();
      }
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener("storage", storageChanged);
        }
      };
    },
    set: (next: boolean) => {
      value = next;
      try {
        window.localStorage.setItem(storageKey, String(next));
      } catch {
        // Keep the toggle usable when browser storage is unavailable.
      }
      publish();
    },
  };
}
