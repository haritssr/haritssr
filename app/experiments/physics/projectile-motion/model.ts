export const GRAVITY = 9.81;

export function getProjectileMotion(
  speed: number,
  angle: number,
  height: number
) {
  const radians = (angle * Math.PI) / 180;
  const horizontalVelocity = speed * Math.cos(radians);
  const initialVerticalVelocity = speed * Math.sin(radians);
  const flightTime =
    (initialVerticalVelocity +
      Math.sqrt(initialVerticalVelocity ** 2 + 2 * GRAVITY * height)) /
    GRAVITY;

  return {
    height,
    horizontalVelocity,
    initialVerticalVelocity,
    flightTime,
    range: horizontalVelocity * flightTime,
    peakTime: initialVerticalVelocity / GRAVITY,
    peakHeight: height + initialVerticalVelocity ** 2 / (2 * GRAVITY),
  };
}

export function getPosition(
  motion: ReturnType<typeof getProjectileMotion>,
  time: number
) {
  const elapsed = Math.max(0, Math.min(time, motion.flightTime));
  return {
    x: motion.horizontalVelocity * elapsed,
    y: Math.max(
      0,
      motion.height +
        motion.initialVerticalVelocity * elapsed -
        (GRAVITY * elapsed ** 2) / 2
    ),
    verticalVelocity: motion.initialVerticalVelocity - GRAVITY * elapsed,
  };
}
