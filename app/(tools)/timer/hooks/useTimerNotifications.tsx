import { Toast } from "@base-ui/react/toast";
import { useEffect, useRef } from "react";

import { canUseTimer } from "@/app/(tools)/timer/utils/timer";
import type {
  TimerNotice,
  TimerSnapshot,
} from "@/app/(tools)/timer/utils/timer";
import { sendTimerAction } from "@/app/(tools)/timer/utils/timerClient";
import type { ReceivedTimerSnapshot } from "@/app/(tools)/timer/utils/timerClient";
import {
  playTaskSound,
  prepareTaskSound,
} from "@/app/(tools)/timer/utils/timerSound";
import InternalLink from "@/components/InternalLink";

async function showCompletion(notice: TimerNotice) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }
  const options = {
    body: `${notice.activity} is done.`,
    tag: `timer-${notice.date}-${notice.taskId}`,
    icon: "/favicon-32x32.png",
    data: { url: "/timer" },
  };
  try {
    // Registration is opt-in for the local timer; the site's normal registration stays unchanged.
    if ("serviceWorker" in navigator) {
      const registration =
        (await navigator.serviceWorker.getRegistration("/")) ??
        (await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        }));
      if (registration.active === null) {
        await navigator.serviceWorker.ready;
      }
      await registration.showNotification("Duration reached", options);
      return;
    }
    const notification = new Notification("Duration reached", options);
    notification.addEventListener("click", () => {
      window.focus();
      window.location.assign("/timer");
    });
  } catch {
    // The visible completion message is always available when system notifications fail.
  }
}

export default function useTimerNotifications({
  snapshot,
  publish,
  autoplay,
  notificationsEnabled,
}: {
  snapshot: TimerSnapshot | undefined;
  publish: (snapshot: ReceivedTimerSnapshot) => void;
  autoplay: boolean;
  notificationsEnabled: boolean;
}) {
  const { add } = Toast.useToastManager();
  const claiming = useRef(new Set<string>());

  useEffect(() => {
    if (!canUseTimer(snapshot)) {
      return;
    }
    for (const notice of snapshot.notifications) {
      const key = `${notice.date}/${notice.taskId}`;
      if (claiming.current.has(key)) {
        continue;
      }
      claiming.current.add(key);
      void sendTimerAction({
        action: "acknowledge",
        autoplay,
        date: notice.date,
        taskId: notice.taskId,
      })
        .then(async (result) => {
          publish(result.snapshot);
          if (result.notification !== null) {
            add({
              id: "timer-completion",
              title: "Task completed",
              description: (
                <InternalLink href="/timer" variant="footer">
                  {result.notification.activity} is done!
                </InternalLink>
              ),
              timeout: 5000,
            });
            playTaskSound(prepareTaskSound(), "reached");
            if (
              result.snapshot.preferences?.notificationsEnabled ??
              notificationsEnabled
            ) {
              await showCompletion(result.notification);
            }
          }
        })
        .catch(() => {
          /* The next refresh will retry an unclaimed completion. */
        })
        .finally(() => {
          claiming.current.delete(key);
        });
    }
  }, [snapshot, publish, notificationsEnabled, autoplay, add]);
}
