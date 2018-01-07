import Controllers from './Controllers'
import ModType from './ModType'

const LfoWaveform = {
  hsin: 0,
  sin: 1,
}

const LfoFreqUnit = {
  hzDiv20: 0,
  ms: 1,
  hz: 2,
  tick: 3,
  line: 4,
  lineDIv2: 5,
  lineDiv3: 6,
}

const CONTROLLERS = new Controllers([
  { dry: { type: [0, 256], initial: 256 } },
  { wet: { type: [0, 256], initial: 128 } },
  { feedback: { type: [0, 256], initial: 128 } },
  { delay: { type: [0, 1000], initial: 200 } },
  { response: { type: [0, 256], initial: 2 } },
  { lfoFreq: { type: [0, 512], initial: 8 } },
  { lfoAmp: { type: [0, 256], initial: 32 } },
  { lfoWaveform: { type: LfoWaveform, initial: LfoWaveform.hsin } },
  { setLfoPhase: { type: [0, 256], initial: 0 } },
  { lfoFreqUnit: { type: LfoFreqUnit, initial: LfoFreqUnit.hzDiv20 } },
])

export default class Flanger extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isFlanger(val) {
    return val && val instanceof Flanger
  }

  static name() {
    return 'Flanger'
  }

  static initialFlags() {
    return 0x451
  }

}

Flanger.CONTROLLERS = CONTROLLERS
Flanger.LfoWaveform = LfoWaveform
Flanger.LfoFreqUnit = LfoFreqUnit
