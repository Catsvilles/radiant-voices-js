import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const CONTROLLERS = new Controllers([
  { inputVolume: { type: [0, 512], initial: 256 } },
  { mix: { type: [0, 256], initial: 256 } },
  { outputVolume: { type: [0, 512], initial: 256 } },
  { symmetric: { type: Boolean, initial: true } },
  { mode: { type: Mode, initial: Mode.hq } },
  { dcBlocker: { type: Boolean, initial: true } },
])

export default class WaveShaper extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isWaveShaper(val) {
    return val && val instanceof WaveShaper
  }

  static name() {
    return 'WaveShaper'
  }

  static initialFlags() {
    return 0x51
  }

}

WaveShaper.CONTROLLERS = CONTROLLERS
WaveShaper.Mode = Mode
