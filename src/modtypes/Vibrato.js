import Controllers from './Controllers'
import ModType from './ModType'

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

const freqType = c => FREQ_RANGES[c.frequencyUnit]

const onFrequencyUnitChange = c => c.setFreq(c.freq)

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 256 } },
  { amplitude: { type: [0, 256], initial: 16 } },
  { freq: { type: freqType, initial: 256 } },
  { channels: { type: Channels, initial: Channels.stereo } },
  { setPhase: { type: [0, 256], initial: 0 } },
  { frequencyUnit: { type: FrequencyUnit, initial: FrequencyUnit.hzDiv64, onChange: onFrequencyUnitChange } },
  { exponentialAmplitude: { type: Boolean, initial: false } },
])

export default class Vibrato extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isVibrato(val) {
    return val && val instanceof Vibrato
  }

  static name() {
    return 'Vibrato'
  }

  static initialFlags() {
    return 0x451
  }

}

Vibrato.CONTROLLERS = CONTROLLERS
Vibrato.Channels = Channels
Vibrato.FrequencyUnit = FrequencyUnit
