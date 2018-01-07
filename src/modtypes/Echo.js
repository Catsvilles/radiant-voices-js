import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  mono: 0,
  stereo: 1,
}

const DelayUnits = {
  secDiv256: 0,
  ms: 1,
  hz: 2,
  tick: 3,
  line: 4,
  lineDiv2: 5,
  lineDiv3: 6,
}

const CONTROLLERS = new Controllers([
  { dry: { type: [0, 256], initial: 256 } },
  { wet: { type: [0, 256], initial: 128 } },
  { feedback: { type: [0, 256], initial: 128 } },
  { delay: { type: [0, 256], initial: 256 } },
  { channels: { type: Channels, initial: Channels.stereo } },
  { delayUnits: { type: DelayUnits, initial: DelayUnits.secDiv256 } },
])

export default class Echo extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isEcho(val) {
    return val && val instanceof Echo
  }

  static name() {
    return 'Echo'
  }

  static initialFlags() {
    return 0x451
  }

}

Echo.CONTROLLERS = CONTROLLERS
Echo.Channels = Channels
Echo.DelayUnits = DelayUnits
