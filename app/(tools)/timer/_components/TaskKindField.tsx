import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

import type { TaskKind } from "../utils/timer";

/** Work/Leisure toggle; `name` adds a hidden input for form submission. */
export default function TaskKindField({
  value,
  onChange,
  disabled = false,
  name,
}: {
  value: TaskKind;
  onChange: (kind: TaskKind) => void;
  disabled?: boolean;
  name?: string;
}) {
  return (
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="mb-2 text-sm">Type</legend>
      <ButtonGroup aria-label="Type" className="w-full">
        <ButtonGroupItem
          aria-pressed={value === "work"}
          className="flex-1"
          tone="work"
          disabled={disabled}
          onClick={() => {
            onChange("work");
          }}
        >
          Work
        </ButtonGroupItem>
        <ButtonGroupItem
          aria-pressed={value === "leisure"}
          className="flex-1"
          tone="leisure"
          disabled={disabled}
          onClick={() => {
            onChange("leisure");
          }}
        >
          Leisure
        </ButtonGroupItem>
      </ButtonGroup>
      {name === undefined ? null : (
        <input type="hidden" name={name} value={value} />
      )}
    </fieldset>
  );
}
