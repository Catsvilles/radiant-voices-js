import Controllers from './Controllers'
import ModType from './ModType'
import Options, { flag } from './Options'

const Channels = {
  mono: 0,
  stereo: 1,
}

const Mode = {
  lq: 0,
  hq: 1,
}

const CONTROLLERS = new Controllers([
  { sampleRateHz: { type: [1, 32768], initial: 50 } },
  { channels: { type: Channels, initial: Channels.mono } },
  { absolute: { type: Boolean, initial: true } },
  { gain: { type: [0, 1024], initial: 256 } },
  { smooth: { type: [0, 256], initial: 128 } },
  { mode: { type: Mode, initial: Mode.hq } },
  { outMin: { type: [0, 32768], initial: 0 } },
  { outMax: { type: [0, 32768], initial: 32768 } },
  { outController: { type: [0, 32], initial: 0 } },
])

const OPTIONS = new Options([
  { recordValues: flag },
])

export default class Sound2Ctl extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
      options: OPTIONS.instance(),
    })
  }

  static isSound2Ctl(val) {
    return val && val instanceof Sound2Ctl
  }

  static name() {
    return 'Sound2Ctl'
  }

  static initialFlags() {
    return 0x600051
  }

}

Sound2Ctl.CONTROLLERS = CONTROLLERS
Sound2Ctl.OPTIONS = OPTIONS
Sound2Ctl.Channels = Channels
Sound2Ctl.Mode = Mode
