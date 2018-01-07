import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { panning: { type: [-128, 128], initial: 0 } },
  { polyphonyCh: { type: [1, 8], initial: 4 } },
  { bassVolume: { type: [0, 512], initial: 200 } },
  { bassPower: { type: [0, 256], initial: 256 } },
  { bassTone: { type: [0, 256], initial: 64 } },
  { bassLength: { type: [0, 256], initial: 64 } },
  { hihatVolume: { type: [0, 512], initial: 256 } },
  { hihatLength: { type: [0, 256], initial: 64 } },
  { snareVolume: { type: [0, 512], initial: 256 } },
  { snareTone: { type: [0, 256], initial: 128 } },
  { snareLength: { type: [0, 256], initial: 64 } },
])

export default class DrumSynth extends ModType {

  constructor() {
    return super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isDrumSynth(val) {
    return val && val instanceof DrumSynth
  }

  static name() {
    return 'DrumSynth'
  }

  static initialFlags() {
    return 0x49
  }

}

DrumSynth.CONTROLLERS = CONTROLLERS
