import { Cog6ToothIcon } from "@heroicons/react/24/outline";

import Button from "@/components/Button";

export default function ButtonWithIcon({
  physical = false,
}: {
  physical?: boolean;
}) {
  return (
    <Button
      data-timer-secondary={physical ? "" : undefined}
      size="icon-toolbar"
      variant="outline-toolbar"
    >
      <Cog6ToothIcon aria-hidden="true" className="size-4.5 stroke-2" />
      <span>Settings</span>
    </Button>
  );
}
