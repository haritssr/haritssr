const COLOR_STOPS = [
  { color: [124, 58, 237], wavelength: 380 },
  { color: [37, 99, 235], wavelength: 450 },
  { color: [22, 163, 74], wavelength: 520 },
  { color: [234, 179, 8], wavelength: 590 },
  { color: [239, 68, 68], wavelength: 650 },
  { color: [220, 38, 38], wavelength: 700 },
] as const;
export function getLightColor(wavelength: number): string {
  const upperIndex = COLOR_STOPS.findIndex(
    (stop) => stop.wavelength >= wavelength
  );
  const lower = COLOR_STOPS[Math.max(0, upperIndex - 1)] ?? COLOR_STOPS[0];
  const upper = COLOR_STOPS[upperIndex] ?? COLOR_STOPS.at(-1) ?? COLOR_STOPS[0];
  const amount =
    (wavelength - lower.wavelength) /
    (upper.wavelength - lower.wavelength || 1);
  const channels = lower.color.map((channel, index) =>
    Math.round(channel + (upper.color[index] - channel) * amount)
  );

  return `rgb(${channels.join(", ")})`;
}

export function getIntensity(
  screenPosition: number,
  fringeSpacing: number
): number {
  const phase = (Math.PI * screenPosition) / fringeSpacing;
  return Math.cos(phase) ** 2;
}
