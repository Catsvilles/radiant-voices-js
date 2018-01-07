import Controllers from './Controllers'
import ModType from './ModType'

const Waveform = {
  triangle: 0,
  saw: 1,
  square: 2,
  noise: 3,
  dirty: 4,
  sin: 5,
  hsin: 6,
  asin: 7,
  psin: 8,
}

const Mode = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 128 } },
  { waveform: { type: Waveform, initial: Waveform.triangle } },
  { panning: { type: [-128, 128], initial: 0 } },
  { attack: { type: [0, 512], initial: 0 } },
  { release: { type: [0, 512], initial: 0 } },
  { polyphonyCh: { type: [1, 16], initial: 8 } },
  { mode: { type: Mode, initial: Mode.stereo } },
  { sustain: { type: Boolean, initial: true } },
  { freqModulationInput: { type: [0, 256], initial: 0 } },
  { dutyCycle: { type: [0, 1022], initial: 511 } },
])

export default class Generator extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isGenerator(val) {
    return val && val instanceof Generator
  }

  static name() {
    return 'Generator'
  }

  static initialFlags() {
    return 0x59
  }

}

Generator.CONTROLLERS = CONTROLLERS
Generator.Waveform = Waveform
Generator.Mode = Mode
