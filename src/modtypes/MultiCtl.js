import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { value: { type: [0, 32768], initial: 0 } },
  { gain: { type: [0, 1024], initial: 256 } },
  { quantization: { type: [0, 32768], initial: 32768 } },
  { outOffset: { type: [-16384, 16384], initial: 0 } },
])

export default class MultiCtl extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isMultiCtl(val) {
    return val && val instanceof MultiCtl
  }

  static name() {
    return 'MultiCtl'
  }

  static initialFlags() {
    return 0x20051
  }

}

MultiCtl.CONTROLLERS = CONTROLLERS
