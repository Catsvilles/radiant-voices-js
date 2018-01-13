import ArrayChunk from './ArrayChunk'
import Controllers from './Controllers'
import ModType, { flag } from './ModType'
import Options from './Options'
import { uint8 } from '../dataTypes'

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

const NV_CURVE = new ArrayChunk({
  chnm: 0,
  length: 128,
  type: uint8,
  initial: 0xff,
  min: 0,
  max: 0xff,
})

const VV_CURVE = new ArrayChunk({
  chnm: 2,
  length: 257,
  type: uint8,
  initial: x => Math.min(x, 255),
  min: 0,
  max: 0xff,
})

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
      nvCurve: NV_CURVE.instance(),
      vvCurve: VV_CURVE.instance(),
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

  get nvCurve() {
    return this.get('nvCurve')
  }

  setNvCurve(curve) {
    return this.set('nvCurve', curve)
  }

  get vvCurve() {
    return this.get('vvCurve')
  }

  setVvCurve(curve) {
    return this.set('vvCurve', curve)
  }

  *dataChunks() {
    yield { type: 'CHNK', data: { uint32: OPTIONS_CHNM + 1 } }
    for (const chunk of this.nvCurve.dataChunks()) {
      yield chunk
    }
    yield { type: 'CHNM', data: { uint32: OPTIONS_CHNM } }
    yield { type: 'CHDT', data: { bytes: this.options.bytes } }
    for (const chunk of this.vvCurve.dataChunks()) {
      yield chunk
    }
  }

  withChunkData(bytes) {
    switch (this._chnm) {
      case OPTIONS_CHNM:
        return this.setOptions(this.options.setBytes(bytes))
      case this.nvCurve.spec.chnm:
        return this.setNvCurve(this.nvCurve.setBytes(bytes))
      case this.vvCurve.spec.chnm:
        return this.setVvCurve(this.vvCurve.setBytes(bytes))
      default:
        return this
    }
  }
}

MultiSynth.CONTROLLERS = CONTROLLERS
MultiSynth.OPTIONS = OPTIONS
