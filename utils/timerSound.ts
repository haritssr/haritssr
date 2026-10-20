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

export function playClockTick(
  context: AudioContext | null,
  alternate: boolean,
  urgent = false
) {
  if (context === null || context.state !== "running") {
    return;
  }
  try {
    const buffer = context.createBuffer(
      1,
      Math.ceil(context.sampleRate * 0.03),
      context.sampleRate
    );
    const samples = buffer.getChannelData(0);
    for (let index = 0; index < samples.length; index += 1) {
      samples[index] = Math.random() * 2 - 1;
    }
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const start = context.currentTime;
    source.buffer = buffer;
    filter.type = "bandpass";
    const frequency = alternate ? 1400 : 1800;
    filter.frequency.value = urgent ? frequency + 1000 : frequency;
    filter.Q.value = 1;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(urgent ? 0.3 : 0.18, start + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.025);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    source.addEventListener(
      "ended",
      () => {
        source.disconnect();
        filter.disconnect();
        gain.disconnect();
      },
      { once: true }
    );
    source.start(start);
    source.stop(start + 0.03);
  } catch {
    // Clock audio must not interrupt running tasks.
  }
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
