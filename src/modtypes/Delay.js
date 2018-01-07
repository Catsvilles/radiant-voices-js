import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  stereo: 0,
  mono: 1,
}

const DelayUnits = {
  secDiv16384: 0,
  ms: 1,
  hz: 2,
  tick: 3,
  line: 4,
  lineDiv2: 5,
  lineDiv3: 6,
}

const CONTROLLERS = new Controllers([
  { dry: { type: [0, 512], initial: 256 } },
  { wet: { type: [0, 512], initial: 256 } },
  { delayL: { type: [0, 256], initial: 128 } },
  { delayR: { type: [0, 256], initial: 160 } },
  { volumeL: { type: [0, 256], initial: 256 } },
  { volumeR: { type: [0, 256], initial: 256 } },
  { channels: { type: Channels, initial: Channels.stereo } },
  { inverse: { type: Boolean, initial: false } },
  { delayUnits: { type: DelayUnits, initial: DelayUnits.secDiv16384 } },
])

export default class Delay extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isDelay(val) {
    return val && val instanceof Delay
  }

  static name() {
    return 'Delay'
  }

  static initialFlags() {
    return 0x451
  }

}

Delay.CONTROLLERS = CONTROLLERS
Delay.Channels = Channels
Delay.DelayUnits = DelayUnits
