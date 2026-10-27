import { ArrowPathIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";
import { FloatingDockNotice } from "@/components/floating/FloatingDock";
import FloatingNotification, {
  FLOATING_NOTIFICATION_CLASS_NAME,
} from "@/components/floating/FloatingNotification";

export default function FloatingRetryNotification({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <FloatingDockNotice>
      <div
        className={`${FLOATING_NOTIFICATION_CLASS_NAME} sm:w-[22.4rem]`}
        role="alert"
      >
        <FloatingNotification
          action={
            <Button
              aria-label="Retry timer refresh"
              title="Retry"
              data-timer-play=""
              size="icon-circle"
              variant="danger-subtle"
              onClick={onRetry}
            >
              <ArrowPathIcon
                aria-hidden="true"
                className="size-4.5"
                strokeWidth={2.5}
              />
            </Button>
          }
        >
          <p className="text-foreground text-sm leading-5 font-medium">
            Timer unavailable
          </p>
          <p className="text-muted text-xs leading-4 wrap-break-word">
            {message}
          </p>
        </FloatingNotification>
      </div>
    </FloatingDockNotice>
  );
}
