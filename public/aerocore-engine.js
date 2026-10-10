const AerocoreNative = {
  ctx: null,
  masterGain: null,
  isPlaying: false,
  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.85; // VOLUMEN PESADO
    this.masterGain.connect(this.ctx.destination);
  },
  playHeavy() {
    if(!this.ctx) this.init();
    if(this.ctx.state === 'suspended') this.ctx.resume();
    
    const now = this.ctx.currentTime;
    
    // 1. BAJO PESADO ENVOLVENTE (60hz - el que se siente en el pecho)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, now);
    osc1.frequency.linearRampToValueAtTime(65, now + 0.8);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.9, now + 0.1);
    gain1.gain.linearRampToValueAtTime(0.7, now + 2);
    osc1.connect(gain1); gain1.connect(this.masterGain);
    
    // 2. CUERPO MEDIO NÍTIDO (el rugido claro)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    const filter2 = this.ctx.createBiquadFilter();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(110, now);
    filter2.type = 'lowpass';
    filter2.frequency.value = 800;
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.6, now + 0.15);
    osc2.connect(filter2); filter2.connect(gain2); gain2.connect(this.masterGain);
    
    // 3. DETALLE AGUDO CRISTALINO (el brillo nítido)
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(220, now);
    gain3.gain.setValueAtTime(0, now);
    gain3.gain.linearRampToValueAtTime(0.25, now + 0.2);
    osc3.connect(gain3); gain3.connect(this.masterGain);
    
    osc1.start(now); osc2.start(now); osc3.start(now);
    osc1.stop(now + 3); osc2.stop(now + 3); osc3.stop(now + 3);
    
    this.isPlaying = true;
    setTimeout(()=>this.isPlaying=false,3000);
  }
};
window.AerocoreNative = AerocoreNative;
