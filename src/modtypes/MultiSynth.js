import Controllers from './Controllers'
import ModType, { flag } from './ModType'
import Options from './Options'

const CONTROLLERS = new Controllers([
  { transpose: { type: [-128, 128], initial: 0, compact: true } },
  { randomPitch: { type: [0, 4096], initial: 0 } },
  { velocity: { type: [0, 256], initial: 256 } },
  { finetune: { type: [-256, 256], initial: 0 } },
  { randomPhase: { type: [0, 32768], initial: 0 } },
  { randomVelocity: { type: [0, 32768], initial: 0 } },
  { phase: { type: [0, 32768], initial: 0 } },
  { curve2Influence: { type: [0, 256], initial: 256 } },
])

const OPTIONS = new Options([
  { useStaticNoteC5: flag },
  { ignoreNotesWithZeroVelocity: flag },
  { vvCurveActive: flag },
  { trigger: flag },
])

const OPTIONS_CHNM = 1

export default class MultiSynth extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
      options: OPTIONS.instance(),
    })
  }

  static isMultiSynth(val) {
    return val && val instanceof MultiSynth
  }

  static name() {
    return 'MultiSynth'
  }

  static initialFlags() {
    return 0x21049
  }

  *dataChunks() {
    yield { type: 'CHNK', data: { uint32: OPTIONS_CHNM + 1 } }
    yield { type: 'CHNM', data: { uint32: OPTIONS_CHNM } }
    yield { type: 'CHDT', data: { bytes: this.options.bytes } }
  }
}

MultiSynth.CONTROLLERS = CONTROLLERS
MultiSynth.OPTIONS = OPTIONS
