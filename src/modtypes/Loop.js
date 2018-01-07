import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  mono: 0,
  stereo: 1,
}

const Mode = {
  normal: 0,
  pingPong: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 256 } },
  { delay: { type: [0, 256], initial: 256 } },
  { channels: { type: Channels, initial: Channels.stereo } },
  { repeats: { type: [0, 64], initial: 0 } },
  { mode: { type: Mode, initial: Mode.normal } },
])

export default class Loop extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isLoop(val) {
    return val && val instanceof Loop
  }

  static name() {
    return 'Loop'
  }

  static initialFlags() {
    return 0x451
  }

}

Loop.CONTROLLERS = CONTROLLERS
Loop.Channels = Channels
Loop.Mode = Mode
