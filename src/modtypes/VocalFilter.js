import Controllers from './Controllers'
import ModType from './ModType'

const VoiceType = {
  soprano: 0,
  alto: 1,
  tenor: 2,
  bass: 3,
}

const Channels = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 512], initial: 256 } },
  { formantWidthHz: { type: [0, 256], initial: 128 } },
  { intensity: { type: [0, 256], initial: 128 } },
  { formants: { type: [1, 5], initial: 5 } },
  { vowel: { type: [0, 256], initial: 0 } },
  { voiceType: { type: VoiceType, initial: VoiceType.soprano } },
  { channels: { type: Channels, initial: Channels.stereo } },
])

export default class VocalFilter extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isVocalFilter(val) {
    return val && val instanceof VocalFilter
  }

  static name() {
    return 'Vocal filter'
  }

  static initialFlags() {
    return 0x51
  }

}

VocalFilter.CONTROLLERS = CONTROLLERS
VocalFilter.VoiceType = VoiceType
VocalFilter.Channels = Channels
