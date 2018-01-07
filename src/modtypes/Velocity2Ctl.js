import Controllers from './Controllers'
import ModType from './ModType'

const NoteOffAction = {
  doNothing: 0,
  velDown: 1,
  velUp: 2,
}

const CONTROLLERS = new Controllers([
  { noteOffAction: { type: NoteOffAction, initial: NoteOffAction.doNothing } },
  { outMin: { type: [0, 32768], initial: 0 } },
  { outMax: { type: [0, 32768], initial: 32768 } },
  { outOffset: { type: [-16384, 16384], initial: 0 } },
  { outController: { type: [0, 32], initial: 0 } },
])

export default class Velocity2Ctl extends ModType {

  constructor() {
    return super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isVelocity2Ctl(val) {
    return val && val instanceof Velocity2Ctl
  }

  static name() {
    return 'Velocity2Ctl'
  }

  static initialFlags() {
    return 0x20049
  }

}

Velocity2Ctl.CONTROLLERS = CONTROLLERS
Velocity2Ctl.NoteOffAction = NoteOffAction
