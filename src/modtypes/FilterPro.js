import Controllers from './Controllers'
import ModType from './ModType'

const Type = {
  lp: 0,
  hp: 1,
  bpConstSkirtGain: 2,
  bpConstPeakGain: 3,
  notch: 4,
  allPass: 5,
  peaking: 6,
  lowShelf: 7,
  highShelf: 8,
}

const RollOff = {
  db12: 0,
  db24: 1,
  db36: 2,
  db48: 3,
}

const Mode = {
  stereo: 0,
  mono: 1,
}

const LfoWaveform = {
  sin: 0,
  saw: 1,
  saw2: 2,
  square: 3,
  random: 4,
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

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 32768], initial: 32768 } },
  { type: { type: Type, initial: Type.lp } },
  { freqHz: { type: [0, 22000], initial: 22000 } },
  { freqFinetune: { type: [-1000, 1000], initial: 0 } },
  { freqScale: { type: [0, 200], initial: 100 } },
  { exponentialFreq: { type: Boolean, initial: false } },
  { q: { type: [0, 32768], initial: 16384 } },
  { gain: { type: [-16384, 16384], initial: 0 } },
  { rollOff: { type: RollOff, initial: RollOff.db12 } },
  { response: { type: [0, 1000], initial: 250 } },
  { mode: { type: Mode, initial: Mode.stereo } },
  { mix: { type: [0, 32768], initial: 32768 } },
  { lfoFreq: { type: [0, 1024], initial: 8 } },
  { lfoAmp: { type: [0, 32768], initial: 0 } },
  { lfoWaveform: { type: LfoWaveform, initial: LfoWaveform.sin } },
  { setLfoPhase: { type: [0, 256], initial: 0 } },
  { lfoFreqUnit: { type: LfoFreqUnit, initial: LfoFreqUnit.hzDiv50 } },
])

export default class FilterPro extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isFilterPro(val) {
    return val && val instanceof FilterPro
  }

  static name() {
    return 'Filter Pro'
  }

  static initialFlags() {
    return 0x451
  }

}

FilterPro.CONTROLLERS = CONTROLLERS
FilterPro.Type = Type
FilterPro.RollOff = RollOff
FilterPro.Mode = Mode
FilterPro.LfoWaveform = LfoWaveform
FilterPro.LfoFreqUnit = LfoFreqUnit
