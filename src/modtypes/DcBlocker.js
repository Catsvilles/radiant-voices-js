import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { channels: { type: Channels, initial: Channels.stereo } },
])

export default class DcBlocker extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isDcBlocker(val) {
    return val && val instanceof DcBlocker
  }

  static name() {
    return 'DC Blocker'
  }

  static initialFlags() {
    return 0x51
  }

}

DcBlocker.CONTROLLERS = CONTROLLERS
DcBlocker.Channels = Channels
