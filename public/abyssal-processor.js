class AbyssalMetalEngine {
  constructor(audioContext) {
    this.ctx = audioContext; this.filters = [];
    const sub = this.ctx.createBiquadFilter(); sub.type='lowshelf'; sub.frequency.value=60; sub.gain.value=8; this.filters.push(sub);
    const lowCut = this.ctx.createBiquadFilter(); lowCut.type='peaking'; lowCut.frequency.value=250; lowCut.Q.value=1.2; lowCut.gain.value=-6; this.filters.push(lowCut);
    const scoop = this.ctx.createBiquadFilter(); scoop.type='peaking'; scoop.frequency.value=800; scoop.Q.value=0.8; scoop.gain.value=-4; this.filters.push(scoop);
    const presence = this.ctx.createBiquadFilter(); presence.type='peaking'; presence.frequency.value=3000; presence.Q.value=1.5; presence.gain.value=6; this.filters.push(presence);
    const air = this.ctx.createBiquadFilter(); air.type='highshelf'; air.frequency.value=10000; air.gain.value=5; this.filters.push(air);
    for(let i=0;i<this.filters.length-1;i++){ this.filters[i].connect(this.filters[i+1]); }
    this.input=this.filters[0]; this.output=this.filters[this.filters.length-1];
  }
  connect(dest){ this.output.connect(dest); }
  getInput(){ return this.input; }
  setPreset(name){
    const presets={ metal:[8,-6,-4,6,5], doom:[12,-3,-6,2,0], thrash:[5,-4,-2,8,7], abismal:[15,-8,-8,10,8] };
    const vals=presets[name]||presets.metal; this.filters.forEach((f,i)=> f.gain.value=vals[i]);
  }
}
if(typeof window!=='undefined'){ window.AbyssalMetalEngine=AbyssalMetalEngine; }
