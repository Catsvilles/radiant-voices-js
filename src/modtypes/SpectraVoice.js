import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
  hqSpline: 4,
}

const HarmonicType = {
  hsin: 0,
  rect: 1,
  org1: 2,
  org2: 3,
  org3: 4,
  org4: 5,
  sin: 6,
  random: 7,
  triangle1: 8,
  triangle2: 9,
  overtones1: 10,
  overtones2: 11,
  overtones3: 12,
  overtones4: 13,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 256], initial: 128 } },
  { panning: { type: [-128, 128], initial: 0 } },
  { attack: { type: [0, 512], initial: 10 } },
  { release: { type: [0, 512], initial: 512 } },
  { polyphonyCh: { type: [1, 32], initial: 8 } },
  { mode: { type: Mode, initial: Mode.hqSpline } },
  { sustain: { type: Boolean, initial: true } },
  { spectrumResolution: { type: [0, 5], initial: 1 } },
  { harmonic: { type: [0, 15], initial: 0 } },
  { hFreqHz: { type: [0, 22050], initial: 1098 } },
  { hVolume: { type: [0, 255], initial: 255 } },
  { hWidth: { type: [0, 255], initial: 3 } },
  { hType: { type: HarmonicType, initial: HarmonicType.hsin } },
])

export default class SpectraVoice extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isSpectraVoice(val) {
    return val && val instanceof SpectraVoice
  }

  static name() {
    return 'SpectraVoice'
  }

  static initialFlags() {
    return 0x49
  }

}

SpectraVoice.CONTROLLERS = CONTROLLERS
SpectraVoice.Mode = Mode
SpectraVoice.HarmonicType = HarmonicType
