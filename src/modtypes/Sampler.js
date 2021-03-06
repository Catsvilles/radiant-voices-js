import Controllers from './Controllers'
import ModType from './ModType'
import Options, { flag } from './Options'

const SampleInterpolation = {
  off: 0,
  linear: 1,
  spline: 2,
}

const EnvelopeInterpolation = {
  off: 0,
  linear: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { panning: { type: [-128, 128], initial: 0 } },
  { sampleInterpolation: { type: SampleInterpolation, initial: SampleInterpolation.spline } },
  { envelopeInterpolation: { type: EnvelopeInterpolation, initial: EnvelopeInterpolation.linear } },
  { polyphonyCh: { type: [1, 32], initial: 8 } },
  { recThreshold: { type: [0, 10000], initial: 4 } },
])

const OPTIONS = new Options([
  { recordOnPlay: flag },
  { recordInMono: flag },
  { recordWithReducedSampleRate: flag },
  { recordIn16Bit: flag },
  { stopRecordingOnProjectStop: flag },
  { ignoreVelocityForVolume: flag },
])

const OPTIONS_CHNM = 0x101

export default class Sampler extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
      options: OPTIONS.instance(),
    })
  }

  static isSampler(val) {
    return val && val instanceof Sampler
  }

  static name() {
    return 'Sampler'
  }

  static initialFlags() {
    return 0x8459
  }

  *dataChunks() {
    yield { type: 'CHNK', data: { uint32: OPTIONS_CHNM + 1 /* TODO */ } }
    yield { type: 'CHNM', data: { uint32: OPTIONS_CHNM } }
    yield { type: 'CHDT', data: { bytes: this.options.bytes } }
  }

  withChunkData(bytes) {
    if (this._chnm === OPTIONS_CHNM) {
      return this.setOptions(this.options.setBytes(bytes))
    }
    return this
  }
}

Sampler.CONTROLLERS = CONTROLLERS
Sampler.OPTIONS = OPTIONS
Sampler.SampleInterpolation = SampleInterpolation
Sampler.EnvelopeInterpolation = EnvelopeInterpolation
