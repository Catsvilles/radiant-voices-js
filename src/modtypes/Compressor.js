import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  peak: 0,
  rms: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { threshold: { type: [0, 512], initial: 256 } },
  { slopePct: { type: [0, 200], initial: 100 } },
  { attackMs: { type: [0, 500], initial: 1 } },
  { releaseMs: { type: [1, 1000], initial: 300 } },
  { mode: { type: Mode, initial: Mode.peak } },
  { sidechainInput: { type: [0, 32], initial: 0 } },
])

export default class Compressor extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isCompressor(val) {
    return val && val instanceof Compressor
  }

  static name() {
    return 'Compressor'
  }

  static initialFlags() {
    return 0x2051
  }

}

Compressor.CONTROLLERS = CONTROLLERS
Compressor.Mode = Mode
