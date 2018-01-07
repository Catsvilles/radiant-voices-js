import Controllers from './Controllers'
import ModType from './ModType'

const Waveform = {
  triangle: 0,
  square: 1,
  sin: 2,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 256 } },
  { waveform: { type: Waveform, initial: Waveform.triangle } },
  { panning: { type: [-128, 128], initial: 0 } },
  { attack: { type: [0, 512], initial: 0 } },
  { release: { type: [0, 512], initial: 32 } },
  { volAddition: { type: [0, 1024], initial: 0 } },
  { envAcceleration: { type: [0, 1024], initial: 256 } },
  { polyphonyCh: { type: [1, 4], initial: 1 } },
  { anticlick: { type: Boolean, initial: false } },
])

export default class Kicker extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isKicker(val) {
    return val && val instanceof Kicker
  }

  static name() {
    return 'Kicker'
  }

  static initialFlags() {
    return 0x49
  }

}

Kicker.CONTROLLERS = CONTROLLERS
Kicker.Waveform = Waveform
