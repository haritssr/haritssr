export function formatRemainingTime(seconds: number): string {
  const total = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  const units = [
    { value: Math.floor(total / 3600), label: "hour" },
    { value: Math.floor((total % 3600) / 60), label: "minute" },
    { value: total % 60, label: "second" },
  ];
  const parts = units
    .filter(({ value }) => value > 0)
    .map(({ value, label }) => `${value} ${label}${value === 1 ? "" : "s"}`);
  return `${parts.length > 0 ? parts.join(" ") : "0 seconds"} remaining`;
}
