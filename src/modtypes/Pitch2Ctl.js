import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  frequencyHz: 0,
  pitch: 1,
}

const NoteOffAction = {
  doNothing: 0,
  pitchDown: 1,
  pitchUp: 2,
}

const CONTROLLERS = new Controllers([
  { mode: { type: Mode, initial: Mode.frequencyHz } },
  { noteOffAction: { type: NoteOffAction, initial: NoteOffAction.doNothing } },
  { firstNote: { type: [0, 256], initial: 0 } },
  { numberOfSemitones: { type: [0, 256], initial: 120 } },
  { outMin: { type: [0, 32768], initial: 0 } },
  { outMax: { type: [0, 32768], initial: 32768 } },
  { outController: { type: [0, 32], initial: 0 } },
])

export default class Pitch2Ctl extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isPitch2Ctl(val) {
    return val && val instanceof Pitch2Ctl
  }

  static name() {
    return 'Pitch2Ctl'
  }

  static initialFlags() {
    return 0x20049
  }

}

Pitch2Ctl.CONTROLLERS = CONTROLLERS
Pitch2Ctl.Mode = Mode
Pitch2Ctl.NoteOffAction = NoteOffAction
