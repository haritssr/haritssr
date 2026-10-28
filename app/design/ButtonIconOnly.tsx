import { CheckIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function ButtonIconOnly({
  physical = false,
}: {
  physical?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button
        aria-label="Settings"
        data-timer-secondary={physical ? "" : undefined}
        size="icon-toolbar"
        title="Settings"
        variant="secondary"
      >
        <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
      </Button>
      <Button
        aria-label="Done"
        data-timer-secondary={physical ? "" : undefined}
        size="icon-circle"
        title="Done"
        variant="secondary"
      >
        <CheckIcon aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </Button>
      <Button
        aria-label="Done (filled)"
        data-timer-play={physical ? "" : undefined}
        size="icon-circle"
        title="Done (filled)"
        variant="primary-subtle"
      >
        <CheckIcon aria-hidden="true" className="size-5" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
