import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { low: { type: [0, 512], initial: 256 } },
  { middle: { type: [0, 512], initial: 256 } },
  { high: { type: [0, 512], initial: 256 } },
  { channels: { type: Channels, initial: Channels.stereo } },
])

export default class EQ extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isEQ(val) {
    return val && val instanceof EQ
  }

  static name() {
    return 'EQ'
  }

  static initialFlags() {
    return 0x51
  }

}

EQ.CONTROLLERS = CONTROLLERS
EQ.Channels = Channels
