const AerocoreNative = {
  ctx: null,
  masterGain: null,
  init() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();

    // COMPRESOR PARA QUE SUENE PESADO Y NITIDO
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -24;
    comp.knee.value = 30;
    comp.ratio.value = 12;
    comp.attack.value = 0.003;
    comp.release.value = 0.25;

    // DISTORSION ABISMAL
    const dist = this.ctx.createWaveShaper();
    dist.curve = this.makeDistortion(666);
    dist.oversample = '4x';

    // REVERB ENVOLVENTE
    const convolver = this.ctx.createConvolver();
    convolver.buffer = this.makeReverb(2.5);

    this.masterGain.gain.value = 0.9;
    this.masterGain.connect(dist);
    dist.connect(comp);
    comp.connect(convolver);
    convolver.connect(this.ctx.destination);

    console.log("🔥 AEROCORE V2 INICIADO 🔥");
  },
  makeDistortion(amount){
    let k = typeof amount === 'number'? amount : 50;
    let n_samples = 44100;
    let curve = new Float32Array(n_samples);
    let deg = Math.PI / 180;
    for (let i=0;i<n_samples;++i){
      let x = i*2/n_samples-1;
      curve[i] = (3+k)*x*20*deg/(Math.PI + k*Math.abs(x));
    }
    return curve;
  },
  makeReverb(seconds){
    let rate = this.ctx.sampleRate;
    let len = rate * seconds;
    let impulse = this.ctx.createBuffer(2, len, rate);
    for(let ch=0;ch<2;ch++){
      let data = impulse.getChannelData(ch);
      for(let i=0;i<len;i++){
        data[i] = (Math.random()*2-1)*Math.pow(1-i/len,2);
      }
    }
    return impulse;
  },
  playHeavy() {
    if(!this.ctx) this.init();
    if(this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;

    // BAJO ABISMAL 55hz - EL QUE PEGA EN EL PECHO
    [55, 110, 220, 440].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filt = this.ctx.createBiquadFilter();

      osc.type = idx===0? 'sine' : idx===1? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq*1.05, now+1.2);

      filt.type = 'lowpass';
      filt.frequency.value = idx===0? 250 : 1200;
      filt.Q.value = 2;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime([0.95,0.6,0.3,0.15][idx], now+0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now+3.5);

      osc.connect(filt); filt.connect(gain); gain.connect(this.masterGain);
      osc.start(now); osc.stop(now+3.5);
    });

    // GOLPE SUB-GRAVE
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.frequency.setValueAtTime(35, now);
    subGain.gain.setValueAtTime(1, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now+0.5);
    sub.connect(subGain); subGain.connect(this.masterGain);
    sub.start(now); sub.stop(now+0.5);
  }
};
window.AerocoreNative = AerocoreNative;
