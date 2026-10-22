export interface DurationValue {
  hours: string;
  minutes: string;
  seconds: string;
}

export function durationValue(seconds: number): DurationValue {
  return {
    hours: String(Math.floor(seconds / 3600)),
    minutes: String(Math.floor((seconds % 3600) / 60)),
    seconds: String(seconds % 60),
  };
}

export function durationSeconds(value: DurationValue) {
  return (
    Number(value.hours) * 3600 +
    Number(value.minutes) * 60 +
    Number(value.seconds)
  );
}

export function formatPresetDuration(seconds: number) {
  const value = durationValue(seconds);
  return [
    Number(value.hours) ? `${value.hours}h` : "",
    Number(value.minutes) ? `${value.minutes}m` : "",
    Number(value.seconds) ? `${value.seconds}s` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
