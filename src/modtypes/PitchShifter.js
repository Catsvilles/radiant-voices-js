import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { pitch: { type: [-600, 600], initial: 0 } },
  { pitchScale: { type: [0, 200], initial: 100 } },
  { feedback: { type: [0, 256], initial: 0 } },
  { grainSize: { type: [0, 256], initial: 64 } },
  { mode: { type: Mode, initial: Mode.hq } },
])

export default class PitchShifter extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isPitchShifter(val) {
    return val && val instanceof PitchShifter
  }

  static name() {
    return 'Pitch shifter'
  }

}

PitchShifter.CONTROLLERS = CONTROLLERS
PitchShifter.Mode = Mode
