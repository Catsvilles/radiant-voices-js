import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 1024], initial: 256 } },
  { panning: { type: [-128, 128], initial: 0 } },
  { dcOffset: { type: [-128, 128], initial: 0 } },
  { inverse: { type: Boolean, initial: false } },
  { stereoWidth: { type: [0, 256], default: 128 } },
  { absolute: { type: Boolean, initial: false } },
  { fineVolume: { type: [0, 32768], initial: 32768 } },
])

export default class Amplifier extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isAmplifier(val) {
    return val && val instanceof Amplifier
  }

  static name() {
    return 'Amplifier'
  }

  static initialFlags() {
    return 0x51
  }

}

Amplifier.CONTROLLERS = CONTROLLERS
