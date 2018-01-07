import Controllers from './Controllers'
import ModType from './ModType'

const Type = {
  lim: 0,
  sat: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 128 } },
  { type: { type: Type, initial: Type.lim } },
  { power: { type: [0, 256], initial: 0 } },
  { bitDepth: { type: [1, 16], initial: 16 } },
  { freqHz: { type: [0, 44100], initial: 44100 } },
  { noise: { type: [0, 256], initial: 0 } },

])

export default class Distortion extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isDistortion(val) {
    return val && val instanceof Distortion
  }

  static name() {
    return 'Distortion'
  }

  static initialFlags() {
    return 0x51
  }

}

Distortion.CONTROLLERS = CONTROLLERS
Distortion.Type = Type
