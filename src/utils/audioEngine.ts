/**
 * Real Web Audio API synthesizer engine providing atmospheric,
 * rhythmic Cuban urban synth sounds during track playback.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private volume = 0.8;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    try {
      this.initContext();
      if (!this.ctx || !this.gainNode) return;
      this.isPlaying = true;

      // Start looping rhythmic ambient chords
      this.scheduleLoop();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  private scheduleLoop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;

    // Musical notes frequencies for deep atmospheric minor chord progression
    const chordFrequencies = [
      [110.0, 130.81, 164.81], // A minor (A2, C3, E3)
      [98.0, 123.47, 146.83],  // G major (G2, B2, D3)
      [87.31, 110.0, 130.81],  // F major (F2, A2, C3)
      [82.41, 123.47, 164.81], // E minor (E2, B2, E3)
    ];

    let chordIdx = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;

      const now = this.ctx.currentTime;
      const freqs = chordFrequencies[chordIdx % chordFrequencies.length];
      chordIdx++;

      // Deep Warm Sub Bass
      const oscBass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      oscBass.type = 'sine';
      oscBass.frequency.setValueAtTime(freqs[0] / 2, now);

      bassGain.gain.setValueAtTime(0.001, now);
      bassGain.gain.exponentialRampToValueAtTime(0.28 * this.volume, now + 0.08);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      oscBass.connect(bassGain);
      bassGain.connect(this.gainNode);
      oscBass.start(now);
      oscBass.stop(now + 1.3);

      // Lush synth pad
      freqs.forEach((f, i) => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = i === 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(f, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.06 * this.volume, now + 0.25);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

        osc.connect(g);
        g.connect(this.gainNode);
        osc.start(now);
        osc.stop(now + 1.4);
      });

      // Soft urban hi-hat shimmer tick
      const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.04, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let j = 0; j < noiseBuffer.length; j++) {
        output[j] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02 * this.volume, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      noise.connect(noiseGain);
      noiseGain.connect(this.gainNode);
      noise.start(now);

      this.timerId = window.setTimeout(playStep, 1300);
    };

    playStep();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }
}

export const audioEngine = new AudioSynthesizer();
