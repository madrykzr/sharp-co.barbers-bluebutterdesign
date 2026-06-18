// Web Audio API Retro Click Sound Generator
// Simple, completely client-side, zero assets needed, highly reliable.

let isSoundEnabled = false;

export function toggleClickSound(enabled: boolean) {
  isSoundEnabled = enabled;
  if (enabled) {
    playRetroScissorsClick(); // Test fire
  }
}

export function getSoundStatus(): boolean {
  return isSoundEnabled;
}

export function playRetroScissorsClick() {
  if (!isSoundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Noise buffer for mechanical metal metallic snap sound of scissors
    const bufferSize = ctx.sampleRate * 0.05; // 50 milliseconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // White noise with exponential decay
      const decay = Math.pow(1 - i / bufferSize, 3);
      data[i] = (Math.random() * 2 - 1) * decay * 0.15;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Highpass filter for thin light shear slide sound
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(6000, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    // Dynamic metallic bell-like peak
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(8000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.03);

    oscGain.gain.setValueAtTime(0.06, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    // Combine
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(1.0, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

    noiseNode.connect(filter);
    filter.connect(masterGain);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    masterGain.connect(ctx.destination);

    // Play
    noiseNode.start();
    osc.start();

    // Clean stop
    noiseNode.stop(ctx.currentTime + 0.05);
    osc.stop(ctx.currentTime + 0.05);
  } catch (error) {
    console.warn("AudioContext block or error:", error);
  }
}
export function playDullClick() {
  if (!isSoundEnabled) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // Ignore context blocked
  }
}
