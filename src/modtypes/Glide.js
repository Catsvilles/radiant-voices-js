import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { response: { type: [0, 1000], initial: 500 } },
  { sampleRateHz: { type: [1, 32768], initial: 150 } },
  { offsetOnFirstNote: { type: Boolean, initial: false } },
  { polyphony: { type: Boolean, initial: true } },
  { pitch: { type: [-600, 600], initial: 0 } },
  { pitchScale: { type: [0, 200], initial: 100 } },
  { reset: { type: Boolean, initial: false } },
])

export default class Glide extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isGlide(val) {
    return val && val instanceof Glide
  }

  static name() {
    return 'Glide'
  }

  static initialFlags() {
    return 0x21049
  }

}

Glide.CONTROLLERS = CONTROLLERS
