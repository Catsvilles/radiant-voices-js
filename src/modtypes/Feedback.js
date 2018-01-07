import Controllers from './Controllers'
import ModType from './ModType'

const Channels = {
  stereo: 0,
  mono: 1,
}

const CONTROLLERS = new Controllers([
  { volume: { type: [0, 10000], initial: 1000 } },
  { channels: { type: Channels, initial: Channels.stereo } },
])

export default class Feedback extends ModType {

  constructor() {
    super({
      ctls: CONTROLLERS.instance(),
    })
  }

  static isFeedback(val) {
    return val && val instanceof Feedback
  }

  static name() {
    return 'Feedback'
  }

  static initialFlags() {
    return 0x600051
  }

}

Feedback.CONTROLLERS = CONTROLLERS
Feedback.Channels = Channels
