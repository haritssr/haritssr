import { TIMER_HISTORY_RANGES } from "@/app/(tools)/timer/utils/timer";
import type { TimerHistoryRange } from "@/app/(tools)/timer/utils/timer";
import { ButtonGroup, ButtonGroupItem } from "@/components/ButtonGroup";

export default function RangeSelect({
  value,
  onChange,
}: {
  value: TimerHistoryRange;
  onChange: (range: TimerHistoryRange) => void;
}) {
  return (
    <ButtonGroup aria-label="History range">
      {TIMER_HISTORY_RANGES.map((range) => (
        <ButtonGroupItem
          aria-pressed={range === value}
          key={range}
          onClick={() => {
            onChange(range);
          }}
        >
          {range} days
        </ButtonGroupItem>
      ))}
    </ButtonGroup>
  );
}
