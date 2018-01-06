import Controllers from './Controllers'
import ModType from './ModType'

const Type = {
  amplitude: 0,
  panning: 1,
}

const Waveform = {
  sin: 0,
  square: 1,
  sin2: 2,
  saw: 3,
  saw2: 4,
  random: 5,
  triangle: 6,
}

const Channels = {
  stereo: 0,
  mono: 1,
}

const FrequencyUnit = {
  hzDiv64: 0,
  ms: 1,
  hz: 2,
  tick: 3,
  line: 4,
  lineDiv2: 5,
  lineDiv3: 6,
}

const FREQ_RANGES = {
  [FrequencyUnit.hzDiv64]: [1, 2048],
  [FrequencyUnit.ms]: [1, 4000],
  [FrequencyUnit.hz]: [1, 16384],
  [FrequencyUnit.tick]: [1, 256],
  [FrequencyUnit.line]: [1, 256],
  [FrequencyUnit.lineDiv2]: [1, 256],
  [FrequencyUnit.lineDiv3]: [1, 256],
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { type: { type: Type, initial: Type.amplitude } },
  { amplitude: { type: [0, 256], initial: 256 } },
  { freq: { type: c => FREQ_RANGES[c.frequencyUnit], initial: 256 } },
  { waveform: { type: Waveform, initial: Waveform.sin } },
  { setPhase: { type: [0, 256], initial: 0 } },
  { channels: { type: Channels, initial: Channels.stereo } },
  { frequencyUnit: { type: FrequencyUnit, initial: FrequencyUnit.hzDiv64 } },
  { dutyCycle: { type: [0, 256], initial: 128 } },
  { generator: { type: Boolean, initial: false } },
])

export default class LFO extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isLFO(val) {
    return val && val instanceof LFO
  }

  static name() {
    return 'LFO'
  }

}

LFO.Type = Type
LFO.Waveform = Waveform
LFO.Channels = Channels
LFO.FrequencyUnit = FrequencyUnit
