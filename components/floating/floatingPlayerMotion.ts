type Bounds = Pick<DOMRect, "left" | "top" | "width" | "height">;
interface PlayerMotion {
  from: Bounds;
  to: Bounds;
  animation: Animation | null;
}

const DURATION = 240;

function sameBounds(first: Bounds, second: Bounds) {
  return (["left", "top", "width", "height"] as const).every(
    (key) => Math.abs(first[key] - second[key]) < 0.5
  );
}

function currentBounds(motion: PlayerMotion): Bounds {
  if (motion.animation === null) {
    return motion.to;
  }
  const progress = motion.animation.effect?.getComputedTiming().progress ?? 0;
  return {
    left: motion.from.left + (motion.to.left - motion.from.left) * progress,
    top: motion.from.top + (motion.to.top - motion.from.top) * progress,
    width: motion.from.width + (motion.to.width - motion.from.width) * progress,
    height:
      motion.from.height + (motion.to.height - motion.from.height) * progress,
  };
}

// Animate the live surface, leaving its section available for layout measurement.
export default function createFloatingPlayerMotion() {
  const players = new Map<HTMLElement, PlayerMotion>();

  function clear() {
    for (const motion of players.values()) {
      motion.animation?.cancel();
    }
    players.clear();
  }

  function update(dock: HTMLElement, animate: boolean) {
    const surfaces = new Set(
      dock.querySelectorAll<HTMLElement>("[data-player] [data-floating-task]")
    );
    const measurements = [...surfaces].flatMap((surface) => {
      const section = surface.closest("section");
      return section === null
        ? []
        : [{ surface, bounds: section.getBoundingClientRect() }];
    });
    for (const [surface, motion] of players) {
      if (!surfaces.has(surface)) {
        motion.animation?.cancel();
        players.delete(surface);
      }
    }

    for (const { surface, bounds } of measurements) {
      const previous = players.get(surface);
      if (
        !animate ||
        typeof surface.animate !== "function" ||
        previous === undefined
      ) {
        previous?.animation?.cancel();
        players.set(surface, { from: bounds, to: bounds, animation: null });
        continue;
      }
      if (sameBounds(previous.to, bounds)) {
        continue;
      }

      const from = currentBounds(previous);
      previous.animation?.cancel();
      const animation = surface.animate(
        [
          {
            transform: `translate(${from.left - bounds.left}px, ${from.top - bounds.top}px)`,
            width: `${from.width}px`,
            overflow: "clip",
          },
          {
            transform: "translate(0, 0)",
            width: `${bounds.width}px`,
            overflow: "clip",
          },
        ],
        { duration: DURATION, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
      );
      const motion = { from, to: bounds, animation };
      players.set(surface, motion);
      animation.onfinish = () => {
        if (players.get(surface) === motion) {
          players.set(surface, { from: bounds, to: bounds, animation: null });
        }
      };
    }
  }

  return { clear, update };
}
