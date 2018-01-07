import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  mono: 0,
  stereo: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 1024], initial: 256 } },
  { channels: { type: Channels, initial: Channels.mono } },
])

export default class Input extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isInput(val) {
    return val && val instanceof Input
  }

  static name() {
    return 'Input'
  }

  static initialFlags() {
    return 0x49
  }

}

Input.CONTROLLERS = CONTROLLERS
Input.Channels = Channels
