import Controllers from './Controllers'
import ModType from './ModType'

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { originalSpeed: { type: Boolean, initial: true } },
  { finetune: { type: [-128, 128], initial: 0 } },
  { transpose: { type: [-128, 128], initial: 0 } },
  { interpolation: { type: Boolean, initial: true } },
  { polyphonyCh: { type: [1, 4], initial: 1 } },
  { repeat: { type: Boolean, initial: false } },
])

export default class VorbisPlayer extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isVorbisPlayer(val) {
    return val && val instanceof VorbisPlayer
  }

  static name() {
    return 'Vorbis player'
  }

  static initialFlags() {
    return 0x8049
  }

}

VorbisPlayer.CONTROLLERS = CONTROLLERS
