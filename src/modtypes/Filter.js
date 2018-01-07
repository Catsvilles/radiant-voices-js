import Controllers from './Controllers'
import ModType from './ModType'

const Type = {
  lp: 0,
  hp: 1,
  bp: 2,
  notch: 3,
}

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const RollOff = {
  db12: 0,
  db24: 1,
  db36: 2,
  db48: 3,
}

const LfoFreqUnit = {
  hzDiv50: 0,
  ms: 1,
  hz: 2,
  tick: 3,
  line: 4,
  lineDiv2: 5,
  lineDiv3: 6,
}

const LfoWaveform = {
  sin: 0,
  saw: 1,
  saw2: 2,
  square: 3,
  random: 4,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 256 } },
  { freq: { type: [0, 14000], initial: 14000 } },
  { resonance: { type: [0, 1530], initial: 0 } },
  { type: { type: Type, initial: Type.lp } },
  { response: { type: [0, 256], initial: 8 } },
  { mode: { type: Mode }, initial: Mode.hq },
  { impulse: { type: [0, 14000], initial: 0 } },
  { mix: { type: [0, 256], initial: 256 } },
  { lfoFreq: { type: [0, 1024], initial: 8 } },
  { lfoAmp: { type: [0, 256], initial: 0 } },
  { setLfoPhase: { type: [0, 256], initial: 0 } },
  { exponentialFreq: { type: Boolean, initial: false } },
  { rollOff: { type: RollOff, initial: RollOff.db12 } },
  { lfoFreqUnit: { type: LfoFreqUnit, initial: LfoFreqUnit.hzDiv50 } },
  { lfoWaveform: { type: LfoWaveform, initial: LfoWaveform.sin } },
])

export default class Filter extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isFilter(val) {
    return val && val instanceof Filter
  }

  static name() {
    return 'Filter'
  }

  static initialFlags() {
    return 0x451
  }

}

Filter.CONTROLLERS = CONTROLLERS
Filter.Type = Type
Filter.Mode = Mode
Filter.RollOff = RollOff
Filter.LfoFreqUnit = LfoFreqUnit
Filter.LfoWaveform = LfoWaveform
