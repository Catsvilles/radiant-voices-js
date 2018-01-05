import ModType from './ModType'
import Controllers from './Controllers'
import Options, { flag, inverted } from './Options'

const Filter = {
  off: 0,
  lp12db: 1,
  hp12db: 2,
  bp12db: 3,
  br12db: 4,
  lp24db: 5,
  hp24db: 6,
  bp24db: 7,
  br24db: 8,
}

const FilterEnvelope = {
  off: 0,
  sustainOff: 1,
  sustainOn: 2,
}

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const Waveform = {
  triangle: 0,
  saw: 1,
  square: 2,
  noise: 3,
  drawn: 4,
  sin: 5,
  hsin: 6,
  asin: 7,
  drawnWithSplineInterpolation: 8,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 80 } },
  { waveform: { type: Waveform, initial: Waveform.triangle } },
  { panning: { type: [-128, 128], initial: 0 } },
  { attack: { type: [0, 256], initial: 0 } },
  { release: { type: [0, 256], initial: 0 } },
  { sustain: { type: Boolean, initial: true } },
  { exponentialEnvelope: { type: Boolean, initial: true } },
  { dutyCycle: { type: [0, 1024], initial: 512 } },
  { freq2: { type: [0, 2000], initial: 1000 } },
  { filter: { type: Filter, initial: Filter.off } },
  { fFreqHz: { type: [0, 14000], initial: 14000 } },
  { fResonance: { type: [0, 1530], initial: 0 } },
  { fExponentialFreq: { type: Boolean, initial: true } },
  { fAttack: { type: [0, 256], initial: 0 } },
  { fRelease: { type: [0, 256], initial: 0 } },
  { fEnvelope: { type: FilterEnvelope, initial: FilterEnvelope.off } },
  { polyphonyCh: { type: [1, 32], initial: 16 } },
  { mode: { type: Mode, initial: Mode.hq } },
  { noise: { type: [0, 256], initial: 0 } },
])

const OPTIONS_CHNM = 0x01

const OPTIONS = new Options([
  { volumeEnvelopeScalingPerKey: flag },
  { filterEnvelopeScalingPerKey: flag },
  { volumeScalingPerKey: flag },
  { filterFrequencyScalingPerKey: flag },
  { velocityDependentFilterFrequency: flag },
  { frequencyDiv2: flag },
  { smoothFrequencyChange: inverted },
  { filterFrequencyScalingPerKeyReverse: flag },
  { retainPhase: flag },
  { randomPhase: flag },
  { filterFrequencyEqualsNoteFrequency: flag },
  { velocityDependentFilterResonance: flag },
])

export default class AnalogGenerator extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
      options: OPTIONS.instance(),
    })
  }

  static isAnalogGenerator(val) {
    return val && val instanceof AnalogGenerator
  }

  static name() {
    return 'Analog generator'
  }

  withChunkData(bytes) {
    if (this._chnm === OPTIONS_CHNM) {
      return this.setOptions(this.options.setBytes(bytes))
    }
    return this
  }

  *dataChunks() {
    yield { type: 'CHNK', data: { uint32: 2 } }
    yield { type: 'CHNM', data: { uint32: OPTIONS_CHNM } }
    yield { type: 'CHDT', data: { bytes: this.options.bytes } }
  }

}

AnalogGenerator.Filter = Filter
AnalogGenerator.FilterEnvelope = FilterEnvelope
AnalogGenerator.Mode = Mode
AnalogGenerator.Waveform = Waveform
