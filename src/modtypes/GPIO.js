import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { out: { type: Boolean, initial: false } },
  { outPin: { type: [0, 64], initial: 0 } },
  { outThreshold: { type: [0, 100], initial: 50 } },
  { in_: { type: Boolean, initial: false } },
  { inPin: { type: [0, 64], initial: 0 } },
  { inNote: { type: [0, 128], initial: 0 } },
  { inAmplitude: { type: [0, 100], initial: 100 } },
])

export default class GPIO extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isGPIO(val) {
    return val && val instanceof GPIO
  }

  static name() {
    return 'GPIO'
  }

  static initialFlags() {
    return 0x51
  }

}

GPIO.CONTROLLERS = CONTROLLERS
