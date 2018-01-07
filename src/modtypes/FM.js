import Controllers from './Controllers'
import ModType from './ModType'

const Mode = {
  hq: 0,
  hqMono: 1,
  lq: 2,
  lqMono: 3,
}

const CONTROLLERS = new Controllers([
  { cVolume: { type: [0, 256], initial: 128 } },
  { mVolume: { type: [0, 256], initial: 48 } },
  { panning: { type: [-128, 128], initial: 0 } },
  { cFreqRatio: { type: [0, 16], initial: 1 } },
  { mFreqRatio: { type: [0, 16], initial: 1 } },
  { mFeedback: { type: [0, 256], initial: 0 } },
  { cAttack: { type: [0, 512], initial: 32 } },
  { cDecay: { type: [0, 512], initial: 32 } },
  { cSustain: { type: [0, 256], initial: 128 } },
  { cRelease: { type: [0, 512], initial: 64 } },
  { mAttack: { type: [0, 512], initial: 32 } },
  { mDecay: { type: [0, 512], initial: 32 } },
  { mSustain: { type: [0, 256], initial: 128 } },
  { mRelease: { type: [0, 512], initial: 64 } },
  { mScalingPerKey: { type: [0, 4], initial: 0 } },
  { polyphonyCh: { type: [1, 16], initial: 4 } },
  { mode: { type: Mode, initial: Mode.hq } },
])

export default class FM extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isFM(val) {
    return val && val instanceof FM
  }

  static name() {
    return 'FM'
  }

  static initialFlags() {
    return 0x49
  }

}

FM.CONTROLLERS = CONTROLLERS
FM.Mode = Mode
