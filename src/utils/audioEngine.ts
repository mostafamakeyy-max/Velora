/**
 * Ultra-Calm Ambient Piano Audio Engine for Velora | ڤيلورا
 * Synthesizes an extraordinarily tranquil, nerve-soothing acoustic felt piano soundscape.
 * Uses physical-modelled piano harmonics, warm low-pass felt damping, and ambient acoustic space.
 * 100% self-contained: Zero network latency, whisper-soft volume, seamless meditative loop.
 */

interface PianoNoteDef {
  freq: number;
  velocity: number; // 0 to 1
  duration: number; // decay time in seconds
}

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private masterGain: GainNode | null = null;
  private reverbNode: ConvolverNode | null = null;
  private delayNode: DelayNode | null = null;
  private delayGain: GainNode | null = null;
  private isInitialized: boolean = false;
  private listeners: ((playing: boolean) => void)[] = [];
  private soundEffectsEnabled: boolean = true;
  private pianoTimer: number | null = null;
  private sequenceStep: number = 0;

  // Timeless, ultra-peaceful ambient piano phrase in Db major / Ab major (gentle felt piano)
  private readonly pianoScore: PianoNoteDef[] = [
    // Phrase 1: Db Majestic Tranquility
    { freq: 138.59, velocity: 0.38, duration: 4.5 }, // Db3
    { freq: 207.65, velocity: 0.30, duration: 4.0 }, // Ab3
    { freq: 277.18, velocity: 0.28, duration: 3.8 }, // Db4
    { freq: 349.23, velocity: 0.32, duration: 3.5 }, // F4
    { freq: 523.25, velocity: 0.24, duration: 3.5 }, // C5
    { freq: 415.30, velocity: 0.26, duration: 3.8 }, // Ab4

    // Phrase 2: Bbm Ethereal Depth
    { freq: 116.54, velocity: 0.36, duration: 4.5 }, // Bb2
    { freq: 174.61, velocity: 0.28, duration: 4.0 }, // F3
    { freq: 277.18, velocity: 0.26, duration: 3.8 }, // Db4
    { freq: 349.23, velocity: 0.30, duration: 3.5 }, // F4
    { freq: 466.16, velocity: 0.22, duration: 3.5 }, // Bb4
    { freq: 311.13, velocity: 0.24, duration: 3.8 }, // Eb4

    // Phrase 3: Abadd9 Serenity
    { freq: 103.83, velocity: 0.35, duration: 4.5 }, // Ab2
    { freq: 155.56, velocity: 0.28, duration: 4.0 }, // Eb3
    { freq: 261.63, velocity: 0.26, duration: 3.8 }, // C4
    { freq: 311.13, velocity: 0.30, duration: 3.5 }, // Eb4
    { freq: 415.30, velocity: 0.25, duration: 3.5 }, // Ab4
    { freq: 207.65, velocity: 0.24, duration: 3.8 }, // Ab3

    // Phrase 4: Gbmaj7 Warm Horizon
    { freq: 92.50, velocity: 0.34, duration: 4.5 },  // Gb2
    { freq: 138.59, velocity: 0.28, duration: 4.0 }, // Db3
    { freq: 233.08, velocity: 0.26, duration: 3.8 }, // Bb3
    { freq: 349.23, velocity: 0.28, duration: 3.5 }, // F4
    { freq: 277.18, velocity: 0.24, duration: 3.8 }, // Db4
    { freq: 174.61, velocity: 0.22, duration: 4.0 }, // F3
  ];

  private initContext() {
    if (this.ctx) return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    this.ctx = new AudioCtx();

    // Master volume gain (whisper-quiet, ultra-peaceful)
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

    // Warm spatial diffusion (delicate acoustic space reflection)
    try {
      this.delayNode = this.ctx.createDelay(1.5);
      this.delayNode.delayTime.setValueAtTime(0.55, this.ctx.currentTime);

      this.delayGain = this.ctx.createGain();
      this.delayGain.gain.setValueAtTime(0.28, this.ctx.currentTime); // gentle feedback

      // Soft damping filter on delay line
      const dampingFilter = this.ctx.createBiquadFilter();
      dampingFilter.type = 'lowpass';
      dampingFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

      this.delayNode.connect(dampingFilter);
      dampingFilter.connect(this.delayGain);
      this.delayGain.connect(this.delayNode);
      dampingFilter.connect(this.masterGain);
    } catch {
      // Fallback
    }

    this.masterGain.connect(this.ctx.destination);
    this.isInitialized = true;
  }

  /**
   * Synthesize a single gentle felt piano keystroke
   */
  private playPianoNote(note: PianoNoteDef) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const velocity = note.velocity;

      // 1. Note Gain Envelope (felt hammer strike & acoustic natural decay)
      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0.0001, now);
      // Delicate soft attack (not harsh, sounds like a gentle finger pressing a felt hammer)
      noteGain.gain.exponentialRampToValueAtTime(velocity * 0.16, now + 0.025);
      // Long, graceful decay mimicking piano strings ringing in a wooden grand piano body
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + note.duration);

      // 2. Warm Low-Pass Felt Filter (softens highs to avoid harshness, simulates felt damper)
      const feltFilter = this.ctx.createBiquadFilter();
      feltFilter.type = 'lowpass';
      // Lower notes have warmer cutoff; higher notes have slightly higher cutoff
      const cutoffFreq = Math.min(1100, Math.max(450, note.freq * 2.8));
      feltFilter.frequency.setValueAtTime(cutoffFreq, now);
      feltFilter.Q.setValueAtTime(0.8, now);

      // 3. Harmonic Oscillators (Piano string physical model)
      // Fundamental string
      const oscFundamental = this.ctx.createOscillator();
      oscFundamental.type = 'sine';
      oscFundamental.frequency.setValueAtTime(note.freq, now);

      // Second harmonic (octave overtone - gives piano wooden warmth)
      const oscHarmonic2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      oscHarmonic2.type = 'sine';
      oscHarmonic2.frequency.setValueAtTime(note.freq * 2, now);
      gain2.gain.setValueAtTime(velocity * 0.06, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + note.duration * 0.7);

      // Third harmonic (delicate overtone shimmer)
      const oscHarmonic3 = this.ctx.createOscillator();
      const gain3 = this.ctx.createGain();
      oscHarmonic3.type = 'sine';
      oscHarmonic3.frequency.setValueAtTime(note.freq * 3, now);
      gain3.gain.setValueAtTime(velocity * 0.02, now);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + note.duration * 0.45);

      // Warm sub-resonance (piano soundboard resonance)
      const oscSub = this.ctx.createOscillator();
      const gainSub = this.ctx.createGain();
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(note.freq * 0.5, now);
      gainSub.gain.setValueAtTime(velocity * 0.035, now);
      gainSub.gain.exponentialRampToValueAtTime(0.0001, now + note.duration * 0.6);

      // Connect oscillators to note gain
      oscFundamental.connect(noteGain);
      oscHarmonic2.connect(gain2);
      gain2.connect(noteGain);
      oscHarmonic3.connect(gain3);
      gain3.connect(noteGain);
      oscSub.connect(gainSub);
      gainSub.connect(noteGain);

      // Connect note gain through the felt filter into master & spatial delay
      noteGain.connect(feltFilter);
      feltFilter.connect(this.masterGain);
      if (this.delayNode) {
        feltFilter.connect(this.delayNode);
      }

      // Start oscillators
      oscFundamental.start(now);
      oscHarmonic2.start(now);
      oscHarmonic3.start(now);
      oscSub.start(now);

      // Clean up after note expires
      const stopTime = now + note.duration + 0.1;
      oscFundamental.stop(stopTime);
      oscHarmonic2.stop(stopTime);
      oscHarmonic3.stop(stopTime);
      oscSub.stop(stopTime);
    } catch {
      // Safe fallback
    }
  }

  private startPianoLoop() {
    if (this.pianoTimer !== null) return;

    const playNextNote = () => {
      if (this.isMuted) return;

      const currentNote = this.pianoScore[this.sequenceStep];
      this.playPianoNote(currentNote);

      this.sequenceStep = (this.sequenceStep + 1) % this.pianoScore.length;

      // Natural, relaxed pacing between keystrokes (1.8 to 2.4 seconds)
      const nextInterval = 1800 + Math.random() * 500;
      this.pianoTimer = window.setTimeout(playNextNote, nextInterval);
    };

    playNextNote();
  }

  private stopPianoLoop() {
    if (this.pianoTimer !== null) {
      clearTimeout(this.pianoTimer);
      this.pianoTimer = null;
    }
  }

  public async toggleAudio(): Promise<boolean> {
    this.initContext();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    const nextState = !this.isMuted;
    this.isMuted = nextState;

    const now = this.ctx.currentTime;
    if (!this.isMuted) {
      // Soft gentle fade in to ultra-quiet background level (0.13)
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(Math.max(this.masterGain.gain.value, 0.0001), now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.13, now + 2.5);

      this.startPianoLoop();
    } else {
      // Gentle fade out
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      setTimeout(() => {
        if (this.isMuted) {
          this.stopPianoLoop();
        }
      }, 1500);
    }

    this.notify(!this.isMuted);
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify(playing: boolean) {
    this.listeners.forEach((cb) => cb(playing));
  }

  /**
   * Delicate acoustic micro-click for interactive elements
   */
  public playMicroClick() {
    if (!this.soundEffectsEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.025);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Safe fallback
    }
  }

  public playHapticShutter() {
    if (!this.soundEffectsEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Safe fallback
    }
  }
}

export const soundEngine = new CinematicAudioEngine();
