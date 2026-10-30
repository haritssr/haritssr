import { BellAlertIcon } from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export const FLOATING_NOTIFICATION_CLASS_NAME =
  "border-border bg-background/70 shadow-foreground/10 pointer-events-auto w-full rounded-full border-hairline py-2 pr-2 pl-4 shadow-lg backdrop-blur-md";

export default function FloatingNotification({
  children,
  action,
}: {
  children: ReactNode;
  action: ReactNode;
}) {
  return (
    <div className="flex min-h-10 items-center gap-2">
      <span
        className="notification-bell text-foreground inline-flex shrink-0"
        aria-hidden="true"
      >
        <BellAlertIcon className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  );
}
