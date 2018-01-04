import ModType from './ModType'
import Options, { flag, inverted } from './Options'

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
      options: OPTIONS.chunk(),
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
