import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const CONTROLLERS = new Controllers([
  { dry: { type: [0, 256], initial: 256 } },
  { wet: { type: [0, 256], initial: 64 } },
  { feedback: { type: [0, 256], initial: 256 } },
  { damp: { type: [0, 256], initial: 128 } },
  { stereoWidth: { type: [0, 256], initial: 256 } },
  { freeze: { type: Boolean, initial: false } },
  { mode: { type: Mode, initial: Mode.hq } },
  { allPassFilter: { type: Boolean, initial: true } },
  { roomSize: { type: [0, 128], initial: 16 } },
  { randomSeed: { type: [0, 32768], initial: 0 } },
])

export default class Reverb extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isReverb(val) {
    return val && val instanceof Reverb
  }

  static name() {
    return 'Reverb'
  }

  static initialFlags() {
    return 0x51
  }

}

Reverb.CONTROLLERS = CONTROLLERS
Reverb.Mode = Mode
