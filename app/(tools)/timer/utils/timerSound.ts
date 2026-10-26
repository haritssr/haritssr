let taskAudioContext: AudioContext | undefined;

export function prepareTaskSound() {
  try {
    taskAudioContext ??= new AudioContext();
    void taskAudioContext.resume().catch(() => {
      // Audio availability must not interrupt timer controls.
    });
    return taskAudioContext;
  } catch {
    return null;
  }
}

export function playClockTick(context: AudioContext | null) {
  if (context === null || context.state !== "running") {
    return;
  }
  try {
    playQuartzTick(context);
  } catch {
    // Clock audio must not interrupt running tasks.
  }
}

// A short broadband impact and a damped body mimic a mechanical escapement.
function playQuartzTick(context: AudioContext) {
  const pitch = 3100;
  const body = 950;
  const decay = 0.009;
  const weight = 0.25;
  const duration = 0.12;
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * duration),
    context.sampleRate
  );
  const samples = buffer.getChannelData(0);
  let seed = 12_345;
  let smoothed = 0;
  for (let index = 0; index < samples.length; index += 1) {
    const time = index / context.sampleRate;
    seed = (seed * 16_807) % 2_147_483_647;
    const noise = (seed / 2_147_483_647) * 2 - 1;
    smoothed += 0.35 * (noise - smoothed);
    const attack = Math.min(1, time / 0.0008);
    const impact = (noise - smoothed) * Math.exp(-time / 0.0025);
    const mechanism =
      Math.sin(2 * Math.PI * pitch * time) * Math.exp(-time / (decay * 0.35));
    const resonance =
      Math.sin(2 * Math.PI * body * time) * Math.exp(-time / decay);
    samples[index] =
      attack * (impact * 0.35 + mechanism * 0.2 + resonance * weight) * 0.25;
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.addEventListener(
    "ended",
    () => {
      source.disconnect();
    },
    { once: true }
  );
  source.start(context.currentTime);
}

export function playTaskSound(
  context: AudioContext | null,
  action: "start" | "pause" | "done" | "reached"
) {
  if (context === null) {
    return;
  }
  try {
    const notes = {
      start: [520, 780],
      pause: [780, 520],
      done: [660, 880, 1100],
      reached: [880, 660, 880, 660, 1100],
    }[action];
    const spacing = action === "reached" ? 0.2 : 0.1;
    for (const [index, frequency] of notes.entries()) {
      const start = context.currentTime + index * spacing;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.07, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.addEventListener(
        "ended",
        () => {
          oscillator.disconnect();
          gain.disconnect();
        },
        { once: true }
      );
      oscillator.start(start);
      oscillator.stop(start + 0.18);
    }
  } catch {
    // Timer actions remain available when audio is unsupported or interrupted.
  }
}
