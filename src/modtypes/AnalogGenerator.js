import ModType from './ModType'
import Options, { flag, inverted } from './Options'

const OPTIONS_CHNM = 0x01

const OPTIONS = new Options({
  volumeEnvelopeScalingPerKey: { offset: 0x00, type: flag },
  filterEnvelopeScalingPerKey: { offset: 0x01, type: flag },
  volumeScalingPerKey: { offset: 0x02, type: flag },
  filterFrequencyScalingPerKey: { offset: 0x03, type: flag },
  velocityDependentFilterFrequency: { offset: 0x04, type: flag },
  frequencyDiv2: { offset: 0x05, type: flag },
  smoothFrequencyChange: { offset: 0x06, type: inverted },
  filterFrequencyScalingPerKeyReverse: { offset: 0x07, type: flag },
  retainPhase: { offset: 0x08, type: flag },
  randomPhase: { offset: 0x09, type: flag },
  filterFrequencyEqualsNoteFrequency: { offset: 0x0a, type: flag },
  velocityDependentFilterResonance: { offset: 0x0b, type: flag },
})

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
